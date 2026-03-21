import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";
import {TokenFeature} from "./TokenFeature";

vi.mock("@fremtind/jokul/card", () => ({
    Card: ({as: Tag = "div", children, clickable, href, ...props}: any) => (
        <Tag data-card="" data-clickable={String(Boolean(clickable))} href={href} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({as: Tag = "div", children, alignItems, justifyContent, ...props}: any) => (
        <Tag data-flex="" data-align-items={alignItems} data-justify-content={justifyContent} {...props}>
            {children}
        </Tag>
    ),
}));

describe("TokenFeature", () => {
    it("renders a token card link with illustration and title", () => {
        const html = renderToStaticMarkup(
            <TokenFeature
                post={{
                    id: 11,
                    title: "Farger",
                    excerpt: "Farger i Jøkul",
                    illustration: <svg data-illustration="true"/>,
                } as any}
            />,
        );

        expect(html).toContain('href="/ds/jokul/token/farger"');
        expect(html).toContain('aria-label="Farger"');
        expect(html).toContain('data-illustration="true"');
        expect(html).toContain(">Farger<");
    });
});
