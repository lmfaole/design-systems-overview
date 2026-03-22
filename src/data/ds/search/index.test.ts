import { describe, expect, it } from "vitest";
import { searchDsDocuments } from "./index";

describe("design system search data", () => {
    it("returns real pattern matches for pattern queries", () => {
        const results = searchDsDocuments("lastetilstand");

        expect(results.length).toBeGreaterThan(0);
        expect(results.some((result) => result.doc.href === "/ds/mønster/status-i-oppdatert-region")).toBe(true);
    });

    it("returns pattern matches without importing the full pattern post graph at runtime", () => {
        const results = searchDsDocuments("bekreftelse");

        expect(results.some((result) => result.doc.href === "/ds/mønster/bekreftelse-etter-handling")).toBe(true);
    });
});
