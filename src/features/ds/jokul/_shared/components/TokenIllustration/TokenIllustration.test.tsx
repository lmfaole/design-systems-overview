import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
    TokenCardIllustration,
    TokenPageIllustration,
    tokenIllustrationVariants,
    type TokenIllustrationSlug,
} from "./TokenIllustration";

const tokenIllustrationStyles = readFileSync(
    path.resolve(
        process.cwd(),
        "src/features/ds/jokul/_shared/components/TokenIllustration/token-illustration.scss",
    ),
    "utf8",
);

const staticSpecimenExpectations: Record<TokenIllustrationSlug, string[]> = {
    animasjon: [
        "inline-size: 112%;",
        "block-size: 112%;",
        "transform: translate(20%, 22%) rotate(-14deg) scale(0.96);",
    ],
    breakpoints: [
        "inline-size: 118%;",
        "block-size: 1rem;",
        "background-color: var(--jkl-color-text-default);",
        "transform: translate(14%, 8%);",
    ],
    farger: [
        "inline-size: 124%;",
        "block-size: 124%;",
        "background-color: var(--jkl-color-brand-snohvit);",
        "transform: translate(18%, 20%);",
    ],
    kantradiuser: [
        "inline-size: 132%;",
        "block-size: 104%;",
        "border-radius: var(--jkl-border-radius-full);",
        "transform: translate(20%, 18%);",
    ],
    skygger: [
        "inline-size: 126%;",
        "block-size: 84%;",
        "box-shadow: 0 0.75rem 2rem rgb(37 42 49 / 14%);",
        "transform: translate(18%, 18%);",
    ],
    spacing: [
        "inline-size: calc(var(--jkl-spacing-2xl) * 2.25);",
        "block-size: calc(var(--jkl-spacing-2xl) * 2.25);",
        "transform: translate(24%, 24%);",
    ],
    typografi: [
        "font-size: clamp(4rem, 10vw, 6.5rem);",
        "line-height: var(--jkl-line-height-tight);",
        "transform: translate(8%, 10%);",
    ],
};

function countOccurrences(source: string, matcher: RegExp) {
    return (source.match(matcher) || []).length;
}

function getVariantBlock(slug: TokenIllustrationSlug) {
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = tokenIllustrationStyles.match(
        new RegExp(`&\\[data-token-group="${escapedSlug}"\\] \\{([\\s\\S]*?)\\n  \\}`),
    );

    return match?.[1] ?? "";
}

function getWrapperStyles() {
    const match = tokenIllustrationStyles.match(
        /\.token-illustration \{([\s\S]*?)\n\}\n\n\.token-specimen \{/,
    );

    return match?.[1] ?? "";
}

describe("TokenIllustration", () => {
    it("renders one overflowing specimen element for every token card illustration", () => {
        for (const [slug, variant] of Object.entries(tokenIllustrationVariants) as Array<
            [TokenIllustrationSlug, (typeof tokenIllustrationVariants)[TokenIllustrationSlug]]
        >) {
            const html = renderToStaticMarkup(<TokenCardIllustration slug={slug} />);
            const specimenTag = variant.specimenTag === "strong" ? "strong" : "span";

            expect(countOccurrences(html, /<(?:div|span|strong)\b/g)).toBe(2);
            expect(countOccurrences(html, /class="token-specimen"/g)).toBe(1);
            expect(html).toContain(`data-token-card-illustration="${slug}"`);
            expect(html).toContain('data-token-illustration-bleed="true"');
            expect(html).toContain(`data-token-card-specimen="${slug}"`);
            expect(html).toContain(`data-token-group="${slug}"`);
            expect(html).toContain('data-token-overflow="large"');
            expect(html).toContain(`<${specimenTag} class="token-specimen"`);
            expect(html).not.toContain("data-token-animation=");

            if (slug === "typografi") {
                expect(html).toContain(">Ag</strong>");
            }
        }
    });

    it("renders one overflowing specimen element for every token page illustration", () => {
        for (const [slug, variant] of Object.entries(tokenIllustrationVariants) as Array<
            [TokenIllustrationSlug, (typeof tokenIllustrationVariants)[TokenIllustrationSlug]]
        >) {
            const html = renderToStaticMarkup(<TokenPageIllustration slug={slug} />);
            const specimenTag = variant.specimenTag === "strong" ? "strong" : "span";

            expect(countOccurrences(html, /<(?:div|span|strong)\b/g)).toBe(2);
            expect(countOccurrences(html, /class="token-specimen"/g)).toBe(1);
            expect(html).toContain(`data-token-illustration="${slug}"`);
            expect(html).toContain('data-token-illustration-bleed="true"');
            expect(html).toContain(`data-token-specimen="${slug}"`);
            expect(html).toContain(`data-token-group="${slug}"`);
            expect(html).toContain('data-token-overflow="large"');
            expect(html).toContain(`<${specimenTag} class="token-specimen"`);
            expect(html).not.toContain("data-token-animation=");
        }
    });

    it("keeps the wrapper structural and the specimen static, large, and anchored to the bottom right", () => {
        const wrapperStyles = getWrapperStyles();

        expect(tokenIllustrationStyles).toContain("overflow: visible;");
        expect(wrapperStyles).toContain("box-sizing: border-box;");
        expect(wrapperStyles).not.toContain("&::before");
        expect(wrapperStyles).not.toContain("background:");
        expect(tokenIllustrationStyles).toContain("inset-inline-end: 0;");
        expect(tokenIllustrationStyles).toContain("inset-block-end: 0;");
        expect(tokenIllustrationStyles).toContain("transform-origin: bottom right;");
        expect(tokenIllustrationStyles).not.toContain("animation:");
        expect(tokenIllustrationStyles).not.toContain("animation-name:");
        expect(tokenIllustrationStyles).not.toContain("animation-duration:");
        expect(tokenIllustrationStyles).not.toContain("@keyframes");

        for (const [slug, variant] of Object.entries(tokenIllustrationVariants) as Array<
            [TokenIllustrationSlug, (typeof tokenIllustrationVariants)[TokenIllustrationSlug]]
        >) {
            const variantBlock = getVariantBlock(slug);

            for (const expectation of staticSpecimenExpectations[slug]) {
                expect(variantBlock).toContain(expectation);
            }

            for (const property of variant.showcaseProperties) {
                expect(variantBlock).toContain(property);
            }
        }
    });
});
