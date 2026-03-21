import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const fontSourceDir = path.join(repoRoot, "node_modules/@fremtind/jokul/src/fonts");
const fontTargetDir = path.join(repoRoot, "public/fonts");
const componentDocsIndexPath = path.join(
    repoRoot,
    "src/features/ds/jokul/_component-docs/docs/index.ts",
);
const tokenPostsIndexPath = path.join(
    repoRoot,
    "src/features/ds/jokul/_token/posts/index.ts",
);
const generatedSearchIndexPath = path.join(
    repoRoot,
    "src/data/ds/search/generated/jokul-search-documents.ts",
);
const searchIndexScriptPath = path.join(repoRoot, "scripts/generate-search-index.mjs");

const fontMatchers = [
    /^FremtindGrotesk-.*\.woff2?$/,
    /^FremtindGroteskMono-.*\.woff2?$/,
    /^Fremtind-Material-Symbols\.woff2$/,
];

function parseTsFile(filePath) {
    const sourceText = fs.readFileSync(filePath, "utf8");
    return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
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

function getImportPaths(indexPath) {
    const sourceFile = parseTsFile(indexPath);
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

function needsCopy(sourcePath, targetPath) {
    if (!fs.existsSync(targetPath)) return true;

    const sourceStat = fs.statSync(sourcePath);
    const targetStat = fs.statSync(targetPath);

    return sourceStat.size !== targetStat.size || sourceStat.mtimeMs > targetStat.mtimeMs;
}

function syncFonts() {
    fs.mkdirSync(fontTargetDir, { recursive: true });

    const fontFiles = fs.readdirSync(fontSourceDir)
        .filter((fileName) => fontMatchers.some((pattern) => pattern.test(fileName)));

    let copied = 0;

    for (const fileName of fontFiles) {
        const sourcePath = path.join(fontSourceDir, fileName);
        const targetPath = path.join(fontTargetDir, fileName);

        if (!needsCopy(sourcePath, targetPath)) {
            continue;
        }

        fs.copyFileSync(sourcePath, targetPath);
        copied += 1;
    }

    if (copied > 0) {
        console.log(`Updated ${copied} font file${copied === 1 ? "" : "s"}.`);
    } else {
        console.log("Fonts already up to date.");
    }
}

function getSearchIndexDependencies() {
    const componentDocPaths = getImportPaths(componentDocsIndexPath);
    const tokenPostPaths = getImportPaths(tokenPostsIndexPath);
    const propPaths = componentDocPaths
        .map((docPath) => {
            const propsBasePath = path.resolve(path.dirname(docPath), "props");
            const candidates = [`${propsBasePath}.ts`, `${propsBasePath}.tsx`];
            return candidates.find((candidate) => fs.existsSync(candidate));
        })
        .filter((candidate) => Boolean(candidate));

    return [
        searchIndexScriptPath,
        componentDocsIndexPath,
        tokenPostsIndexPath,
        ...componentDocPaths,
        ...tokenPostPaths,
        ...propPaths,
    ];
}

function isCurrent(outputPath, dependencyPaths) {
    if (!fs.existsSync(outputPath)) return false;

    const outputMtime = fs.statSync(outputPath).mtimeMs;

    return dependencyPaths.every((dependencyPath) => fs.statSync(dependencyPath).mtimeMs <= outputMtime);
}

function ensureSearchIndex() {
    const dependencies = getSearchIndexDependencies();

    if (isCurrent(generatedSearchIndexPath, dependencies)) {
        console.log("Search index already up to date.");
        return;
    }

    execFileSync(process.execPath, [searchIndexScriptPath], {
        cwd: repoRoot,
        stdio: "inherit",
    });
}

syncFonts();
ensureSearchIndex();
