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
const homeRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/index.astro"),
    "utf8",
);
const dsIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/index.astro"),
    "utf8",
);
const notFoundPageRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/404.astro"),
    "utf8",
);
const jokulTokenIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/token/index.astro"),
    "utf8",
);
const jokulTokenDetailPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/token/[slug].astro"),
    "utf8",
);
const formatterIndexRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/formatter/index.astro"),
    "utf8",
);
const formatterDetailRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/formatter/[id].astro"),
    "utf8",
);
const searchPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/sok/index.astro"),
    "utf8",
);
const monsterIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/monster/index.astro"),
    "utf8",
);
const monsterDetailRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/monster/[slug].astro"),
    "utf8",
);
const componentIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/index.astro"),
    "utf8",
);
const componentPropsPageSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/props/index.astro"),
    "utf8",
);
const componentDetailRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/[id].astro"),
    "utf8",
);
const componentDetailPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/ComponentDetailPage/Page.astro"),
    "utf8",
);
const componentIndexFeatureSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/ComponentIndexPage/Page.astro"),
    "utf8",
);
const componentPropsFeatureSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/PropIndexPage/Page.astro"),
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
const homePageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/site/home/HomePage.astro"),
    "utf8",
);
const formatterIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/formatters/FormatterIndexPage.astro"),
    "utf8",
);
const formatterDetailPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/formatters/FormatterPage.astro"),
    "utf8",
);
const jokulTokenIndexSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/tokens/TokenIndexPage.astro"),
    "utf8",
);
const jokulTokenDetailSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/tokens/TokenPostPage.astro"),
    "utf8",
);
const monsterOverviewPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/monster/overview/PatternIndexPage.astro"),
    "utf8",
);
const monsterDetailPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/monster/detail/Page.astro"),
    "utf8",
);

describe("Layout performance wiring", () => {
    it("renders the site breadcrumb on the server instead of hydrating it", () => {
        expect(baseLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(baseLayoutSource).toContain('import SiteHeader from "@/components/SiteHeader.astro";');
        expect(baseLayoutSource).toContain('import SiteFooter from "@/components/SiteFooter.astro";');
        expect(baseLayoutSource).toContain('import SiteBreadcrumb from "@/components/SiteBreadcrumb.astro";');
        expect(baseLayoutSource).toContain('import "@/styles/card.scss";');
        expect(baseLayoutSource).toContain('import "@/styles/form.scss";');
        expect(baseLayoutSource).toContain('import "@/styles/grid.scss";');
        expect(baseLayoutSource).toContain('import "@/styles/switch.scss";');
        expect(baseLayoutSource).not.toContain('import "@/styles/select.scss";');
        expect(baseLayoutSource).not.toContain('import "@/styles/text-field.scss";');
        expect(baseLayoutSource).not.toContain('import { SiteHeader } from "@/components/SiteHeader";');
        expect(baseLayoutSource).not.toContain("client:load");
    });

    it("uses the lightweight Jøkul overview layout on overview-style pages", () => {
        expect(jokulOverviewLayoutSource).toContain('import "@fremtind/jokul/styles/fonts/webfonts.scss";');
        expect(jokulOverviewLayoutSource).toContain("import { jokulOverviewThemeStyles } from \"./jokulOverviewThemeStyles\";");
        expect(jokulOverviewLayoutSource).toContain("<style is:inline set:html={jokulOverviewThemeStyles} />");
        expect(jokulOverviewLayoutSource).not.toContain('import "@/styles/globals.scss";');
        expect(jokulOverviewLayoutSource).not.toContain('import BaseLayout from "@/layouts/BaseLayout.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteHeader from "@/components/SiteHeader.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteFooter from "@/components/SiteFooter.astro";');
        expect(jokulOverviewLayoutSource).toContain('import SiteBreadcrumb from "@/components/SiteBreadcrumb.astro";');
        expect(jokulOverviewLayoutSource).toContain('import "@/styles/card.scss";');
        expect(jokulOverviewLayoutSource).toContain('import "@/styles/form.scss";');
        expect(jokulOverviewLayoutSource).toContain('import "@/styles/grid.scss";');
        expect(jokulOverviewLayoutSource).toContain('import "@/styles/switch.scss";');
        expect(jokulOverviewLayoutSource).not.toContain('import "@/styles/select.scss";');
        expect(jokulOverviewLayoutSource).not.toContain('import "@/styles/text-field.scss";');
        expect(jokulOverviewLayoutSource).toContain("<SiteBreadcrumb pathname={path} />");
        expect(dsIndexPageSource).toContain('import DesignSystemsPage from "@/features/ds/overview/DesignSystemsPage.astro";');
        expect(jokulIndexPageSource).toContain('import JokulHomePage from "@/features/ds/jokul/overview/JokulHomePage.astro";');
        expect(jokulTokenIndexPageSource).toContain('import JokulOverviewLayout from "@/layouts/JokulOverviewLayout.astro";');
        expect(jokulTokenIndexPageSource).toContain('import TokenIndexPage from "@/features/ds/jokul/tokens/TokenIndexPage.astro";');
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

    it("keeps the component index routes island-free and hydrates only the live example on detail pages", () => {
        expect(componentIndexPageSource).toContain(
            'import ComponentIndexPage from "@/features/ds/jokul/components/ComponentIndexPage/Page.astro";',
        );
        expect(componentPropsPageSource).toContain(
            'import PropIndexPage from "@/features/ds/jokul/components/PropIndexPage/Page.astro";',
        );
        expect(componentIndexFeatureSource).toContain('import PageHeader from "@/components/PageHeader.astro";');
        expect(componentPropsFeatureSource).toContain('import PageHeader from "@/components/PageHeader.astro";');
        expect(componentDetailPageSource).toContain('import PageHeader from "@/components/PageHeader.astro";');
        expect(componentDetailPageSource).not.toContain('import { PageHeader } from "@/components/PageHeader";');
        expect(componentIndexPageSource).not.toContain("client:load");
        expect(componentPropsPageSource).not.toContain("client:load");
        expect(componentDetailRouteSource).toContain(
            'import ComponentDetailPage from "@/features/ds/jokul/components/ComponentDetailPage/Page.astro";',
        );
        expect(componentDetailRouteSource).not.toContain("ComponentPageClient");
        expect(componentDetailPageSource).toContain('const exampleHydrationMode = getExampleHydrationMode(doc.id);');
        expect(componentDetailPageSource).toContain('<ComponentExampleIsland id={doc.id} client:load />');
        expect(componentDetailPageSource).toContain('<ComponentExampleIsland id={doc.id} client:only="react" />');
    });

    it("keeps the /ds and /ds/jokul landing pages in Astro instead of React wrappers", () => {
        expect(dsOverviewPageSource).toContain("<main class=\"page\">");
        expect(dsOverviewPageSource).not.toContain('import { PageHeader }');
        expect(dsOverviewPageSource).not.toContain('import { DesignSystemExternalLinks }');
        expect(dsOverviewPageSource).toContain(
            'import DesignSystemExternalLinks from "@/components/DesignSystemExternalLinks.astro";',
        );
        expect(jokulHomePageSource).toContain("<main class=\"page overview-page overview-nav-page\">");
        expect(jokulHomePageSource).not.toContain('import type React');
        expect(jokulHomePageSource).not.toContain("className=");
    });

    it("keeps the 404 route Astro-native", () => {
        expect(notFoundPageRouteSource).toContain('import NotFoundPage from "@/components/NotFoundPage.astro";');
        expect(notFoundPageRouteSource).not.toContain('import NotFoundPage from "@/components/NotFoundPage";');
        expect(notFoundPageRouteSource).toContain("<NotFoundPage />");
    });

    it("keeps the home and formatter routes Astro-native", () => {
        expect(homeRouteSource).toContain('import HomePage from "@/features/site/home/HomePage.astro";');
        expect(homeRouteSource).not.toContain('import HomePage from "@/features/site/home/HomePage";');
        expect(homePageSource).toContain('<main class="page" data-ua-only>');
        expect(homePageSource).not.toContain("className=");
        expect(formatterIndexRouteSource).toContain(
            'import FormatterIndexPage from "@/features/ds/jokul/formatters/FormatterIndexPage.astro";',
        );
        expect(formatterDetailRouteSource).toContain(
            'import FormatterPage from "@/features/ds/jokul/formatters/FormatterPage.astro";',
        );
        expect(formatterDetailRouteSource).toContain("<FormatterPage doc={doc} />");
        expect(formatterIndexPageSource).toContain('import PageHeader from "@/components/PageHeader.astro";');
        expect(formatterIndexPageSource).not.toContain("className=");
        expect(formatterDetailPageSource).toContain('import PageHeader from "@/components/PageHeader.astro";');
        expect(formatterDetailPageSource).not.toContain("className=");
    });

    it("keeps the token routes Astro-native", () => {
        expect(jokulTokenIndexPageSource).toContain('import TokenIndexPage from "@/features/ds/jokul/tokens/TokenIndexPage.astro";');
        expect(jokulTokenDetailPageSource).toContain('import TokenPostPage from "@/features/ds/jokul/tokens/TokenPostPage.astro";');
        expect(jokulTokenIndexPageSource).not.toContain("TokenPage");
        expect(jokulTokenDetailPageSource).not.toContain("TokenPostPageClient");
        expect(jokulTokenIndexSource).toContain("<PageHeader");
        expect(jokulTokenIndexSource).not.toContain("className=");
        expect(jokulTokenDetailSource).toContain("<main class=\"page\">");
        expect(jokulTokenDetailSource).toContain("<article class=\"token-article\">");
        expect(jokulTokenDetailSource).toContain("<table class=\"site-table\">");
        expect(jokulTokenDetailSource).not.toContain("TokenArticle");
    });

    it("keeps the monster routes Astro-native", () => {
        expect(monsterIndexPageSource).toContain('import PatternIndexPage from "@/features/ds/monster/overview/PatternIndexPage.astro";');
        expect(monsterDetailRouteSource).toContain('import PatternDetailPage from "@/features/ds/monster/detail/Page.astro";');
        expect(monsterIndexPageSource).not.toContain('import PatternIndexPage from "@/features/ds/monster/overview/PatternIndexPage";');
        expect(monsterDetailRouteSource).not.toContain("PatternTableOfContents");
        expect(monsterDetailRouteSource).not.toContain("DoAndDontsSection");
        expect(monsterOverviewPageSource).toContain("<PageHeader");
        expect(monsterOverviewPageSource).not.toContain("className=");
        expect(monsterDetailPageSource).toContain("<main class=\"page\">");
        expect(monsterDetailPageSource).toContain("serializePatternPost(post)");
        expect(monsterDetailPageSource).toContain("<Fragment set:html={exampleHtml} />");
    });
});
