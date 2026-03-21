import {createRequire} from "node:module";
import {createElement, Fragment} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {afterAll, beforeAll, describe, expect, it, vi} from "vitest";
import {buildExampleControls} from "./utils/example-controls";
import {componentDocs, getComponentDoc} from "./data";

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

function buildExampleProps(doc: (typeof componentDocs)[number]) {
    const controls = doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig);
    return Object.fromEntries(
        controls.map((control) => [control.name, getControlDefaultValue(control)]),
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
});
