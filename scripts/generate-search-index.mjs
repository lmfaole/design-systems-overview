import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const componentDocsIndexPath = path.join(
    repoRoot,
    "src/features/ds/jokul/_component-docs/docs/index.ts",
);
const tokenPostsIndexPath = path.join(
    repoRoot,
    "src/features/ds/jokul/_token/posts/index.ts",
);
const outputPath = path.join(
    repoRoot,
    "src/data/ds/search/generated/jokul-search-documents.ts",
);

function parseTsxFile(filePath) {
    const sourceText = fs.readFileSync(filePath, "utf8");
    return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function getImportPaths(indexPath) {
    const sourceFile = parseTsxFile(indexPath);
    const baseDir = path.dirname(indexPath);

    return sourceFile.statements
        .filter(ts.isImportDeclaration)
        .filter((statement) => !statement.importClause?.isTypeOnly)
        .map((statement) => statement.moduleSpecifier)
        .filter(ts.isStringLiteral)
        .map((specifier) => specifier.text)
        .filter((specifier) => specifier.startsWith("."))
        .map((specifier) => resolveModulePath(baseDir, specifier));
}

function resolveModulePath(baseDir, specifier) {
    const absoluteBase = path.resolve(baseDir, specifier);
    const candidates = [
        `${absoluteBase}.ts`,
        `${absoluteBase}.tsx`,
        path.join(absoluteBase, "index.ts"),
        path.join(absoluteBase, "index.tsx"),
    ];

    const resolved = candidates.find((candidate) => fs.existsSync(candidate));
    if (!resolved) {
        throw new Error(`Could not resolve module "${specifier}" from ${baseDir}`);
    }

    return resolved;
}

function findVariableObject(sourceFile, variableName) {
    for (const statement of sourceFile.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (
                ts.isIdentifier(declaration.name) &&
                declaration.name.text === variableName &&
                declaration.initializer &&
                ts.isObjectLiteralExpression(declaration.initializer)
            ) {
                return declaration.initializer;
            }
        }
    }

    throw new Error(`Could not find object variable "${variableName}" in ${sourceFile.fileName}`);
}

function getProperty(objectNode, propertyName) {
    return objectNode.properties.find((property) => {
        if (!ts.isPropertyAssignment(property)) return false;
        const name = getPropertyName(property.name);
        return name === propertyName;
    });
}

function getPropertyName(nameNode) {
    if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode)) {
        return nameNode.text;
    }

    return undefined;
}

function getInitializer(objectNode, propertyName) {
    const property = getProperty(objectNode, propertyName);
    if (!property || !ts.isPropertyAssignment(property)) {
        return undefined;
    }

    return property.initializer;
}

function readString(objectNode, propertyName) {
    const initializer = getInitializer(objectNode, propertyName);
    if (!initializer) return undefined;

    if (ts.isStringLiteralLike(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
        return initializer.text;
    }

    throw new Error(`Expected string for "${propertyName}" in ${objectNode.getSourceFile().fileName}`);
}

function readStringArray(objectNode, propertyName) {
    const initializer = getInitializer(objectNode, propertyName);
    if (!initializer) return [];
    if (!ts.isArrayLiteralExpression(initializer)) {
        throw new Error(`Expected array for "${propertyName}" in ${objectNode.getSourceFile().fileName}`);
    }

    return initializer.elements
        .filter(ts.isStringLiteralLike)
        .map((element) => element.text);
}

function readObject(objectNode, propertyName) {
    const initializer = getInitializer(objectNode, propertyName);
    if (!initializer) return undefined;
    if (!ts.isObjectLiteralExpression(initializer)) {
        throw new Error(`Expected object for "${propertyName}" in ${objectNode.getSourceFile().fileName}`);
    }

    return initializer;
}

function readRelationshipIds(objectNode) {
    const relationships = readObject(objectNode, "relationships");
    if (!relationships) return [];

    const ids = [];
    for (const property of relationships.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isArrayLiteralExpression(property.initializer)) continue;
        for (const element of property.initializer.elements) {
            if (!ts.isObjectLiteralExpression(element)) continue;
            const id = readString(element, "id");
            if (id) ids.push(id);
        }
    }

    return ids;
}

function readPropNames(propsPath) {
    const sourceFile = parseTsxFile(propsPath);
    for (const statement of sourceFile.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (
                ts.isIdentifier(declaration.name) &&
                declaration.name.text === "props" &&
                declaration.initializer &&
                ts.isArrayLiteralExpression(declaration.initializer)
            ) {
                return declaration.initializer.elements
                    .filter(ts.isObjectLiteralExpression)
                    .map((element) => readString(element, "name"))
                    .filter(Boolean);
            }
        }
    }

    throw new Error(`Could not find exported props in ${propsPath}`);
}

function extractComponentSearchDocs() {
    return getImportPaths(componentDocsIndexPath).map((docPath) => {
        const sourceFile = parseTsxFile(docPath);
        const doc = findVariableObject(sourceFile, "doc");
        const description = readObject(doc, "description");
        const propsPath = resolveModulePath(path.dirname(docPath), "./props");
        const relationshipIds = readRelationshipIds(doc);

        return {
            id: `component-${readString(doc, "id")}`,
            designSystemId: "jokul",
            designSystemName: "Jøkul",
            kind: "component",
            title: readString(doc, "name"),
            description: readString(description, "short"),
            keywords: [
                readString(doc, "id"),
                readString(doc, "package"),
                readString(doc, "category"),
                readString(description, "long"),
                ...readPropNames(propsPath),
                ...relationshipIds,
            ].filter(Boolean),
            href: `/ds/jokul/component/${readString(doc, "id")}`,
            meta: `Jøkul · Komponent · ${readString(doc, "category")}`,
        };
    });
}

function extractTokenSearchDocs() {
    return getImportPaths(tokenPostsIndexPath).map((postPath) => {
        const sourceFile = parseTsxFile(postPath);
        const post = findVariableObject(sourceFile, "post");

        return {
            id: `token-${readNumber(post, "id")}`,
            designSystemId: "jokul",
            designSystemName: "Jøkul",
            kind: "token",
            title: readString(post, "title"),
            description: readString(post, "excerpt"),
            keywords: readStringArray(post, "relatedComponents"),
            href: `/ds/jokul/token/${slugify(readString(post, "title"))}`,
            meta: "Jøkul · Designtoken",
        };
    });
}

function readNumber(objectNode, propertyName) {
    const initializer = getInitializer(objectNode, propertyName);
    if (!initializer || !ts.isNumericLiteral(initializer)) {
        throw new Error(`Expected number for "${propertyName}" in ${objectNode.getSourceFile().fileName}`);
    }

    return Number(initializer.text);
}

function slugify(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function writeOutput(searchDocs) {
    const content = `// This file is generated by scripts/generate-search-index.mjs
// Do not edit manually.

export const jokulSearchDocuments = ${JSON.stringify(searchDocs, null, 4)} as const;
`;

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);
}

writeOutput([
    ...extractComponentSearchDocs(),
    ...extractTokenSearchDocs(),
]);
