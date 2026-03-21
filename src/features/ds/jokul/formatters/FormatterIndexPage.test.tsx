import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import FormatterIndexPage from "./FormatterIndexPage";
import { formatterOverviewGroups } from "./formatter-overview-data";

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

describe("FormatterIndexPage", () => {
    it("renders formatter groups and cards for every formatter doc", () => {
        const html = renderToStaticMarkup(<FormatterIndexPage />);
        const docCount = formatterOverviewGroups.reduce((sum, group) => sum + group.docs.length, 0);

        expect(html).toContain("Formattere");
        expect(html).toContain("Jøkul har små, praktiske utilities");
        expect(countOccurrences(html, 'class="overview-card" data-kind="formatter"')).toBe(docCount);
        expect(countOccurrences(html, 'class="ds-grid" data-columns="3"')).toBe(formatterOverviewGroups.length);

        for (const group of formatterOverviewGroups) {
            expect(html).toContain(`formatter-group-${group.id}`);
            expect(html).toContain(`>${group.label}<`);
            expect(html).toContain(group.description);

            for (const doc of group.docs) {
                expect(html).toContain(`href="/ds/jokul/formatter/${doc.id}"`);
                expect(html).toContain(`>${doc.name}<`);
                expect(html).toContain(doc.description.short);
            }
        }
    });
});
