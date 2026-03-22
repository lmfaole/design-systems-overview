import { describe, expect, it } from "vitest";
import { renderPatternCodeTabs } from "./PatternCodeTabs";

describe("renderPatternCodeTabs", () => {
    it("renders a tablist with copy button and marks only the first panel as visible", () => {
        const html = renderPatternCodeTabs({
            label: "Kodefaner",
            snippets: [
                { label: "HTML", language: "html", code: "<div></div>" },
                { label: "CSS", language: "css", code: ".example {}" },
            ],
        });

        expect(html).toContain('role="tablist"');
        expect(html).toContain('aria-label="Kodefaner"');
        expect(html.match(/role="tab"/g)).toHaveLength(2);
        expect(html).toContain('aria-selected="true"');
        expect(html).toContain('aria-selected="false"');
        expect(html.match(/role="tabpanel"/g)).toHaveLength(2);
        expect(html).toContain(" hidden>");
        expect(html).toContain("Kopier kode");
    });

    it("falls back to language labels and generated example labels when labels are missing", () => {
        const html = renderPatternCodeTabs({
            snippets: [
                { language: "js", code: "console.log('hei');" },
                { code: "<section></section>" },
            ],
        });

        expect(html).toContain(">js<");
        expect(html).toContain(">Eksempel 2<");
    });
});
