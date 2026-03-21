import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { visibleFormatterCount } from "@/features/ds/jokul/formatters/formatter-overview-data";
import { visibleTokenCount } from "@/features/ds/jokul/tokens/token-overview-data";
import { visibleComponentCount } from "./component-overview-data";
import JokulHomePage from "./JokulHomePage";

function countMatches(html: string, matcher: RegExp) {
    return (html.match(matcher) || []).length;
}

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

describe("JokulHomePage", () => {
    it("renders the Jøkul home page as three navigation cards", () => {
        const html = renderToStaticMarkup(<JokulHomePage />);

        expect(html).toContain('href="/ds/jokul/component"');
        expect(html).toContain('href="/ds/jokul/token"');
        expect(html).toContain('href="/ds/jokul/formatter"');
        expect(html).toContain(`${visibleComponentCount} komponenter`);
        expect(html).toContain(">Komponenter<");
        expect(html).toContain(`${visibleTokenCount} tokenområder`);
        expect(html).toContain(">Designtokens<");
        expect(html).toContain(`${visibleFormatterCount} formattere`);
        expect(html).toContain(">Formattere<");
        expect(countOccurrences(html, 'data-overview-card="component"')).toBe(1);
        expect(countOccurrences(html, 'data-overview-card="token"')).toBe(1);
        expect(countOccurrences(html, 'data-overview-card="formatter"')).toBe(1);
        expect(countOccurrences(html, 'class="overview-card" data-kind=')).toBe(3);
        expect(countMatches(html, /data-kind="component" data-layout="feature" data-overview-card="component"/g)).toBe(1);
        expect(countMatches(html, /data-kind="token" data-layout="feature" data-overview-card="token"/g)).toBe(1);
        expect(countMatches(html, /data-kind="formatter" data-layout="feature" data-overview-card="formatter"/g)).toBe(1);
    });
});
