import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { overviewInlineStyles } from "@/features/ds/jokul/overview/overview-inline-styles";
import TokenIndexPage from "./TokenIndexPage";
import { tokenOverviewEntries } from "./token-overview-data";

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({ title, description }: any) => (
        <header data-page-header="">
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    ),
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

function getIllustrationMarker(html: string) {
    const marker = html.match(/<div class="token-illustration" data-surface="card" data-token-illustration-bleed="true" data-token-card-illustration="[^"]+">/)?.[0];

    if (marker) {
        return marker;
    }

    return html.match(/data-token-illustration="[^"]+"/)?.[0];
}

function getSpecimenMarker(html: string) {
    return html.match(/<(?:span|strong) class="token-specimen"[^>]*data-token-card-specimen="[^"]+"[^>]*>/)?.[0];
}

describe("TokenIndexPage", () => {
    it("renders one illustrated token card per token post", () => {
        const html = renderToStaticMarkup(<TokenIndexPage />);

        expect(html).toContain("Designtokens");
        expect(html).toContain("Fundamentene i Jøkul");
        expect(html).toContain('class="ds-grid" data-columns="3"');
        expect(countOccurrences(html, 'data-overview-card="token"')).toBe(tokenOverviewEntries.length);
        expect(countOccurrences(html, 'class="overview-card" data-kind="token" data-layout="illustrated"')).toBe(tokenOverviewEntries.length);
        expect(countOccurrences(html, 'data-token-card-specimen="')).toBe(tokenOverviewEntries.length);
        expect(countOccurrences(html, 'data-static-illustration="true"')).toBe(0);

        for (const entry of tokenOverviewEntries) {
            expect(html).toContain(`href="${entry.href}"`);
            expect(html).toContain(`>${entry.title}<`);

            const illustrationMarkup = renderToStaticMarkup(entry.illustration);
            const illustrationMarker = getIllustrationMarker(illustrationMarkup);
            const specimenMarker = getSpecimenMarker(illustrationMarkup);

            expect(illustrationMarker).toBeDefined();
            expect(specimenMarker).toBeDefined();
            expect(countOccurrences(html, illustrationMarker as string)).toBe(1);
            expect(countOccurrences(html, specimenMarker as string)).toBe(1);
        }
    });

    it("keeps token illustrations above the card overlay mask", () => {
        expect(overviewInlineStyles).toContain(".overview-card-illustration {");
        expect(overviewInlineStyles).toContain("isolation: isolate;");
        expect(overviewInlineStyles).toContain(".overview-card-illustration::after {");
        expect(overviewInlineStyles).toContain("z-index: 0;");
        expect(overviewInlineStyles).toContain(".overview-card-illustration > * {");
        expect(overviewInlineStyles).toContain("position: relative;");
        expect(overviewInlineStyles).toContain("z-index: 1;");
    });
});
