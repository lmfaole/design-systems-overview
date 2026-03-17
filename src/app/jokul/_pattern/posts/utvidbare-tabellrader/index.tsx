import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { ExpandableRowsExample, MissingColSpanExample } from "./examples";

const post: PatternPost = {
    id: 11,
    title: "Utvidbare tabellrader",
    category: "struktur",
    goals: "La brukeren se detaljer per rad uten å miste tabellkonteksten.",
    avoid: [
        {
            title: "Utvidelse uten riktig colSpan",
            description: "Hvis utvidet innhold ikke spenner over hele tabellen, blir layouten uforutsigbar.",
            code: `
import {
    ExpandableTableRow,
    ExpandableTableRowController,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

export function MissingColSpanExample() {
    return (
        <Table caption={<TableCaption>Utvidelse uten riktig colSpan</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Detaljer</TableHeader>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris per år</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <ExpandableTableRow
                    expandedChildren={(
                        <TableRow>
                            <TableCell colSpan={1}>
                                Innholdet får ikke plass når colSpan ikke dekker alle kolonner.
                            </TableCell>
                        </TableRow>
                    )}
                >
                    <ExpandableTableRowController>Vis</ExpandableTableRowController>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </ExpandableTableRow>
            </TableBody>
        </Table>
    );
}
`,
            Example: MissingColSpanExample,
        },
    ],
    examples: [
        {
            title: "Én rad åpen om gangen",
            description: "Hold styr på hvilken rad som er åpen og gi kontrollen en tydelig label.",
            code: `
import { useState } from "react";
import {
    ExpandableTableRow,
    ExpandableTableRowController,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

const rows = [
    { id: "bil", product: "Bilforsikring", premium: 1200, details: ["Leiebil i 14 dager", "Egenandel 6 000 kr"] },
    { id: "reise", product: "Reiseforsikring", premium: 540, details: ["Dekning i hele verden", "Bagasje inntil 30 000 kr"] },
];

export function ExpandableRowsExample() {
    const [openRowId, setOpenRowId] = useState<string | null>(rows[0]?.id ?? null);

    return (
        <Table caption={<TableCaption>Forsikringsdetaljer</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Detaljer</TableHeader>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris per år</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <ExpandableTableRow
                        key={row.id}
                        isOpen={openRowId === row.id}
                        onToggle={(nextOpen) => setOpenRowId(nextOpen ? row.id : null)}
                        expandedChildren={(
                            <TableRow>
                                <TableCell colSpan={3}>
                                    {row.details.join(" • ")}
                                </TableCell>
                            </TableRow>
                        )}
                    >
                        <ExpandableTableRowController>
                            {openRowId === row.id ? "Skjul" : "Vis"}
                        </ExpandableTableRowController>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{row.premium} kr</TableCell>
                    </ExpandableTableRow>
                ))}
            </TableBody>
        </Table>
    );
}
`,
            Example: ExpandableRowsExample,
        },
    ],
    accessibility: {
        title: "Gi utvidbare rader en tydelig knapp",
        description: (
            <>
                Når en rad kan åpnes for detaljer, må brukeren ha en tydelig kontroll med navn og
                tilstand. <code>ExpandableTableRowController</code> gir en knapp med korrekt
                <code>aria-expanded</code>.
            </>
        ),
        ariaRoles: [
            <>
                Bruk <code>aria-expanded</code> for å uttrykke om raden er åpen eller lukket. Jøkul
                håndterer dette når du bruker <code>ExpandableTableRowController</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded"
                    external
                >
                    Les mer om aria-expanded
                </Link>
                .
            </>,
            <>
                Sørg for at kontrollen har et tydelig navn (f.eks. "Vis"/"Skjul") og at den er en
                ekte knapp.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/" external>
                    ARIA APG: Disclosure Pattern
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Utvidet innhold må være tydelig knyttet til raden det gjelder.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "2.4.6",
                title: "Headings and Labels",
                level: "AA",
                relevance: "Kontroller må ha tydelig label som forklarer hva som åpnes.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Knappen må ha korrekt rolle og tilstand når raden er åpen.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
        ],
        avoid: [
            "Ikke skjul kontrollen bak klikk på hele raden — brukeren trenger en tydelig knapp.",
            "Ikke glem å spenne utvidet innhold over alle kolonner med colSpan.",
            "Unngå lange tekstblokker i en enkelt celle uten struktur eller linjeskift.",
        ],
        testing: [
            "Tastatur: Tab til kontrollen og bruk Enter/Space for å åpne/lukke.",
            "Skjermleser: verifiser at tilstanden annonseres som utvidet/innskrenket.",
        ],
    },
    resources: [
        {
            title: "ARIA: aria-expanded",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded",
            publisher: "MDN",
            relevance: 5,
            description: "Hvordan utvidet/innskrenket tilstand kommuniseres.",
        },
        {
            title: "ARIA APG: Disclosure Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Retningslinjer for kontroller som åpner og lukker innhold.",
        },
    ],
    components: [
        "table",
        "table-head",
        "table-header",
        "table-body",
        "table-row",
        "table-cell",
        "expandable-table-row",
        "expandable-table-row-controller",
        "flex",
    ],
};

export default post;
