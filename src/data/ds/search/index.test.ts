import { describe, expect, it } from "vitest";
import { searchDsDocuments } from "./index";

describe("design system search data", () => {
    it("returns real component matches for button queries", () => {
        const results = searchDsDocuments("button");

        expect(results.length).toBeGreaterThan(0);
        expect(results.some((result) => result.doc.href === "/ds/jokul/component/button")).toBe(true);
    });

    it("returns formatter matches for format queries", () => {
        const results = searchDsDocuments("format");

        expect(results.some((result) => result.doc.kind === "formatter")).toBe(true);
        expect(results.some((result) => result.doc.href === "/ds/jokul/formatter/format-valuta")).toBe(true);
    });

    it("returns pattern matches without importing the full pattern post graph at runtime", () => {
        const results = searchDsDocuments("button");

        expect(results.some((result) => result.doc.href === "/ds/monster/tomtilstander")).toBe(true);
        expect(results.some((result) => result.doc.href === "/ds/monster/bekreftelse-etter-handling")).toBe(true);
    });
});
