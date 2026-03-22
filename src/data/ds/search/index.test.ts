import { describe, expect, it } from "vitest";
import { searchDsDocuments } from "./index";

describe("design system search data", () => {
    it("keeps the pattern overview searchable without detail documents", () => {
        const results = searchDsDocuments("mønster");

        expect(results.some((result) => result.doc.href === "/ds/mønster")).toBe(true);
        expect(results.some((result) => result.doc.kind === "pattern")).toBe(false);
        expect(results.some((result) => result.doc.href.startsWith("/ds/mønster/"))).toBe(false);
    });

    it("finds the documented Jøkul component and token pages", () => {
        const componentResults = searchDsDocuments("button");
        const skeletonResults = searchDsDocuments("skeleton");
        const tableResults = searchDsDocuments("table");
        const tokenResults = searchDsDocuments("spacing");

        expect(componentResults.some((result) => result.doc.href === "/ds/jokul/komponenter/button")).toBe(true);
        expect(skeletonResults.some((result) => result.doc.href === "/ds/jokul/komponenter/skeleton-loader")).toBe(
            true,
        );
        expect(tableResults.some((result) => result.doc.href === "/ds/jokul/komponenter/table")).toBe(true);
        expect(tokenResults.some((result) => result.doc.href === "/ds/jokul/tokens/spacing")).toBe(true);
    });
});
