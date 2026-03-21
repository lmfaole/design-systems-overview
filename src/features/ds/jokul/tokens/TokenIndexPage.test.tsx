import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
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

vi.mock("@/features/ds/jokul/_shared/components/Grid", () => ({
    Grid: ({ children, columns, gap }: any) => (
        <div data-grid="" data-columns={columns} data-gap={gap}>
            {children}
        </div>
    ),
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

function getIllustrationMarker(html: string) {
    const marker = html.match(/data-token-card-illustration="[^"]+"/)?.[0];

    if (marker) {
        return marker;
    }

    return html.match(/data-token-illustration="[^"]+"/)?.[0];
}

describe("TokenIndexPage", () => {
    it("renders one illustrated token card per token post", () => {
        const html = renderToStaticMarkup(<TokenIndexPage />);

        expect(html).toContain("Designtokens");
        expect(html).toContain("Fundamentene i Jøkul");
        expect(countOccurrences(html, 'data-overview-card="token"')).toBe(tokenOverviewEntries.length);
        expect(countOccurrences(html, 'class="overview-card" data-kind="token" data-layout="illustrated"')).toBe(tokenOverviewEntries.length);
        expect(countOccurrences(html, 'data-static-illustration="true"')).toBe(tokenOverviewEntries.length);

        for (const entry of tokenOverviewEntries) {
            expect(html).toContain(`href="${entry.href}"`);
            expect(html).toContain(`>${entry.title}<`);

            const illustrationMarkup = renderToStaticMarkup(entry.illustration);
            const illustrationMarker = getIllustrationMarker(illustrationMarkup);

            expect(illustrationMarker).toBeDefined();
            expect(countOccurrences(html, illustrationMarker as string)).toBe(1);
        }
    });
});
