import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";
import {TokenArticle} from "./TokenArticle";

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({as: Tag = "div", children, direction, gap, ...props}: any) => (
        <Tag data-flex="" data-direction={direction} data-gap={gap} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/table", () => ({
    DataTable: ({caption, columns, rows}: any) => (
        <div data-data-table="" data-caption={caption} data-columns={columns.length} data-rows={rows.length}/>
    ),
}));

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({title, description, background}: any) => (
        <header data-page-header="" data-has-background={String(Boolean(background))}>
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/Article", () => ({
    Article: ({children}: any) => <article data-article="">{children}</article>,
    ArticleToc: () => <nav data-article-toc="">Innholdsfortegnelse</nav>,
}));

vi.mock("@/features/ds/jokul/_token/components/ScssMixinSection", () => ({
    ScssMixinSection: ({mixins}: any) => <section data-scss-mixins={mixins.length}/>,
}));

vi.mock("@/features/ds/jokul/_token/components/Section", () => ({
    Section: ({title, children}: any) => <section data-section={title}>{children}</section>,
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

describe("TokenArticle", () => {
    it("renders token tables, mixins, meta, and the table of contents", () => {
        const html = renderToStaticMarkup(
            <TokenArticle
                title="Farger"
                excerpt="Jøkul-farger"
                illustration={<svg data-illustration="true"/>}
                meta={<div data-meta="">Metadata</div>}
                tokenOverview={[
                    {
                        heading: "Primitive",
                        description: "Faste farger",
                        caption: "Primitive farger",
                        columns: ["Token"],
                        rows: [["--jkl-color-brand-snohvit"]],
                    },
                    {
                        heading: "Semantiske",
                        caption: "Semantiske farger",
                        columns: ["Token"],
                        rows: [["--jkl-color-text-default"]],
                    },
                ]}
                scssSection={[
                    {
                        name: "light-mode-variables",
                        description: "Lyst tema",
                        example: "@include jkl.light-mode-variables {}",
                    },
                ]}
            />,
        );

        expect(html).toContain('data-page-header=""');
        expect(html).toContain('data-has-background="true"');
        expect(html).toContain('data-article-toc=""');
        expect(html).toContain('data-meta=""');
        expect(html).toContain('data-section="Tokens"');
        expect(html).toContain('data-section="SCSS-mixins"');
        expect(html).toContain("Primitive");
        expect(html).toContain("Semantiske");
        expect(countOccurrences(html, 'data-data-table=""')).toBe(2);
        expect(html).toContain('data-scss-mixins="1"');
    });

    it("omits optional sections when no token overview or mixins are provided", () => {
        const html = renderToStaticMarkup(
            <TokenArticle title="Spacing" excerpt="Avstander" illustration={null}/>,
        );

        expect(html).toContain('data-page-header=""');
        expect(html).toContain('data-has-background="false"');
        expect(html).toContain('data-article-toc=""');
        expect(html).not.toContain('data-section="Tokens"');
        expect(html).not.toContain('data-section="SCSS-mixins"');
    });
});
