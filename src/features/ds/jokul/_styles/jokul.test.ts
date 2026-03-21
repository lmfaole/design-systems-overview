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
        expect(globalStylesSource).toContain("@layer site, jokul.components, jokul.theme;");
        expect(jokulStylesSource).toContain("@layer site, jokul.components, jokul.theme;");
        expect(globalStylesSource).toContain("@layer site {");
        expect(jokulStylesSource).toContain("@layer site {");
        expect(jokulStylesSource).toContain(".jkl-site {");
        expect(jokulStylesSource).toContain("body:has(.jkl-site)");
        expect(globalStylesSource).toContain("body:has(.jkl-site)");
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl(?=[\s{.:#[])/m);
        expect(globalStylesSource).not.toContain("body:has(.jkl)");
    });

    it("keeps site prose rules from styling classed component internals in examples", () => {
        expect(globalStylesSource).toContain("hr:not([class])");
        expect(globalStylesSource).toContain("blockquote:not([class])");
        expect(globalStylesSource).toContain("pre:not([class])");
        expect(globalStylesSource).toContain(":where(code, kbd, samp, pre):not([class])");
        expect(globalStylesSource).toContain(":where(h1, h2, h3):not([class])");
        expect(globalStylesSource).toContain(":where(ul, ol, dl):not([class]):not([aria-labelledby])");
        expect(globalStylesSource).toContain(":where(ul, ol):not([class]):not([aria-labelledby])");
        expect(globalStylesSource).not.toContain(":where(ul, ol, dl):not([class]) {");
        expect(globalStylesSource).not.toContain(":where(ul, ol):not([class]) {");
        expect(globalStylesSource).not.toMatch(/^\s*hr\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*blockquote\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*pre\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*h1\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*h2\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*h3\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*h4\s*\{/m);
        expect(globalStylesSource).not.toMatch(/^\s*h5\s*\{/m);
        expect(jokulStylesSource).toContain(".jkl-site hr:not([class])");
        expect(jokulStylesSource).toContain(".jkl-site blockquote:not([class])");
        expect(jokulStylesSource).toContain(".jkl-site pre:not([class])");
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site hr\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site p\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site h1\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site h2\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site h3\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site h4\s*\{/m);
        expect(jokulStylesSource).not.toMatch(/^\s*\.jkl-site h5\s*\{/m);
    });
});
