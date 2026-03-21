import { describe, expect, it } from "vitest";
import {
    filterComponentItems,
    formatComponentCount,
    normalizeComponentFilters,
    normalizeComponentSort,
    normalizeComponentStatus,
    normalizeShowAllComponents,
    sortComponentItems,
    type ComponentIndexItem,
} from "./page";

const items: ComponentIndexItem[] = [
    {
        id: "button",
        name: "Button",
        search: "button handlinger @fremtind/jokul/button",
        category: "Handlinger",
        status: "stable",
        propsCount: 4,
        showOnOverview: true,
    },
    {
        id: "link",
        name: "Link",
        search: "link navigasjon @fremtind/jokul/link",
        category: "Navigasjon",
        status: "beta",
        propsCount: 2,
        showOnOverview: false,
    },
    {
        id: "datepicker",
        name: "DatePicker",
        search: "datepicker skjema @fremtind/jokul/datepicker",
        category: "Skjema",
        status: "deprecated",
        propsCount: 7,
        showOnOverview: true,
    },
];

describe("ComponentIndexPage page helpers", () => {
    it("normalizes DOM values into stable filter and sort state", () => {
        expect(normalizeComponentSort("most-props")).toBe("most-props");
        expect(normalizeComponentSort("unknown")).toBe("az");
        expect(normalizeComponentStatus("beta")).toBe("beta");
        expect(normalizeComponentStatus("unknown")).toBeNull();
        expect(normalizeShowAllComponents("1")).toBe(true);
        expect(normalizeShowAllComponents("unknown")).toBe(false);
        expect(normalizeComponentFilters({ query: " Button ", category: "", status: "stable", all: "1" })).toEqual({
            query: "button",
            category: null,
            status: "stable",
            showAll: true,
        });
    });

    it("filters by query, category, status, and overview visibility", () => {
        expect(filterComponentItems(items, { query: "button", category: null, status: null, showAll: false })).toEqual([
            items[0],
        ]);
        expect(filterComponentItems(items, { query: "", category: "Navigasjon", status: null, showAll: false })).toEqual(
            [],
        );
        expect(filterComponentItems(items, { query: "", category: "Navigasjon", status: null, showAll: true })).toEqual([
            items[1],
        ]);
        expect(filterComponentItems(items, { query: "", category: null, status: "deprecated", showAll: false })).toEqual(
            [items[2]],
        );
    });

    it("sorts by name and prop count", () => {
        expect(sortComponentItems(items, "az").map((item) => item.name)).toEqual([
            "Button",
            "DatePicker",
            "Link",
        ]);
        expect(sortComponentItems(items, "za").map((item) => item.name)).toEqual([
            "Link",
            "DatePicker",
            "Button",
        ]);
        expect(sortComponentItems(items, "most-props").map((item) => item.name)).toEqual([
            "DatePicker",
            "Button",
            "Link",
        ]);
    });

    it("formats the visible result count", () => {
        expect(formatComponentCount(1)).toBe("1 komponent");
        expect(formatComponentCount(3)).toBe("3 komponenter");
    });
});
