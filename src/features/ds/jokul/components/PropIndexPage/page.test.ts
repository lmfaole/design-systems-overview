import { describe, expect, it } from "vitest";
import {
    filterPropItems,
    formatPropCount,
    normalizePropSort,
    sortPropItems,
    SOURCE_LABEL,
    type PropIndexItem,
} from "./page";

const items: PropIndexItem[] = [
    {
        propName: "children",
        source: "react",
        usedByCount: 6,
        search: "children button modal",
    },
    {
        propName: "aria-label",
        source: "aria",
        usedByCount: 3,
        search: "aria-label iconbutton tooltip",
    },
    {
        propName: "variant",
        source: "custom",
        usedByCount: 8,
        search: "variant button link card",
    },
];

describe("PropIndexPage page helpers", () => {
    it("normalizes supported sort values", () => {
        expect(normalizePropSort("name-desc")).toBe("name-desc");
        expect(normalizePropSort("used-by-desc")).toBe("used-by-desc");
        expect(normalizePropSort("unknown")).toBe("name-asc");
    });

    it("filters props by prop name or component usage", () => {
        expect(filterPropItems(items, "button").map((item) => item.propName)).toEqual([
            "children",
            "aria-label",
            "variant",
        ]);
        expect(filterPropItems(items, "tooltip").map((item) => item.propName)).toEqual(["aria-label"]);
    });

    it("sorts by the configured modes", () => {
        expect(sortPropItems(items, "name-asc").map((item) => item.propName)).toEqual([
            "aria-label",
            "children",
            "variant",
        ]);
        expect(sortPropItems(items, "name-desc").map((item) => item.propName)).toEqual([
            "variant",
            "children",
            "aria-label",
        ]);
        expect(sortPropItems(items, "source-asc").map((item) => SOURCE_LABEL[item.source])).toEqual([
            "ARIA",
            "Egendefinert",
            "React",
        ]);
        expect(sortPropItems(items, "used-by-desc").map((item) => item.propName)).toEqual([
            "variant",
            "children",
            "aria-label",
        ]);
    });

    it("formats the visible prop count", () => {
        expect(formatPropCount(1)).toBe("1 prop");
        expect(formatPropCount(4)).toBe("4 props");
    });
});
