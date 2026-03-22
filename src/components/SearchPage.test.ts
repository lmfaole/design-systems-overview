import { describe, expect, it } from "vitest";
import type { DsSearchResult } from "@/data/ds/search";
import { createSearchPageModel, getInitialSearchContent, getSearchQuery, renderSearchContent } from "./SearchPage";

function makeResult(id: string, kind: DsSearchResult["doc"]["kind"], title: string, excerpt = title): DsSearchResult {
    return {
        doc: {
            id,
            designSystemId: kind === "pattern" ? "patterns" : "ds",
            designSystemName: kind === "pattern" ? "Mønstre" : "Designsystemer",
            kind,
            title,
            description: `${title} beskrivelse`,
            keywords: [title.toLowerCase()],
            href: `/ds/${id}`,
            meta: `${kind === "pattern" ? "Mønster" : "Side"} · ${kind}`,
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

    it("renders the no-results state with local shortcuts", () => {
        const model = createSearchPageModel("ukjent", () => []);
        const html = renderSearchContent(model);

        expect(html).toContain("Ingen treff for “ukjent”");
        expect(html).toContain('href="/ds/mønster"');
    });

    it("renders grouped results and escapes excerpts", () => {
        const model = createSearchPageModel("button", () => [
            makeResult("pattern-empty-state", "pattern", "Tomtilstander", "<button>"),
            makeResult("page-patterns", "page", "UI-mønstre"),
            makeResult("page-ds", "page", "Designsystemer"),
        ]);
        const html = renderSearchContent(model);

        expect(html).toContain("3 treff totalt.");
        expect(html).toContain("Beste treff (3)");
        expect(html).toContain("Mønstre (1)");
        expect(html).toContain("Sider (2)");
        expect(html).toContain("&lt;button&gt;");
        expect(html).not.toContain('style="');
    });

    it("renders a loading placeholder when the current URL already has a query", () => {
        expect(getInitialSearchContent(true)).toContain("Laster søkeresultater…");
        expect(getInitialSearchContent(false)).toContain("Skriv inn et søk for å se resultater.");
    });
});
