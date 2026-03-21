import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const componentDetailRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/[id].astro"),
    "utf8",
);
const componentIndexRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/index.astro"),
    "utf8",
);
const propIndexRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/props/index.astro"),
    "utf8",
);
const componentIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/ComponentIndexPage/Page.astro"),
    "utf8",
);
const propIndexPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/PropIndexPage/Page.astro"),
    "utf8",
);
const componentDetailPageSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/ComponentDetailPage/Page.astro"),
    "utf8",
);
const componentDetailPropTableSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/components/ComponentDetailPage/PropTable.astro"),
    "utf8",
);

describe("Jøkul component routes", () => {
    it("renders the index and props routes through Astro page components with native markup", () => {
        expect(componentIndexRouteSource).toContain(
            'import ComponentIndexPage from "@/features/ds/jokul/components/ComponentIndexPage/Page.astro";',
        );
        expect(propIndexRouteSource).toContain(
            'import PropIndexPage from "@/features/ds/jokul/components/PropIndexPage/Page.astro";',
        );
        expect(componentIndexRouteSource).not.toContain("client:load");
        expect(propIndexRouteSource).not.toContain("client:load");
        expect(componentIndexPageSource).toContain('class="site-card site-card-link"');
        expect(componentIndexPageSource).not.toContain('import { Card }');
        expect(propIndexPageSource).toContain('<table class="site-table">');
        expect(propIndexPageSource).not.toContain("PropIndexTable");
        expect(propIndexPageSource).not.toContain('@fremtind/jokul/table');
    });

    it("keeps only the live example as a hydrated island on detail pages", () => {
        expect(componentDetailRouteSource).toContain("export function getStaticPaths()");
        expect(componentDetailRouteSource).toContain("return componentDocs.map((doc) => ({");
        expect(componentDetailRouteSource).toContain(
            'import ComponentDetailPage from "@/features/ds/jokul/components/ComponentDetailPage/Page.astro";',
        );
        expect(componentDetailRouteSource).not.toContain("ComponentPageClient");
        expect(componentDetailRouteSource).not.toContain("client:load");
        expect(componentDetailPageSource).toContain('<ComponentExampleIsland id={doc.id} client:only="react" />');
        expect(componentDetailPageSource).not.toContain("ComponentPageClient");
        expect(componentDetailPageSource).not.toContain("@fremtind/jokul/table");
        expect(componentDetailPageSource).not.toContain("@fremtind/jokul/message");
        expect(componentDetailPageSource).not.toContain("@fremtind/jokul/description-list");
        expect(componentDetailPageSource).not.toContain("RelatedComponentsTable");
        expect(componentDetailPageSource).not.toContain("SubcomponentsList");
        expect(componentDetailPageSource).not.toContain("AlternativesList");
        expect(componentDetailPageSource).toContain('class="site-card component-pattern-card"');
        expect(componentDetailPropTableSource).toContain('<table class="site-table component-prop-table">');
        expect(componentDetailPropTableSource).toContain('popover="auto"');
    });
});
