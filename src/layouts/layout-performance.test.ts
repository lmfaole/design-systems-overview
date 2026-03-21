import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const baseLayoutSource = readFileSync(
    path.resolve(process.cwd(), "src/layouts/BaseLayout.astro"),
    "utf8",
);
const jokulOverviewLayoutSource = readFileSync(
    path.resolve(process.cwd(), "src/layouts/JokulOverviewLayout.astro"),
    "utf8",
);
const jokulIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/index.astro"),
    "utf8",
);
const jokulTokenIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/token/index.astro"),
    "utf8",
);

describe("Layout performance wiring", () => {
    it("renders the site breadcrumb on the server instead of hydrating it", () => {
        expect(baseLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(baseLayoutSource).not.toContain("client:load");
    });

    it("uses the lightweight Jøkul overview layout on overview-style pages", () => {
        expect(jokulOverviewLayoutSource).toContain("import { jokulOverviewThemeStyles } from \"./jokulOverviewThemeStyles\";");
        expect(jokulOverviewLayoutSource).toContain("<style is:inline set:html={jokulOverviewThemeStyles} />");
        expect(jokulOverviewLayoutSource).not.toContain('import "@/styles/globals.scss";');
        expect(jokulOverviewLayoutSource).not.toContain('import BaseLayout from "@/layouts/BaseLayout.astro";');
        expect(jokulOverviewLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(jokulIndexPageSource).toContain('import JokulOverviewLayout from "@/layouts/JokulOverviewLayout.astro";');
        expect(jokulTokenIndexPageSource).toContain('import JokulOverviewLayout from "@/layouts/JokulOverviewLayout.astro";');
    });
});
