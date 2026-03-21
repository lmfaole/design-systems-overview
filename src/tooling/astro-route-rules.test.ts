import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    allowedDesignSystemIslandRoutes,
    getAstroMarkupViolations,
    getDesignSystemIslandViolations,
    listFiles,
} from "../../scripts/lib/astro-route-rules.mjs";

const projectRoot = process.cwd();
const layoutFiles = listFiles(path.resolve(projectRoot, "src/layouts"), ".astro");
const pageFiles = listFiles(path.resolve(projectRoot, "src/pages"), ".astro");
const astroFiles = [...layoutFiles, ...pageFiles];
const designSystemRoutes = pageFiles.filter((filePath) => filePath.includes(`${path.sep}src${path.sep}pages${path.sep}ds${path.sep}`));

describe("Astro route rules", () => {
    it("keeps inline styles and inline event handlers out of Astro markup", () => {
        const violations = astroFiles.flatMap((filePath) => {
            const relativePath = path.relative(projectRoot, filePath);
            const source = readFileSync(filePath, "utf8");

            return getAstroMarkupViolations(relativePath, source);
        });

        expect(violations).toEqual([]);
    });

    it("only allows client:* islands in explicitly approved DS routes", () => {
        const violations = designSystemRoutes.flatMap((filePath) => {
            const relativePath = path.relative(projectRoot, filePath);
            const source = readFileSync(filePath, "utf8");

            return getDesignSystemIslandViolations(relativePath, source);
        });

        expect(violations).toEqual([]);
        expect(Array.from(allowedDesignSystemIslandRoutes).sort()).toEqual([
            "src/pages/ds/jokul/component/[id].astro",
            "src/pages/ds/jokul/component/index.astro",
            "src/pages/ds/jokul/component/props/index.astro",
        ]);
    });
});
