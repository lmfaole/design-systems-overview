import {readFileSync} from "node:fs";
import path from "node:path";
import {describe, expect, it} from "vitest";

const baseLayoutSource = readFileSync(
    path.resolve(process.cwd(), "src/layouts/BaseLayout.astro"),
    "utf8",
);
const jokulStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/_styles/jokul.scss"),
    "utf8",
);
const globalStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/styles/globals.scss"),
    "utf8",
);

describe("Jokul site shell styling", () => {
    it("scopes site-only root styles away from portaled Jøkul components", () => {
        expect(baseLayoutSource).toContain('class="jkl-site site-layout"');
        expect(jokulStylesSource).toContain(".jkl-site {");
        expect(jokulStylesSource).toContain("body:has(.jkl-site)");
        expect(globalStylesSource).toContain("body:has(.jkl-site)");
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl(?=[\s{.:#[])/m);
        expect(globalStylesSource).not.toContain("body:has(.jkl)");
    });
});
