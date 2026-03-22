import { beforeEach, describe, expect, it, vi } from "vitest";

const patternDataMocks = vi.hoisted(() => ({
    getPatternPost: vi.fn(),
}));

vi.mock("@/data/mønster/patterns", () => patternDataMocks);

import { resolveSiteBreadcrumbItems } from "./site-breadcrumb-items";

describe("resolveSiteBreadcrumbItems", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns a single current item for the front page", () => {
        expect(resolveSiteBreadcrumbItems("/")).toEqual([
            { label: "Forside", current: true },
        ]);
    });

    it("uses pattern titles when known", () => {
        patternDataMocks.getPatternPost.mockReturnValue({ title: "Bruk skjelettvisning når strukturen er kjent" });

        expect(resolveSiteBreadcrumbItems("/ds/mønster/skjelettvisning")).toEqual([
            { href: "/", label: "Forside", current: false },
            { href: "/ds", label: "Designsystemer", current: false },
            { href: "/ds/mønster", label: "Mønster", current: false },
            { label: "Bruk skjelettvisning når strukturen er kjent", current: true, href: undefined },
        ]);
    });

    it("falls back to humanized segments for unknown routes", () => {
        expect(resolveSiteBreadcrumbItems("/om-oss/lag-side")).toEqual([
            { href: "/", label: "Forside", current: false },
            { label: "Lag side", current: true, href: undefined },
        ]);
    });

    it("falls back to the section label for unknown design-system routes", () => {
        expect(resolveSiteBreadcrumbItems("/ds/annet")).toEqual([
            { href: "/", label: "Forside", current: false },
            { href: "/ds", label: "Designsystemer", current: false },
            { label: "Annet", current: true, href: undefined },
        ]);
    });
});
