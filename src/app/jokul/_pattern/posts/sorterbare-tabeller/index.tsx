import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { SortableTableExample, ClickableHeaderExample } from "./examples";

const post: PatternPost = {
    id: 10,
    title: "Sorterbare tabeller",
    category: "struktur",
    goals: "La brukeren sortere tabellinnhold med tydelige, tilgjengelige overskrifter.",
    rationale: {
        use: [
            <>
                Bruk dette når brukeren må sammenligne eller finne verdier i større tabeller, og
                sorteringsrekkefølgen påvirker beslutningen. Sorterbare overskrifter gir raskt
                overblikk uten at brukeren må scrolle frem og tilbake.
            </>,
        ],
        avoid: [
            <>
                Unngå sorterbare tabeller når rekkefølgen allerede er betydningsfull (f.eks.
                kronologi) eller når antall rader er så lavt at sortering ikke gir verdi.
                For små datamengder er tydelig prioritering i teksten ofte nok.
            </>,
        ],
    },
    avoid: [
        {
            title: "Klikkbare overskrifter uten sorteringshint",
            description: "Uten sorterbar header mangler både tastaturstøtte og aria-sort.",
            code: `
import { useMemo, useState } from "react";
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell, TableCaption } from "@fremtind/jokul/table";

const rows = [
    { product: "Bilforsikring", premium: 1200 },
    { product: "Reiseforsikring", premium: 540 },
];

type SortKey = "product" | "premium";

export function ClickableHeaderExample() {
    const [sortKey, setSortKey] = useState<SortKey>("product");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const sortedRows = useMemo(() => {
        const direction = sortDirection === "asc" ? 1 : -1;
        return [...rows].sort((a, b) =>
            sortKey === "premium" ? (a.premium - b.premium) * direction : a.product.localeCompare(b.product)
        );
    }, [sortKey, sortDirection]);

    return (
        <Table caption={<TableCaption>Uten sorteringshint</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader onClick={() => setSortKey("product")}>Produkt</TableHeader>
                    <TableHeader align="right" onClick={() => setSortKey("premium")}>Pris per år</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedRows.map((row) => (
                    <TableRow key={row.product}>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{row.premium} kr</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
`,
            Example: ClickableHeaderExample,
        },
    ],
    examples: [
        {
            title: "Sorterbar header med useSortableTableHeader",
            description: (
                <>
                    Bruk <code>useSortableTableHeader</code> og sett <code>sortable</code> på hver
                    <code>TableHeader</code> som kan sorteres.
                </>
            ),
            code: `
import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    useSortableTableHeader,
} from "@fremtind/jokul/table";

const rows = [
    { product: "Bilforsikring", premium: 1200 },
    { product: "Reiseforsikring", premium: 540 },
    { product: "Innboforsikring", premium: 680 },
];

type SortKey = "product" | "premium";

export function SortableTableExample() {
    const [sortKey, setSortKey] = useState<SortKey>("product");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("asc");

    const { getSortProps } = useSortableTableHeader(sortKey, sortDirection, (nextKey, nextDirection) => {
        setSortKey(nextKey as SortKey);
        setSortDirection(nextDirection);
    });

    const sortedRows = useMemo(() => {
        if (sortDirection === "none") return rows;
        const direction = sortDirection === "asc" ? 1 : -1;
        return [...rows].sort((a, b) =>
            sortKey === "premium" ? (a.premium - b.premium) * direction : a.product.localeCompare(b.product)
        );
    }, [sortKey, sortDirection]);

    return (
        <Table caption={<TableCaption>Sorterbare premier</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader sortable={getSortProps("product").sortable}>Produkt</TableHeader>
                    <TableHeader align="right" sortable={getSortProps("premium").sortable}>Pris per år</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedRows.map((row) => (
                    <TableRow key={row.product}>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{row.premium} kr</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
`,
            Example: SortableTableExample,
        },
    ],
    accessibility: {
        title: "Gjør sortering tydelig og tastaturvennlig",
        description: (
            <>
                Sortering skal være tydelig for alle brukere, ikke bare de som ser
                musepekeren. Bruk <code>aria-sort</code> via Jøkul sine sorteringsprops og
                sørg for at sorteringsknappen er fokusbar.
            </>
        ),
        ariaRoles: [
            <>
                Bruk ekte tabellsemantikk (<code>&lt;table&gt;</code>, <code>&lt;th&gt;</code>,
                <code>&lt;td&gt;</code>) fremfor å bygge tabeller med <code>div</code>.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/table/" external>
                    ARIA APG for tabell
                </Link>
                .
            </>,
            <>
                For sorterbare kolonner, bruk <code>aria-sort</code> for å uttrykke
                rekkefølgen. Jøkul setter dette når du bruker <code>useSortableTableHeader</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-sort"
                    external
                >
                    Les om aria-sort på MDN
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Sorteringsknapper må være korrekt uttrykt i semantikken for at relasjoner forstås av hjelpemidler.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "2.1.1",
                title: "Keyboard",
                level: "A",
                relevance: "Sortering må kunne trigges og forstås via tastatur, ikke bare klikk.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Sorteringskontrollen må ha korrekt navn/rolle og tilstand (aria-sort).",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
        ],
        avoid: [
            "Ikke bruk klikk-handler på overskrifter uten sorteringsprops — det blir uklart for tastatur og skjermlesere.",
            "Ikke glem å oppdatere sorteringsrekkefølgen når brukeren bytter kolonne.",
            "Unngå å skjule sorteringsretning visuelt; bruk Jøkul sin innebygde indikator.",
        ],
        testing: [
            "Tastatur: Tab til overskriftene og bruk Enter/Space for å sortere.",
            "Skjermleser: verifiser at sorteringsretning annonseres (aria-sort).",
        ],
    },
    resources: [
        {
            title: "ARIA APG: Table Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/table/",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Semantikk og forventninger for tabellopplevelse.",
        },
        {
            title: "ARIA: aria-sort",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-sort",
            publisher: "MDN",
            relevance: 5,
            description: "Hvordan sorteringsretning skal kommuniseres.",
        },
    ],
    components: [
        "table",
        "table-head",
        "table-header",
        "table-body",
        "table-row",
        "table-cell",
        "flex",
    ],
};

export default post;
