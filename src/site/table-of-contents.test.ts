import { describe, expect, it } from "vitest";
import {
    buildTableOfContentsTree,
    createUniqueHeadingId,
    normalizeHeadingText,
    slugifyHeading,
} from "./table-of-contents";

describe("table-of-contents helpers", () => {
    it("normalizes and slugifies heading text", () => {
        expect(normalizeHeadingText("  Flere\n   nivåer  ")).toBe("Flere nivåer");
        expect(slugifyHeading("Søk i /ds")).toBe("søk-i-ds");
    });

    it("creates unique ids for repeated headings", () => {
        const usedIds = new Set<string>();

        expect(createUniqueHeadingId("Komponenter", usedIds)).toBe("komponenter");
        expect(createUniqueHeadingId("Komponenter", usedIds)).toBe("komponenter-2");
        expect(createUniqueHeadingId("Komponenter", usedIds)).toBe("komponenter-3");
    });

    it("builds a nested outline for all heading levels", () => {
        const tree = buildTableOfContentsTree([
            { id: "page", text: "Page", level: 1 },
            { id: "section", text: "Section", level: 2 },
            { id: "subsection", text: "Subsection", level: 3 },
            { id: "deep", text: "Deep", level: 4 },
            { id: "sibling", text: "Sibling", level: 2 },
        ]);

        expect(tree).toHaveLength(1);
        expect(tree[0]?.children).toHaveLength(2);
        expect(tree[0]?.children[0]?.children[0]?.id).toBe("subsection");
        expect(tree[0]?.children[0]?.children[0]?.children[0]?.id).toBe("deep");
        expect(tree[0]?.children[1]?.id).toBe("sibling");
    });
});
