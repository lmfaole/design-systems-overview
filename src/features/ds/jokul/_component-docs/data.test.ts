import {existsSync, readFileSync, statSync} from "node:fs";
import {createRequire} from "node:module";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {createElement, Fragment} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import ts from "typescript";
import {afterAll, beforeAll, describe, expect, it, vi} from "vitest";
import {buildExampleControls} from "./utils/example-controls";
import {componentDocs, getComponentDoc} from "./data";
import type {ComponentExampleControl, PropDef} from "./docs/types";

const require = createRequire(import.meta.url);
const jokulPackage = require("@fremtind/jokul/package.json") as {
    exports: Record<string, string | { import?: { default?: string } }>;
};

const PUBLIC_COMPONENT_EXPORTS = Object.entries(jokulPackage.exports)
    .filter(([key]) => key.startsWith("./") && !key.startsWith("./styles") && key !== "./package.json")
    .map(([key, value]) => ({key: key.slice(2), value}))
    .filter(({key, value}) => {
        if (["core", "hooks", "utilities", "tailwind", "tailwind/v4"].includes(key)) return false;
        const importPath = typeof value === "string" ? value : value?.import?.default;
        return typeof importPath === "string" && (importPath.includes("/components/") || importPath.includes("/components-beta/"));
    })
    .map(({key}) => key)
    .sort((a, b) => a.localeCompare(b, "nb"));
const CURRENT_FILE_PATH = fileURLToPath(import.meta.url);
const DOCS_INDEX_PATH = fileURLToPath(new URL("./docs/index.ts", import.meta.url));

let tsResources:
    | {
          checker: ts.TypeChecker;
          options: ts.CompilerOptions;
          program: ts.Program;
      }
    | undefined;

function resolveLocalModulePath(fromPath: string, specifier: string) {
    const candidate = resolve(dirname(fromPath), specifier);
    const candidates = [
        `${candidate}.ts`,
        `${candidate}.tsx`,
        resolve(candidate, "index.ts"),
        resolve(candidate, "index.tsx"),
    ];

    return candidates.find((path) => existsSync(path) && statSync(path).isFile());
}

function buildDocSourcePathById() {
    const source = readFileSync(DOCS_INDEX_PATH, "utf8");
    const importEntries = Array.from(source.matchAll(/^import\s+(\w+)\s+from\s+"([^"]+)";$/gm)).map(
        (match) => [match[1], match[2]] as const,
    );
    const importPathsByName = new Map(importEntries);
    const componentDocEntries = source.match(/export const componentDocs: ComponentDoc\[] = \[(?<docs>[\s\S]*?)\];/);
    const docNames = Array.from(componentDocEntries?.groups?.docs?.matchAll(/^\s*(\w+),$/gm) ?? []).map(
        (match) => match[1],
    );

    return new Map(
        componentDocs.map((doc, index) => {
            const importPath = importPathsByName.get(docNames[index] ?? "");
            const sourcePath = importPath ? resolveLocalModulePath(DOCS_INDEX_PATH, importPath) : undefined;
            return [doc.id, sourcePath] as const;
        }),
    );
}

const DOC_SOURCE_PATH_BY_ID = buildDocSourcePathById();

function getTsResources() {
    if (tsResources) return tsResources;

    const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, "tsconfig.json");

    if (!configPath) {
        throw new Error("Could not resolve tsconfig.json for prop type integrity test");
    }

    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

    if (configFile.error) {
        throw new Error(ts.formatDiagnosticsWithColorAndContext([configFile.error], {
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            getCanonicalFileName: (fileName) => fileName,
            getNewLine: () => ts.sys.newLine,
        }));
    }

    const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, dirname(configPath));
    const program = ts.createProgram({rootNames: parsedConfig.fileNames, options: parsedConfig.options});

    tsResources = {
        checker: program.getTypeChecker(),
        options: parsedConfig.options,
        program,
    };

    return tsResources;
}

function getComponentExportName(name: string) {
    return name
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
        .map((segment) => segment[0].toUpperCase() + segment.slice(1))
        .join("");
}

function getComponentPropsType(doc: (typeof componentDocs)[number]) {
    const {checker, options, program} = getTsResources();
    const resolved = ts.resolveModuleName(doc.package, CURRENT_FILE_PATH, options, ts.sys).resolvedModule;

    if (!resolved) return null;

    const sourceFile = program.getSourceFile(resolved.resolvedFileName);

    if (!sourceFile) return null;

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);

    if (!moduleSymbol) return null;

    const exportName = getComponentExportName(doc.name);
    const componentSymbol = checker.getExportsOfModule(moduleSymbol).find((symbol) => symbol.name === exportName);

    if (!componentSymbol) return null;

    const componentType = checker.getTypeOfSymbolAtLocation(
        componentSymbol,
        componentSymbol.valueDeclaration ?? sourceFile,
    );
    const signature = componentType.getCallSignatures()[0];

    if (!signature) return null;

    const propsParameter = signature.getParameters()[0];
    const parameterDeclaration = propsParameter?.valueDeclaration ?? propsParameter?.declarations?.[0];

    if (!propsParameter || !parameterDeclaration) return null;

    return {
        checker,
        declaration: parameterDeclaration,
        propsType: checker.getTypeOfSymbolAtLocation(propsParameter, parameterDeclaration),
    };
}

function getDocPropActualType(doc: (typeof componentDocs)[number], propName: string) {
    const componentProps = getComponentPropsType(doc);

    if (!componentProps) return null;

    const propSymbol = componentProps.propsType.getProperty(propName);

    if (!propSymbol) return null;

    const declaration = propSymbol.valueDeclaration ?? propSymbol.declarations?.[0] ?? componentProps.declaration;

    return {
        checker: componentProps.checker,
        declaration,
        type: componentProps.checker.getTypeOfSymbolAtLocation(propSymbol, declaration),
    };
}

function normalizeSimpleLiteralValue(value: string) {
    const trimmed = value.trim();
    if (trimmed === "undefined" || trimmed === "null") return null;
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return `"${trimmed.slice(1, -1)}"`;
    }
    return trimmed;
}

function toComparableDocumentedType(type: string) {
    const compactType = type.replace(/\s/g, "");

    if (SIMPLE_BOOLEAN_TYPE.test(compactType)) return "boolean";
    if (SIMPLE_NUMBER_TYPE.test(compactType)) return "number";
    if (SIMPLE_STRING_TYPE.test(compactType)) return "string";

    if (!isSimpleLiteralUnionType(type)) return null;

    const values = type
        .split("|")
        .map((segment) => normalizeSimpleLiteralValue(segment))
        .filter((value): value is string => Boolean(value));

    if (values.length === 2 && values.includes("true") && values.includes("false")) {
        return "boolean";
    }

    return values.sort((a, b) => a.localeCompare(b, "nb")).join(" | ");
}

function toComparableActualType(actual: ReturnType<typeof getDocPropActualType>) {
    if (!actual) return null;

    const extractToken = (type: ts.Type): string | null => {
        if (type.flags & ts.TypeFlags.Undefined) return null;
        if (type.flags & ts.TypeFlags.Null) return null;
        if (type.isStringLiteral()) return `"${type.value}"`;
        if (type.isNumberLiteral()) return String(type.value);
        if (type.flags & ts.TypeFlags.BooleanLiteral) {
            return actual.checker.typeToString(type, actual.declaration, ts.TypeFormatFlags.NoTruncation);
        }
        if (type.flags & ts.TypeFlags.String) return "string";
        if (type.flags & ts.TypeFlags.Number) return "number";
        if (type.flags & ts.TypeFlags.Boolean) return "boolean";
        return null;
    };

    const tokens = (actual.type.isUnion() ? actual.type.types : [actual.type])
        .map(extractToken)
        .filter((token): token is string => Boolean(token));

    if (tokens.length === 0) return null;
    if (tokens.length === 1) return tokens[0];

    const uniqueTokens = Array.from(new Set(tokens));

    if (uniqueTokens.length === 2 && uniqueTokens.includes("true") && uniqueTokens.includes("false")) {
        return "boolean";
    }

    if (uniqueTokens.length === 1 && ["string", "number", "boolean"].includes(uniqueTokens[0])) {
        return uniqueTokens[0];
    }

    if (uniqueTokens.some((token) => ["string", "number", "boolean"].includes(token))) {
        return null;
    }

    return uniqueTokens.sort((a, b) => a.localeCompare(b, "nb")).join(" | ");
}

function getControlDefaultValue(control: ReturnType<typeof buildExampleControls>[number]) {
    switch (control.kind) {
        case "boolean":
            return control.defaultValue ?? false;
        case "select": {
            const firstOption = control.options[0];
            return control.defaultValue ?? (typeof firstOption === "string" ? firstOption : firstOption?.value);
        }
        case "multiselect":
            return control.defaultValue ?? [];
        case "text":
            return control.defaultValue ?? "";
        case "number":
            return control.defaultValue ?? control.min ?? 0;
        case "json":
            return control.defaultValue ?? "{}";
    }
}

function setValueByPath(target: Record<string, unknown>, path: string, value: unknown) {
    if (!path.includes(".")) {
        target[path] = value;
        return;
    }

    const parts = path.split(".");
    let current: Record<string, unknown> = target;

    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        const next = current[key];

        if (!next || typeof next !== "object" || Array.isArray(next)) {
            current[key] = {};
        }

        current = current[key] as Record<string, unknown>;
    }

    current[parts[parts.length - 1]] = value;
}

function buildExampleControlsForDoc(doc: (typeof componentDocs)[number]) {
    return doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig);
}

function buildExampleProps(doc: (typeof componentDocs)[number]) {
    return buildExampleControlsForDoc(doc).reduce<Record<string, unknown>>((acc, control) => {
        const value = getControlDefaultValue(control);

        if (value !== undefined) {
            setValueByPath(acc, control.name, value);
        }

        return acc;
    }, {});
}

type PrimitiveExampleCategory = "boolean" | "number" | "text" | "select";

const EXCLUDED_EXAMPLE_PROP_NAMES = new Set(["children", "className", "style", "ref", "key", "id", "as", "tabIndex"]);
const EXCLUDED_EXAMPLE_PROP_PREFIXES = ["aria-", "data-"];
const SIMPLE_BOOLEAN_TYPE = /^(?:boolean|null|undefined)(?:\s*\|\s*(?:boolean|null|undefined))*$/;
const SIMPLE_NUMBER_TYPE = /^(?:number|null|undefined)(?:\s*\|\s*(?:number|null|undefined))*$/;
const SIMPLE_STRING_TYPE = /^(?:string|null|undefined)(?:\s*\|\s*(?:string|null|undefined))*$/;
const SIMPLE_LITERAL_SEGMENT = /^(?:'[^']*'|"[^"]*"|-?\d+(?:\.\d+)?|true|false|null|undefined)$/;

function isSimpleLiteralUnionType(type: string) {
    const segments = type.split("|").map((segment) => segment.trim()).filter(Boolean);
    if (segments.length < 2) return false;
    if (segments.some((segment) => !SIMPLE_LITERAL_SEGMENT.test(segment))) return false;
    return segments.some((segment) => !["null", "undefined"].includes(segment));
}

function getPrimitiveExampleCategory(prop: PropDef): PrimitiveExampleCategory | null {
    if (prop.status === "deprecated") return null;
    if (EXCLUDED_EXAMPLE_PROP_NAMES.has(prop.name)) return null;
    if (EXCLUDED_EXAMPLE_PROP_PREFIXES.some((prefix) => prop.name.startsWith(prefix))) return null;
    if (/^on[A-Z]/.test(prop.name)) return null;

    const compactType = prop.type.replace(/\s/g, "");
    if (SIMPLE_BOOLEAN_TYPE.test(compactType)) return "boolean";
    if (SIMPLE_NUMBER_TYPE.test(compactType)) return "number";
    if (SIMPLE_STRING_TYPE.test(compactType)) return "text";
    if (isSimpleLiteralUnionType(prop.type)) return "select";

    return null;
}

function controlMatchesCategory(control: ComponentExampleControl, category: PrimitiveExampleCategory) {
    switch (category) {
        case "boolean":
            return control.kind === "boolean" || control.kind === "select";
        case "number":
            return control.kind === "number";
        case "text":
            return control.kind === "text" || control.kind === "select";
        case "select":
            return control.kind === "select" || control.kind === "multiselect";
    }
}

function getOptionValue(option: Extract<ComponentExampleControl, {kind: "select" | "multiselect"}>["options"][number]) {
    return typeof option === "string" ? option : option.value;
}

function getExampleControlValues(doc: (typeof componentDocs)[number]) {
    return Object.fromEntries(
        buildExampleControlsForDoc(doc).map((control) => [control.name, getControlDefaultValue(control)]),
    );
}

function buildResolvedExampleProps(values: Record<string, unknown>) {
    return Object.entries(values).reduce<Record<string, unknown>>((acc, [name, value]) => {
        if (value !== undefined) {
            setValueByPath(acc, name, value);
        }

        return acc;
    }, {});
}

function getTruthyControlValue(control: ComponentExampleControl) {
    switch (control.kind) {
        case "boolean":
            return true;
        case "number":
            return control.defaultValue ?? control.min ?? 1;
        case "text":
            return control.defaultValue && control.defaultValue.length > 0
                ? control.defaultValue
                : `${control.name} eksempel`;
        case "select":
            return control.defaultValue ?? getOptionValue(control.options[0]);
        case "multiselect":
            return control.defaultValue ?? control.options.slice(0, 1).map(getOptionValue);
        case "json":
            return control.defaultValue ?? "{\"example\":true}";
    }
}

function getAlternativeControlValue(
    control: ComponentExampleControl,
    currentValue: unknown,
) {
    switch (control.kind) {
        case "boolean":
            return currentValue !== true;
        case "text": {
            const current = typeof currentValue === "string" ? currentValue : control.defaultValue ?? "";
            return current.length > 0 ? `${current} endret` : `${control.name} eksempel`;
        }
        case "number": {
            const current =
                typeof currentValue === "number"
                    ? currentValue
                    : control.defaultValue ?? control.min ?? 0;
            const step = control.step ?? 1;
            const candidates = [
                current + step,
                current - step,
                control.max,
                control.min,
                0,
                1,
            ].filter((candidate): candidate is number => typeof candidate === "number");

            return candidates.find((candidate) => {
                if (Object.is(candidate, current)) return false;
                if (control.min !== undefined && candidate < control.min) return false;
                if (control.max !== undefined && candidate > control.max) return false;
                return true;
            });
        }
        case "select": {
            const options = control.options.map(getOptionValue);
            return options.find((option) => !Object.is(option, currentValue));
        }
        case "multiselect": {
            const options = control.options.map(getOptionValue);
            const current = Array.isArray(currentValue) ? currentValue : [];
            const alternative = options.filter((option) => !current.some((entry) => Object.is(entry, option)));
            return alternative.length > 0 ? alternative : undefined;
        }
        case "json":
            return control.defaultValue === "{\"example\":true}" ? "{\"example\":false}" : "{\"example\":true}";
    }
}

function ensureVisibleWhenSatisfied(
    control: ComponentExampleControl,
    values: Record<string, unknown>,
    controlsByName: Map<string, ComponentExampleControl>,
): Record<string, unknown> {
    const condition = control.visibleWhen;

    if (!condition) return values;

    const nextValues = {...values};
    const dependency = controlsByName.get(condition.name);

    if (dependency) {
        Object.assign(nextValues, ensureVisibleWhenSatisfied(dependency, nextValues, controlsByName));
    }

    switch (condition.operator ?? "equals") {
        case "exists":
            nextValues[condition.name] = getTruthyControlValue(dependency ?? {name: condition.name, kind: "text"});
            return nextValues;
        case "truthy":
            nextValues[condition.name] = getTruthyControlValue(dependency ?? {name: condition.name, kind: "boolean"});
            return nextValues;
        case "notEquals": {
            const expected = Array.isArray(condition.value) ? condition.value : [condition.value];
            const current = nextValues[condition.name];
            const alternative = dependency
                ? getAlternativeControlValue(dependency, current)
                : undefined;

            if (alternative !== undefined && !expected.some((value) => Object.is(value, alternative))) {
                nextValues[condition.name] = alternative;
                return nextValues;
            }

            if (typeof current === "string") {
                nextValues[condition.name] = `${current} endret`;
            } else {
                nextValues[condition.name] = expected.some((value) => Object.is(value, true)) ? false : true;
            }

            return nextValues;
        }
        case "equals":
        default:
            nextValues[condition.name] = Array.isArray(condition.value) ? condition.value[0] : condition.value ?? true;
            return nextValues;
    }
}

function renderExampleMarkup(
    doc: (typeof componentDocs)[number],
    values: Record<string, unknown>,
) {
    if (typeof doc.example !== "function") {
        throw new Error(`${doc.id}: example must be interactive`);
    }

    return renderToStaticMarkup(createElement(Fragment, null, doc.example(buildResolvedExampleProps(values))));
}

function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getExampleImplementationSource(doc: (typeof componentDocs)[number]) {
    const sourcePath = DOC_SOURCE_PATH_BY_ID.get(doc.id);

    if (!sourcePath) return "";

    const source = readFileSync(sourcePath, "utf8");
    const localImports = Array.from(source.matchAll(/from\s+"(\.[^"]+)";/g))
        .map((match) => resolveLocalModulePath(sourcePath, match[1]))
        .filter((path): path is string => Boolean(path))
        .filter((path) => !/\/props\.tsx?$/.test(path) && !/\/migration\.tsx?$/.test(path));

    return Array.from(new Set(localImports))
        .map((path) => readFileSync(path, "utf8"))
        .join("\n");
}

function implementationMentionsControl(
    doc: (typeof componentDocs)[number],
    controlName: string,
) {
    const source = getExampleImplementationSource(doc);

    if (!source) return false;

    if (!controlName.includes(".")) {
        return new RegExp(`\\b${escapeRegex(controlName)}\\b`).test(source);
    }

    const segments = controlName.split(".");
    const pathPattern = segments
        .map((segment, index) =>
            index === 0 ? escapeRegex(segment) : `(?:\\s*\\?\\.\\s*|\\s*\\.\\s*)${escapeRegex(segment)}`,
        )
        .join("");

    return (
        new RegExp(`\\b${pathPattern}\\b`).test(source) ||
        new RegExp(`\\b${escapeRegex(segments[0])}\\b`).test(source)
    );
}

describe("Jokul component docs integrity", () => {
    const originalGetComputedStyle = globalThis.getComputedStyle;
    const originalDocument = globalThis.document;
    const originalWindow = globalThis.window;

    beforeAll(() => {
        vi.stubGlobal("getComputedStyle", () => ({
            getPropertyValue: () => "",
        }));
        vi.stubGlobal("document", {
            body: {
                querySelectorAll: () => [],
            },
            documentElement: {dir: "ltr"},
            createElement: () => ({
                style: {}, setAttribute() {
                }, removeAttribute() {
                }
            }),
            querySelector: () => null,
            querySelectorAll: () => [],
        });
        vi.stubGlobal("window", {
            document: globalThis.document,
            getComputedStyle: globalThis.getComputedStyle,
            setTimeout,
            clearTimeout,
            requestAnimationFrame: () => 0,
            cancelAnimationFrame: () => {
            },
        });
    });

    afterAll(() => {
        if (originalGetComputedStyle) {
            vi.stubGlobal("getComputedStyle", originalGetComputedStyle);
        } else {
            vi.unstubAllGlobals();
        }

        if (originalDocument) {
            vi.stubGlobal("document", originalDocument);
        }

        if (originalWindow) {
            vi.stubGlobal("window", originalWindow);
        }
    });

    it("imports every documented Jøkul package specifier", async () => {
        const failedImports: string[] = [];
        const componentIdsByPackage = new Map<string, string[]>();

        for (const doc of componentDocs) {
            const ids = componentIdsByPackage.get(doc.package) ?? [];
            ids.push(doc.id);
            componentIdsByPackage.set(doc.package, ids);
        }

        for (const [packageName, componentIds] of componentIdsByPackage.entries()) {
            try {
                const module = await import(packageName);

                if (Object.keys(module).length === 0) {
                    failedImports.push(`${packageName} (${componentIds.join(", ")}): empty module`);
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                failedImports.push(`${packageName} (${componentIds.join(", ")}): ${message}`);
            }
        }

        expect(failedImports).toEqual([]);
    });

    it("keeps the minimum documentation fields populated for every component", () => {
        const docsWithMissingFields = componentDocs.flatMap((doc) => {
            const missing: string[] = [];

            if (!doc.name.trim()) missing.push("name");
            if (!doc.package.trim()) missing.push("package");
            if (!doc.package.startsWith("@fremtind/jokul/")) missing.push("package namespace");
            if (!doc.description.short.trim()) missing.push("description.short");
            if (!doc.description.long.trim()) missing.push("description.long");
            if (!Array.isArray(doc.props)) missing.push("props");
            if (doc.showOnOverview !== false && !doc.preview) missing.push("preview");

            return missing.length > 0 ? [`${doc.id}: ${missing.join(", ")}`] : [];
        });

        expect(docsWithMissingFields).toEqual([]);
    });

    it("keeps an interactive example on every top-level component page", () => {
        const docsWithoutInteractiveExample = componentDocs
            .filter((doc) => doc.showOnOverview !== false)
            .filter((doc) => typeof doc.example !== "function")
            .map((doc) => doc.id);

        expect(docsWithoutInteractiveExample).toEqual([]);
    });

    it("documents every relationship with a description and resolvable target", () => {
        const invalidRelationships = componentDocs.flatMap((doc) => {
            const relationships = doc.relationships ?? {};
            const issues: string[] = [];

            for (const [kind, entries] of Object.entries(relationships)) {
                for (const entry of entries ?? []) {
                    if (!entry.description.trim()) {
                        issues.push(`${kind} -> ${entry.id}: missing description`);
                    }

                    const target = getComponentDoc(entry.id);

                    if (!target) {
                        issues.push(`${kind} -> ${entry.id}: missing target`);

                    }

                }
            }

            return issues.length > 0 ? issues.map((issue) => `${doc.id}: ${issue}`) : [];
        });

        expect(invalidRelationships).toEqual([]);
    });

    it("tracks which public Jøkul component exports still lack local docs", () => {
        const documentedPackages = new Set(
            componentDocs.map((doc) => doc.package.replace("@fremtind/jokul/", "")),
        );
        const documentedIds = new Set<string>(componentDocs.map((doc) => doc.id));

        const undocumentedExports = PUBLIC_COMPONENT_EXPORTS.filter(
            (exportName) => !documentedPackages.has(exportName) && !documentedIds.has(exportName),
        );

        expect(undocumentedExports).toEqual([]);
    });

    it("renders every documented preview and example server-side", () => {
        const renderFailures: string[] = [];

        for (const doc of componentDocs) {
            try {
                renderToStaticMarkup(createElement(Fragment, null, doc.preview));
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                renderFailures.push(`${doc.id}: preview failed to render (${message})`);
            }

            if (!doc.example) continue;

            try {
                const exampleNode =
                    typeof doc.example === "function" ? doc.example(buildExampleProps(doc)) : doc.example;
                renderToStaticMarkup(createElement(Fragment, null, exampleNode));
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                renderFailures.push(`${doc.id}: example failed to render (${message})`);
            }
        }

        expect(renderFailures).toEqual([]);
    });

    it("keeps a matching control for every primitive prop on interactive examples", () => {
        const missingCoverage: string[] = [];

        for (const doc of componentDocs) {
            if (typeof doc.example !== "function") continue;

            const primitiveProps = doc.props
                .map((prop) => ({prop, category: getPrimitiveExampleCategory(prop)}))
                .filter(
                    (
                        entry,
                    ): entry is {
                        prop: PropDef;
                        category: PrimitiveExampleCategory;
                    } => Boolean(entry.category),
                );

            if (primitiveProps.length === 0) continue;

            const controls = doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig);
            const missingProps = primitiveProps.filter(
                ({prop, category}) =>
                    !controls.some(
                        (control) => control.name === prop.name && controlMatchesCategory(control, category),
                    ),
            );

            if (missingProps.length > 0) {
                const examples = missingProps.map(({prop, category}) => `${prop.name} (${category}: ${prop.type})`);
                missingCoverage.push(`${doc.id}: ${examples.join("; ")}`);
            }
        }

        expect(missingCoverage).toEqual([]);
    });

    it("keeps documented simple prop types aligned with the actual exported component types", () => {
        const mismatches: string[] = [];

        for (const doc of componentDocs) {
            for (const prop of doc.props) {
                if (prop.source === "native" || prop.source === "aria") continue;

                const documentedType = toComparableDocumentedType(prop.type);
                const actualType = toComparableActualType(getDocPropActualType(doc, prop.name));

                if (!documentedType || !actualType) continue;
                if (documentedType === actualType) continue;

                mismatches.push(`${doc.id}.${prop.name}: documented ${documentedType}, actual ${actualType}`);
            }
        }

        expect(mismatches).toEqual([]);
    });

    it("wires every primitive example control into the rendered example output", () => {
        const disconnectedControls: string[] = [];

        for (const doc of componentDocs) {
            if (typeof doc.example !== "function") continue;

            const controls = buildExampleControlsForDoc(doc).filter(
                (control) => ["boolean", "number", "text", "select"].includes(control.kind),
            );

            if (controls.length === 0) continue;

            const controlsByName = new Map(controls.map((control) => [control.name, control]));
            const defaultValues = getExampleControlValues(doc);

            for (const control of controls) {
                if (implementationMentionsControl(doc, control.name)) continue;

                const baseValues = ensureVisibleWhenSatisfied(control, defaultValues, controlsByName);
                const currentValue = baseValues[control.name];
                const alternativeValue = getAlternativeControlValue(control, currentValue);

                if (alternativeValue === undefined) {
                    disconnectedControls.push(`${doc.id}: ${control.name}`);
                    continue;
                }

                const baseMarkup = renderExampleMarkup(doc, baseValues);
                const changedMarkup = renderExampleMarkup(doc, {
                    ...baseValues,
                    [control.name]: alternativeValue,
                });

                if (baseMarkup === changedMarkup) {
                    disconnectedControls.push(`${doc.id}: ${control.name}`);
                }
            }
        }

        expect(disconnectedControls).toEqual([]);
    });
});
