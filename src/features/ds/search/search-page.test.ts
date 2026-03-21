import { describe, expect, it } from "vitest";
import type { DsSearchResult } from "@/data/ds/search";
import { createSearchPageModel, getInitialSearchContent, getSearchQuery, renderSearchContent } from "./search-page";

function makeResult(id: string, kind: DsSearchResult["doc"]["kind"], title: string, excerpt = title): DsSearchResult {
    return {
        doc: {
            id,
            designSystemId: "jokul",
            designSystemName: "Jøkul",
            kind,
            title,
            description: `${title} beskrivelse`,
            keywords: [title.toLowerCase()],
            href: `/ds/${id}`,
            meta: `Jøkul · ${kind}`,
        },
        match: {
            field: "keyword",
            excerpt,
        },
    };
}

describe("search-page", () => {
    it("reads and trims the query from the search string", () => {
        expect(getSearchQuery("?q=%20button%20")).toBe("button");
        expect(getSearchQuery("")).toBe("");
    });

    it("renders the empty-search state when there is no query", () => {
        const model = createSearchPageModel("");
        const html = renderSearchContent(model);

        expect(html).toContain("Skriv inn et søk for å se resultater.");
    });

    it("renders the no-results state with formatter shortcuts", () => {
        const model = createSearchPageModel("formatter", () => []);
        const html = renderSearchContent(model);

        expect(html).toContain("Ingen treff for “formatter”");
        expect(html).toContain('href="/ds/jokul/formatter"');
    });

    it("renders grouped results and escapes excerpts", () => {
        const model = createSearchPageModel("button", () => [
            makeResult("component-button", "component", "Button"),
            makeResult("pattern-empty-state", "pattern", "Tomtilstander", "<button>"),
            makeResult("formatter-format-valuta", "formatter", "formatValuta"),
            makeResult("token-spacing", "token", "Spacing"),
            makeResult("page-jokul", "page", "Jøkul"),
        ]);
        const html = renderSearchContent(model);

        expect(html).toContain("5 treff totalt.");
        expect(html).toContain("Beste treff (3)");
        expect(html).toContain("Mønstre (1)");
        expect(html).toContain("Komponenter (1)");
        expect(html).toContain("Formattere (1)");
        expect(html).toContain("Tokens (1)");
        expect(html).toContain("Sider (1)");
        expect(html).toContain("&lt;button&gt;");
    });

    it("renders a loading placeholder when the current URL already has a query", () => {
        expect(getInitialSearchContent(true)).toContain("Laster søkeresultater…");
        expect(getInitialSearchContent(false)).toContain("Skriv inn et søk for å se resultater.");
    });
});
