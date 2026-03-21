import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {
    getAstroMarkupViolations,
    getDesignSystemIslandViolations,
    listFiles,
} from "./lib/astro-route-rules.mjs";

const projectRoot = process.cwd();
const astroRoots = [
    "src/layouts",
    "src/pages",
];

const violations = [];

for (const root of astroRoots) {
    const absoluteRoot = path.join(projectRoot, root);

    for (const absoluteFilePath of listFiles(absoluteRoot, ".astro")) {
        const relativePath = path.relative(projectRoot, absoluteFilePath);
        const source = fs.readFileSync(absoluteFilePath, "utf8");

        violations.push(...getAstroMarkupViolations(relativePath, source));
        violations.push(...getDesignSystemIslandViolations(relativePath, source));
    }
}

if (violations.length > 0) {
    console.error("Repo rule violations:");
    for (const violation of violations) {
        console.error(`- ${violation}`);
    }
    process.exit(1);
}

console.log("Repo rules passed.");
