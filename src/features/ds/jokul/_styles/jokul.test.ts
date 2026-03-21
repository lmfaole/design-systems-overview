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
const jokulOverviewStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/_styles/jokul-overview.scss"),
    "utf8",
);
const jokulSiteShellSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/_styles/_site-shell.scss"),
    "utf8",
);
const jokulOverviewSiteShellSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/_styles/_site-shell-overview.scss"),
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
        expect(jokulSiteShellSource).toContain("@layer site, jokul.components, jokul.theme;");
        expect(globalStylesSource).toContain("@layer site {");
        expect(jokulSiteShellSource).toContain("@layer site {");
        expect(jokulSiteShellSource).toContain(".jkl-site {");
        expect(jokulOverviewSiteShellSource).toContain(".jkl-site {");
        expect(jokulSiteShellSource).toContain("body:has(.jkl-site)");
        expect(jokulOverviewSiteShellSource).toContain("body:has(.jkl-site)");
        expect(jokulStylesSource).toContain('@use "./site-shell.scss";');
        expect(jokulOverviewStylesSource).toContain('@use "./site-shell-overview.scss";');
        expect(globalStylesSource).toContain("body:has(.jkl-site)");
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl(?=[\s{.:#[])/m);
        expect(jokulOverviewSiteShellSource).not.toMatch(/^\s*\.jkl(?=[\s{.:#[])/m);
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
        expect(jokulSiteShellSource).toContain(".jkl-site hr:not([class])");
        expect(jokulSiteShellSource).toContain(".jkl-site blockquote:not([class])");
        expect(jokulSiteShellSource).toContain(".jkl-site pre:not([class])");
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site hr\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site p\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site h1\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site h2\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site h3\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site h4\s*\{/m);
        expect(jokulSiteShellSource).not.toMatch(/^\s*\.jkl-site h5\s*\{/m);
    });

    it("uses Jøkul mixins and tokens for default prose elements inside /jokul", () => {
        expect(jokulSiteShellSource).toContain('@include jkl.use-font-family("Fremtind Grotesk");');
        expect(jokulSiteShellSource).toContain('--site-heading-margin-block-start: var(--jkl-spacing-xl);');
        expect(jokulSiteShellSource).toContain('--site-list-padding-inline-start: var(--jkl-spacing-l);');
        expect(jokulSiteShellSource).toContain('--site-form-gap: var(--jkl-spacing-s);');
        expect(jokulSiteShellSource).toContain('--site-quote-border-width: var(--jkl-border-width-3);');
        expect(jokulSiteShellSource).toContain('.jkl-site :where(h1, h2, h3):not([class])');
        expect(jokulSiteShellSource).toContain('.jkl-site :where(h4, h5, h6):not([class])');
        expect(jokulSiteShellSource).toContain('.jkl-site h6:not([class])');
        expect(jokulSiteShellSource).toContain('@include jkl.text-style("heading-1");');
        expect(jokulSiteShellSource).toContain('@include jkl.text-style("paragraph-medium");');
        expect(jokulSiteShellSource).toContain('@include jkl.text-style("text-medium");');
        expect(jokulSiteShellSource).toContain('.jkl-site :where(ul, ol, dl):not([class]):not([aria-labelledby])');
        expect(jokulSiteShellSource).toContain('.jkl-site :where(form, fieldset):not([class])');
        expect(jokulSiteShellSource).toContain('.jkl-site :where(code, kbd, samp, pre):not([class])');
    });
});
