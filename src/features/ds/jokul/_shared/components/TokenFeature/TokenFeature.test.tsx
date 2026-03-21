import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";
import {TokenFeature} from "./TokenFeature";
import {ShadowIllustration} from "@/features/ds/jokul/_token/posts/shadows/ShadowIllustration";

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

    it("renders the token illustration inside the card background container", () => {
        const html = renderToStaticMarkup(
            <TokenFeature
                post={{
                    id: 21,
                    title: "Skygger",
                    excerpt: "Skygger i Jøkul",
                    illustration: <ShadowIllustration/>,
                } as any}
            />,
        );

        expect(html).toContain('class="background"');
        expect(html).toContain('data-token-illustration="skygger"');
        expect(html).toContain('data-shadow-surface="navigation"');
        expect(html).toContain('data-shadow-surface="task"');
        expect(html).toContain('data-shadow-surface="hover"');
    });
});
