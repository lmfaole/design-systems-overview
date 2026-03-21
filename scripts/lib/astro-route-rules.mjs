import fs from "node:fs";
import path from "node:path";

export const allowedDesignSystemIslandRoutes = new Set([
    "src/pages/ds/jokul/component/[id].astro",
    "src/pages/ds/jokul/component/index.astro",
    "src/pages/ds/jokul/component/props/index.astro",
]);

const inlineStylePattern = /<[^>]+\sstyle\s*=/s;
const inlineEventHandlerPattern = /<[^>]+\son[a-z][a-z0-9-]*\s*=/s;
const clientDirectivePattern = /\bclient:(?:load|idle|visible|only|media)\b/;

export function listFiles(rootDirectory, extension) {
    const files = [];

    function walk(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                walk(entryPath);
                continue;
            }

            if (entry.isFile() && entryPath.endsWith(extension)) {
                files.push(entryPath);
            }
        }
    }

    walk(rootDirectory);

    return files.sort();
}

export function getAstroTemplate(source) {
    const lines = source.split(/\r?\n/u);

    if (lines[0] !== "---") {
        return source;
    }

    const closingFrontmatterLine = lines.findIndex((line, index) => index > 0 && line === "---");

    if (closingFrontmatterLine === -1) {
        return source;
    }

    return lines.slice(closingFrontmatterLine + 1).join("\n");
}

export function getAstroMarkupViolations(relativePath, source) {
    const template = getAstroTemplate(source);
    const violations = [];

    if (inlineStylePattern.test(template)) {
        violations.push(`${relativePath}: inline style attributes are not allowed in Astro markup`);
    }

    if (inlineEventHandlerPattern.test(template)) {
        violations.push(`${relativePath}: inline event handlers are not allowed in Astro markup`);
    }

    return violations;
}

export function getDesignSystemIslandViolations(relativePath, source) {
    if (!relativePath.startsWith("src/pages/ds/")) {
        return [];
    }

    if (allowedDesignSystemIslandRoutes.has(relativePath)) {
        return [];
    }

    const template = getAstroTemplate(source);

    if (!clientDirectivePattern.test(template)) {
        return [];
    }

    return [`${relativePath}: unexpected client:* island in a design-system Astro route`];
}
