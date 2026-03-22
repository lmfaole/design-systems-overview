import { describe, expect, it } from "vitest";
import { patternRestartPlan } from "./plan";
import {
    getPatternBacklinksForComponentHref,
    getPatternPost,
    patternPosts,
} from "./patterns";

describe("mønster reset", () => {
    it("starts from an empty pattern registry", () => {
        expect(patternPosts).toEqual([]);
        expect(getPatternPost("skjelettvisning")).toBeUndefined();
        expect(getPatternBacklinksForComponentHref("/ds/jokul/komponenter/table")).toEqual([]);
    });

    it("documents how mønstre should connect to the rest of the site", () => {
        const links = patternRestartPlan.sections.flatMap((section) =>
            section.subsections?.flatMap((subsection) => subsection.links?.map((link) => link.href) ?? []) ?? []
        );

        expect(links).toEqual(expect.arrayContaining([
            "/ds/jokul/komponenter/skeleton-loader",
            "/ds/jokul/komponenter/table",
            "/ds/jokul/tokens/spacing",
            "/ds/søk",
            "/sitemap",
        ]));
    });
});
