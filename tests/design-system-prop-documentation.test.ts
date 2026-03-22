import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

import { jokulLocalDocs } from "../src/data/design-systems/systems/jokul/local-docs/index.ts";
import type {
    DesignSystemComponentAssetDoc,
    DesignSystemComponentPropDocumentationEntry,
} from "../src/data/design-systems/types.ts";

const require = createRequire(import.meta.url);
const jokulPackageJsonPath = require.resolve("@fremtind/jokul/package.json");
const jokulPackageRoot = path.normalize(path.dirname(jokulPackageJsonPath));
const jokulPackage = require(jokulPackageJsonPath) as {
    exports: Record<string, unknown>;
};

const documentedComponents = jokulLocalDocs.sections
    .filter((section) => section.kind === "component")
    .flatMap((section) => section.items)
    .filter((asset): asset is DesignSystemComponentAssetDoc => asset.kind === "component");

const exportTypePaths = [
    ...new Set(
        documentedComponents.flatMap((component) =>
            component.componentProfile.propDocumentation.entries.map((entry) =>
                resolveJokulTypesPath(entry.importPath)
            )
        ),
    ),
];

const program = ts.createProgram({
    rootNames: exportTypePaths,
    options: {
        allowJs: false,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        noEmit: true,
        skipLibCheck: true,
        target: ts.ScriptTarget.ESNext,
    },
});

const checker = program.getTypeChecker();
const publicPropCache = new Map<string, string[]>();

function resolveJokulTypesPath(importPath: string): string {
    const subpath = importPath === "@fremtind/jokul"
        ? "."
        : `.${importPath.slice("@fremtind/jokul".length)}`;
    const exportEntry = jokulPackage.exports[subpath];

    assert.ok(exportEntry, `Fant ikke exports-oppføring for ${importPath}.`);

    const importEntry = typeof exportEntry === "object" && exportEntry !== null && "import" in exportEntry
        ? exportEntry.import
        : exportEntry;
    const resolvedTypesPath = typeof importEntry === "object" && importEntry !== null && "types" in importEntry
        ? importEntry.types
        : typeof exportEntry === "object" && exportEntry !== null && "types" in exportEntry
            ? exportEntry.types
            : undefined;

    if (typeof resolvedTypesPath !== "string") {
        assert.fail(`Fant ikke types-path for ${importPath}.`);
    }

    return path.resolve(jokulPackageRoot, resolvedTypesPath);
}

function getExportedTypeSymbol(
    typesPath: string,
    typeName: string,
): ts.Symbol {
    const sourceFile = program.getSourceFile(typesPath);

    assert.ok(sourceFile, `Fant ikke source file for ${typesPath}.`);

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);

    assert.ok(moduleSymbol, `Fant ikke modulsymbol for ${typesPath}.`);

    const exportedSymbol = checker.getExportsOfModule(moduleSymbol).find((symbol) =>
        symbol.name === typeName
    );

    assert.ok(exportedSymbol, `Fant ikke eksportert type ${typeName} i ${typesPath}.`);

    return exportedSymbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exportedSymbol)
        : exportedSymbol;
}

function isJokulPackageDeclaration(declaration: ts.Declaration): boolean {
    return path.normalize(declaration.getSourceFile().fileName).startsWith(jokulPackageRoot);
}

function getPropertyName(symbol: ts.Symbol): string {
    for (const declaration of symbol.getDeclarations() ?? []) {
        if (
            (ts.isPropertySignature(declaration) || ts.isPropertyDeclaration(declaration)) &&
            declaration.name
        ) {
            if (ts.isIdentifier(declaration.name) || ts.isPrivateIdentifier(declaration.name)) {
                return declaration.name.text;
            }

            if (ts.isStringLiteralLike(declaration.name)) {
                return declaration.name.text;
            }
        }
    }

    return symbol.getName();
}

function getJokulPublicPropNames(
    entry: DesignSystemComponentPropDocumentationEntry,
): string[] {
    const cacheKey = `${entry.importPath}:${entry.typeName}`;
    const cachedPropNames = publicPropCache.get(cacheKey);

    if (cachedPropNames) {
        return cachedPropNames;
    }

    const typesPath = resolveJokulTypesPath(entry.importPath);
    const typeSymbol = getExportedTypeSymbol(typesPath, entry.typeName);
    const publicPropNames = checker
        .getPropertiesOfType(checker.getDeclaredTypeOfSymbol(typeSymbol))
        .filter((symbol) => getPropertyName(symbol) !== "ref")
        .filter((symbol) =>
            (symbol.getDeclarations() ?? []).some((declaration) =>
                isJokulPackageDeclaration(declaration)
            )
        )
        .map((symbol) => getPropertyName(symbol))
        .sort((left, right) => left.localeCompare(right, "nb"));

    publicPropCache.set(cacheKey, publicPropNames);

    return publicPropNames;
}

test("Jøkul local docs validate", async () => {
    await import("../src/data/design-systems/systems/jokul/index.ts");
});

test("Jøkul prop contracts match exported package props", async (t) => {
    for (const component of documentedComponents) {
        for (const entry of component.componentProfile.propDocumentation.entries) {
            await t.test(`${component.slug}:${entry.typeName}`, () => {
                assert.deepEqual(
                    [...entry.documentedProps].sort((left, right) =>
                        left.localeCompare(right, "nb")
                    ),
                    getJokulPublicPropNames(entry),
                );
            });
        }
    }
});
