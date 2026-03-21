import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getTokenSlug, tokenPosts } from "@/features/ds/jokul/_token/data";
import { tokenOverviewEntries, visibleTokenCount } from "./token-overview-data";

function countOccurrences(html: string, matcher: string) {
    return (html.match(new RegExp(matcher, "g")) || []).length;
}

describe("token overview data", () => {
    it("keeps the visible token count in sync with the token docs registry", () => {
        expect(visibleTokenCount).toBe(tokenPosts.length);
    });

    it("keeps the lightweight token overview entries aligned with the token docs", () => {
        expect(tokenOverviewEntries).toHaveLength(tokenPosts.length);

        for (const [index, entry] of tokenOverviewEntries.entries()) {
            const post = tokenPosts[index];
            const illustrationMarkup = renderToStaticMarkup(entry.illustration);
            const marker = illustrationMarkup.match(/data-token-card-illustration="[^"]+"/)?.[0];

            expect(entry).toMatchObject({
                id: post.id,
                title: post.title,
                href: `/ds/jokul/token/${getTokenSlug(post)}`,
            });
            expect(marker).toBeDefined();
            expect(illustrationMarkup).toContain('data-token-illustration-bleed="true"');
            expect(countOccurrences(illustrationMarkup, 'data-token-card-specimen="')).toBe(1);
            expect(illustrationMarkup).toContain(
                `data-token-card-specimen="${getTokenSlug(post)}"`,
            );
        }
    });
});
