import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { jokulOverviewThemeStyles } from "./jokulOverviewThemeStyles";

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
const dsIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/index.astro"),
    "utf8",
);
const jokulTokenIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/token/index.astro"),
    "utf8",
);
const searchPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/sok/index.astro"),
    "utf8",
);
const dsOverviewPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/overview/DesignSystemsPage.astro"),
    "utf8",
);
const jokulHomePageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/overview/JokulHomePage.astro"),
    "utf8",
);

describe("Layout performance wiring", () => {
    it("renders the site breadcrumb on the server instead of hydrating it", () => {
        expect(baseLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(baseLayoutSource).toContain('import SiteHeader from "@/components/site/SiteHeader/SiteHeader.astro";');
        expect(baseLayoutSource).toContain('import SiteFooter from "@/components/site/SiteFooter/SiteFooter.astro";');
        expect(baseLayoutSource).toContain('import SiteBreadcrumb from "@/components/site/SiteBreadcrumb/SiteBreadcrumb.astro";');
        expect(baseLayoutSource).toContain('import "@/styles/grid.scss";');
        expect(baseLayoutSource).not.toContain('import { SiteHeader } from "@/components/site/SiteHeader";');
        expect(baseLayoutSource).not.toContain("client:load");
    });

    it("uses the lightweight Jøkul overview layout on overview-style pages", () => {
        expect(jokulOverviewLayoutSource).toContain('import "@fremtind/jokul/styles/fonts/webfonts.scss";');
        expect(jokulOverviewLayoutSource).toContain("import { jokulOverviewThemeStyles } from \"./jokulOverviewThemeStyles\";");
        expect(jokulOverviewLayoutSource).toContain("<style is:inline set:html={jokulOverviewThemeStyles} />");
        expect(jokulOverviewLayoutSource).not.toContain('import "@/styles/globals.scss";');
        expect(jokulOverviewLayoutSource).not.toContain('import BaseLayout from "@/layouts/BaseLayout.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteHeader from "@/components/site/SiteHeader/SiteHeader.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteFooter from "@/components/site/SiteFooter/SiteFooter.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteBreadcrumb from "@/components/site/SiteBreadcrumb/SiteBreadcrumb.astro";');
        expect(jokulOverviewLayoutSource).toContain('import "@/styles/grid.scss";');
        expect(jokulOverviewLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(dsIndexPageSource).toContain('import DesignSystemsPage from "@/features/ds/overview/DesignSystemsPage.astro";');
        expect(jokulIndexPageSource).toContain('import JokulHomePage from "@/features/ds/jokul/overview/JokulHomePage.astro";');
        expect(jokulTokenIndexPageSource).toContain('import JokulOverviewLayout from "@/layouts/JokulOverviewLayout.astro";');
    });

    it("uses Fremtind Grotesk for the Jøkul overview theme", () => {
        expect(jokulOverviewThemeStyles).toContain(
            '--site-font-family: "Fremtind Grotesk", "Adjusted Arial Fallback", arial, sans-serif;',
        );
    });

    it("renders the search page without React islands", () => {
        expect(searchPageSource).not.toContain("client:load");
        expect(searchPageSource).not.toContain("SearchPageClient");
    });

    it("keeps the /ds and /ds/jokul landing pages in Astro instead of React wrappers", () => {
        expect(dsOverviewPageSource).toContain("<main class=\"page\">");
        expect(dsOverviewPageSource).not.toContain('import { PageHeader }');
        expect(dsOverviewPageSource).not.toContain('import { DesignSystemExternalLinks }');
        expect(jokulHomePageSource).toContain("<main class=\"page overview-page overview-nav-page\">");
        expect(jokulHomePageSource).not.toContain('import type React');
        expect(jokulHomePageSource).not.toContain("className=");
    });
});
