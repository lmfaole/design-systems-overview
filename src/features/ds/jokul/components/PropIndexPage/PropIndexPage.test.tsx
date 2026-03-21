import {renderToStaticMarkup} from "react-dom/server";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {ALL_PROP_ENTRIES} from "@/features/ds/jokul/_component-docs/prop-index";
import PropIndexPage from "./render";

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

vi.mock("@fremtind/jokul/nav-link", () => ({
    NavLink: ({href, children}: any) => <a data-nav-link="" href={href}>{children}</a>,
}));

vi.mock("@fremtind/jokul/loader", () => ({
    SkeletonAnimation: ({children, textDescription}: any) => (
        <div data-skeleton-animation={textDescription}>{children}</div>
    ),
    SkeletonElement: (props: any) => <div data-skeleton-element="" {...props} />,
}));

vi.mock("@fremtind/jokul/table", () => ({
    Table: ({children, caption}: any) => (
        <table data-table="">
            {caption}
            {children}
        </table>
    ),
    TableHead: ({children}: any) => <thead>{children}</thead>,
    TableBody: ({children}: any) => <tbody>{children}</tbody>,
    TableRow: ({children}: any) => <tr data-table-row="">{children}</tr>,
    TableHeader: ({children, sortable}: any) => <th data-sortable={sortable}>{children}</th>,
    TableCell: ({children}: any) => <td>{children}</td>,
    TableCaption: ({children}: any) => <caption>{children}</caption>,
    useSortableTableHeader: () => ({
        getSortProps: () => ({sortable: true}),
    }),
}));

vi.mock("@fremtind/jokul/link", () => ({
    Link: ({href, children}: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/features/ds/jokul/_shared/components/Toolbar", () => ({
    Toolbar: ({children}: any) => <div data-toolbar="">{children}</div>,
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

describe("PropIndexPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders a skeleton state while local preferences are loading", () => {
        hookMocks.useLocalStorage.mockReturnValue(["name", vi.fn(), false]);

        const html = renderToStaticMarkup(<PropIndexPage/>);

        expect(html).toContain('data-skeleton-animation="Laster innstillinger…"');
        expect(html).toContain("Komponentdokumentasjon");
    });

    it("renders the prop overview table and component links", () => {
        hookMocks.useLocalStorage.mockReturnValue(["name", vi.fn(), true]);

        const html = renderToStaticMarkup(<PropIndexPage/>);
        const sampleEntry = ALL_PROP_ENTRIES.find((entry) => entry.usedBy.length > 0);

        expect(html).toContain('href="/ds/jokul/component"');
        expect(html).toContain("Filtrer props");
        expect(html).toContain("Props-oversikt");
        expect(countOccurrences(html, 'data-table-row=""')).toBe(ALL_PROP_ENTRIES.length + 1);

        if (sampleEntry) {
            expect(html).toContain(sampleEntry.propName);
            expect(html).toContain(`href="/ds/jokul/component/${sampleEntry.usedBy[0]?.id}"`);
        }
    });
});
