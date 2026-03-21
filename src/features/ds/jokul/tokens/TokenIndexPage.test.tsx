import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";
import {tokenPosts} from "@/features/ds/jokul/_token/data";
import TokenIndexPage from "./TokenIndexPage";

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({as: Tag = "div", children, direction, gap, ...props}: any) => (
        <Tag data-flex="" data-direction={direction} data-gap={gap} {...props}>
            {children}
        </Tag>
    ),
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

vi.mock("@/features/ds/jokul/_shared/components/TokenFeature", () => ({
    TokenFeature: ({post}: any) => <article data-token-feature={post.id}>{post.title}</article>,
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

describe("TokenIndexPage", () => {
    it("renders the token overview with one card per token post", () => {
        const html = renderToStaticMarkup(<TokenIndexPage/>);

        expect(html).toContain("Designtokens");
        expect(html).toContain("Fundamentene i Jøkul");
        expect(countOccurrences(html, 'data-token-feature="')).toBe(tokenPosts.length);
    });
});
