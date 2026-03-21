import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";
import {componentDocs} from "@/features/ds/jokul/_component-docs/data";
import {tokenPosts} from "@/features/ds/jokul/_token/data";
import JokulHomePage from "./JokulHomePage";

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({as: Tag = "div", children, direction, gap, ...props}: any) => (
        <Tag data-flex="" data-direction={direction} data-gap={gap} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/link", () => ({
    Link: ({href, children}: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({title, description}: any) => (
        <header data-page-header="">
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/Grid", () => ({
    Grid: ({children, columns, gap}: any) => (
        <div data-grid="" data-columns={columns} data-gap={gap}>
            {children}
        </div>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/ComponentCard", () => ({
    ComponentCard: ({doc}: any) => <article data-component-card={doc.id}>{doc.name}</article>,
}));

vi.mock("@/features/ds/jokul/_shared/components/TokenFeature", () => ({
    TokenFeature: ({post}: any) => <article data-token-feature={post.id}>{post.title}</article>,
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

describe("JokulHomePage", () => {
    it("renders the Jøkul home sections with overview component and token links", () => {
        const html = renderToStaticMarkup(<JokulHomePage/>);
        const visibleComponents = componentDocs.filter((doc) => doc.showOnOverview !== false);

        expect(html).toContain("Bygg bedre");
        expect(html).toContain('href="/ds/jokul/component"');
        expect(html).toContain('href="/ds/jokul/token"');
        expect(html).toContain(`Se alle ${visibleComponents.length} komponenter`);
        expect(countOccurrences(html, 'data-component-card="')).toBe(Math.min(8, visibleComponents.length));
        expect(countOccurrences(html, 'data-token-feature="')).toBe(tokenPosts.length);
    });
});
