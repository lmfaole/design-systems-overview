import {renderToStaticMarkup} from "react-dom/server";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {TokenPostPageClient} from "./TokenPostPageClient";

const dataMocks = vi.hoisted(() => ({
    getTokenPost: vi.fn(),
}));

vi.mock("@/features/ds/jokul/_token/data", () => dataMocks);

vi.mock("@/features/ds/jokul/_token/components/TokenArticle", () => ({
    TokenArticle: ({title, excerpt, illustration, tokenOverview, scssSection}: any) => (
        <article
            data-token-article=""
            data-title={title}
            data-excerpt={excerpt}
            data-has-illustration={String(Boolean(illustration))}
            data-token-tables={tokenOverview?.length ?? 0}
            data-scss-section={scssSection?.length ?? 0}
        >
            {illustration}
        </article>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/NotFound", () => ({
    NotFound: ({message, backHref, backLabel}: any) => (
        <main data-not-found="">
            <h1>{message}</h1>
            <a href={backHref}>{backLabel}</a>
        </main>
    ),
}));

describe("TokenPostPageClient", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the not-found state when the token post is missing", () => {
        dataMocks.getTokenPost.mockReturnValue(undefined);

        const html = renderToStaticMarkup(<TokenPostPageClient slug="mangler"/>);

        expect(html).toContain('data-not-found=""');
        expect(html).toContain("Fant ikke innlegget");
        expect(html).toContain('href="/ds/jokul/token"');
    });

    it("renders the token article for a matching token post", () => {
        dataMocks.getTokenPost.mockReturnValue({
            title: "Farger",
            excerpt: "Jøkul-farger",
            illustration: <svg data-illustration="true"/>,
            tokenOverview: [
                {
                    caption: "Primitive",
                    exampleColumnIndex: 0,
                    columns: ["Forhåndsvisning", "Token"],
                    rows: [[<span data-token-table-example="color"/>, "--jkl-color-brand-snohvit"]],
                },
            ],
            scssSection: [{name: "light-mode-variables"}],
        });

        const html = renderToStaticMarkup(<TokenPostPageClient slug="farger"/>);

        expect(html).toContain('data-token-article=""');
        expect(html).toContain('data-title="Farger"');
        expect(html).toContain('data-has-illustration="true"');
        expect(html).toContain('data-token-tables="1"');
        expect(html).toContain('data-scss-section="1"');
    });

    it("passes the bespoke illustration through to the token article", () => {
        dataMocks.getTokenPost.mockReturnValue({
            title: "Skygger",
            excerpt: "Skygger i Jøkul",
            illustration: <div data-token-illustration="skygger"><div data-shadow-surface="task"/></div>,
        });

        const html = renderToStaticMarkup(<TokenPostPageClient slug="skygger"/>);

        expect(html).toContain('data-token-article=""');
        expect(html).toContain('data-token-illustration="skygger"');
        expect(html).toContain('data-shadow-surface="task"');
    });
});
