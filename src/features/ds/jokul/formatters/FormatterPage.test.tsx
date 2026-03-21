import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FormatterPage } from "./FormatterPage";

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({ title, description }: any) => (
        <header data-page-header="">
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/Article", () => ({
    Article: ({ children, className }: any) => (
        <article data-article="" className={className}>
            {children}
        </article>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/NotFound", () => ({
    NotFound: ({ message, backHref, backLabel }: any) => (
        <main data-not-found="">
            <h1>{message}</h1>
            <a href={backHref}>{backLabel}</a>
        </main>
    ),
}));

describe("FormatterPage", () => {
    it("renders the not-found state when a formatter doc is missing", () => {
        const html = renderToStaticMarkup(<FormatterPage id="mangler" />);

        expect(html).toContain('data-not-found=""');
        expect(html).toContain("Fant ikke formatteren");
        expect(html).toContain('href="/ds/jokul/formatter"');
    });

    it("renders the formatter article for a known formatter", () => {
        const html = renderToStaticMarkup(<FormatterPage id="format-valuta" />);

        expect(html).toContain('data-article=""');
        expect(html).toContain('data-page-header=""');
        expect(html).toContain(">formatValuta<");
        expect(html).toContain("API");
        expect(html).toContain("Eksempler");
        expect(html).toContain("Valg");
        expect(html).toContain('import { formatValuta } from &quot;@fremtind/jokul/utilities&quot;;');
        expect(html).toContain("12\u00A0345\u00A0kr");
        expect(html).toContain("Relaterte funksjoner");
    });

    it("renders helper-specific sections for registerWithMasks", () => {
        const html = renderToStaticMarkup(<FormatterPage id="register-with-masks" />);

        expect(html).toContain(">registerWithMasks<");
        expect(html).toContain("Tilgjengelige hjelpere");
        expect(html).toContain("registerWithDateMask");
        expect(html).toContain("Relaterte exports");
        expect(html).toContain("registerWithFodselsnummerMask / registerWithKortnummerMask / registerWithKontonummerMask / registerWithTelefonnummerMask");
    });
});
