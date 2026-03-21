import { beforeEach, describe, expect, it, vi } from "vitest";

const componentDataMocks = vi.hoisted(() => ({
    getComponentDoc: vi.fn(),
    getParentAndSiblings: vi.fn(),
}));

const tokenDataMocks = vi.hoisted(() => ({
    getTokenPost: vi.fn(),
}));

const patternDataMocks = vi.hoisted(() => ({
    getPatternPost: vi.fn(),
}));

vi.mock("@/features/ds/jokul/_component-docs/data", () => componentDataMocks);
vi.mock("@/features/ds/jokul/_token/data", () => tokenDataMocks);
vi.mock("@/data/monster/patterns", () => patternDataMocks);

import { resolveSiteBreadcrumbItems } from "./site-breadcrumb-items";

describe("resolveSiteBreadcrumbItems", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        componentDataMocks.getParentAndSiblings.mockReturnValue({ siblings: [] });
    });

    it("returns a single current item for the front page", () => {
        expect(resolveSiteBreadcrumbItems("/")).toEqual([
            { label: "Forside", current: true },
        ]);
    });

    it("resolves Jøkul component pages with their parent component when available", () => {
        componentDataMocks.getComponentDoc.mockReturnValue({ id: "checkbox-panel", name: "CheckboxPanel" });
        componentDataMocks.getParentAndSiblings.mockReturnValue({
            parent: { id: "checkbox", name: "Checkbox" },
            siblings: [],
            kind: "subcomponents",
        });

        expect(resolveSiteBreadcrumbItems("/ds/jokul/component/checkbox-panel")).toEqual([
            { href: "/", label: "Forside", current: false },
            { href: "/ds", label: "Designsystemer", current: false },
            { href: "/ds/jokul", label: "Jøkul", current: false },
            { href: "/ds/jokul/component", label: "Komponenter", current: false },
            {
                href: "/ds/jokul/component/checkbox",
                label: "Checkbox",
                current: false,
            },
            { label: "CheckboxPanel", current: true, href: undefined },
        ]);
    });

    it("uses token and pattern titles when known", () => {
        tokenDataMocks.getTokenPost.mockReturnValue({ title: "Spacing" });
        patternDataMocks.getPatternPost.mockReturnValue({ title: "Lastetilstander" });

        expect(resolveSiteBreadcrumbItems("/ds/jokul/token/spacing")).toEqual([
            { href: "/", label: "Forside", current: false },
            { href: "/ds", label: "Designsystemer", current: false },
            { href: "/ds/jokul", label: "Jøkul", current: false },
            { href: "/ds/jokul/token", label: "Designtokens", current: false },
            { label: "Spacing", current: true, href: undefined },
        ]);

        expect(resolveSiteBreadcrumbItems("/ds/monster/lastetilstander")).toEqual([
            { href: "/", label: "Forside", current: false },
            { href: "/ds", label: "Designsystemer", current: false },
            { href: "/ds/monster", label: "Mønster", current: false },
            { label: "Lastetilstander", current: true, href: undefined },
        ]);
    });

    it("falls back to humanized segments for unknown routes", () => {
        expect(resolveSiteBreadcrumbItems("/om-oss/lag-side")).toEqual([
            { href: "/", label: "Forside", current: false },
            { label: "Lag side", current: true, href: undefined },
        ]);
    });
});
