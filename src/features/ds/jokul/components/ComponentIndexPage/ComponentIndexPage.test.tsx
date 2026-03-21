import {renderToStaticMarkup} from "react-dom/server";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {componentDocs} from "@/features/ds/jokul/_component-docs/data";
import ComponentIndexPage from "./render";

const hookMocks = vi.hoisted(() => ({
    useLocalStorage: vi.fn(),
}));

vi.mock("@/hooks/useLocalStorage", () => hookMocks);

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({as: Tag = "div", children, direction, gap, ...props}: any) => (
        <Tag data-flex="" data-direction={direction} data-gap={gap} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/search", () => ({
    Search: ({label, ...props}: any) => (
        <label data-search="">
            <span>{label}</span>
            <input {...props} />
        </label>
    ),
}));

vi.mock("@fremtind/jokul/select", () => ({
    BETA_Select: ({label, children, ...props}: any) => (
        <label data-select="">
            <span>{label}</span>
            <select {...props}>{children}</select>
        </label>
    ),
}));

vi.mock("@fremtind/jokul/nav-link", () => ({
    NavLink: ({href, children}: any) => <a data-nav-link="" href={href}>{children}</a>,
}));

vi.mock("@/features/ds/jokul/_shared/components/Toolbar", () => ({
    Toolbar: ({children}: any) => <div data-toolbar="">{children}</div>,
}));

vi.mock("@/features/ds/jokul/_shared/components/ComponentCard", () => ({
    ComponentCard: ({doc}: any) => (
        <a data-component-card={doc.id} href={`/ds/jokul/component/${doc.id}`}>
            {doc.name}
        </a>
    ),
}));

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({title, description}: any) => (
        <header data-page-header="">
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    ),
}));

function countOccurrences(html: string, marker: string) {
    return (html.match(new RegExp(marker, "g")) || []).length;
}

describe("ComponentIndexPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders visible component docs with default sorting while local preferences are loading", () => {
        hookMocks.useLocalStorage.mockReturnValue(["az", vi.fn(), false]);

        const html = renderToStaticMarkup(<ComponentIndexPage/>);
        const visibleComponents = componentDocs.filter((doc) => doc.showOnOverview !== false);

        expect(html).toContain("Komponentdokumentasjon");
        expect(html).toContain('class="ds-grid" data-columns="4"');
        expect(countOccurrences(html, 'data-component-card="')).toBe(visibleComponents.length);

        for (const doc of visibleComponents) {
            expect(html).toContain(`href="/ds/jokul/component/${doc.id}"`);
            expect(html).toContain(`>${doc.name}<`);
        }
    });

    it("renders visible component docs, filters, and the props overview link", () => {
        hookMocks.useLocalStorage.mockReturnValue(["az", vi.fn(), true]);

        const html = renderToStaticMarkup(<ComponentIndexPage/>);
        const visibleComponents = componentDocs.filter((doc) => doc.showOnOverview !== false);
        const hiddenComponent = componentDocs.find((doc) => doc.showOnOverview === false);

        expect(html).toContain('href="/ds/jokul/component/props"');
        expect(html).toContain("Søk etter komponent");
        expect(html).toContain("Kategori");
        expect(html).toContain("Status");
        expect(html).toContain("Sorter");
        expect(html).toContain('class="ds-grid" data-columns="4"');
        expect(countOccurrences(html, 'data-component-card="')).toBe(visibleComponents.length);

        if (hiddenComponent) {
            expect(html).not.toContain(`data-component-card="${hiddenComponent.id}"`);
        }
    });
});
