import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { ResponsiveTableExample, MissingDataThExample } from "./examples";

const post: PatternPost = {
    id: 12,
    title: "Responsiv tabell med listevisning",
    category: "struktur",
    goals: "Gjør tabellinnhold lesbart på små skjermer uten å miste kontekst.",
    rationale: {
        use: [
            <>
                Bruk dette når tabellene må fungere på mobil og innholdet fortsatt trenger
                kolonneetiketter for å gi mening. Listevisning med <code>data-th</code> bevarer
                kontekst uten å tvinge horisontal scrolling.
            </>,
        ],
        avoid: [
            <>
                Ikke bruk listevisning hvis tabellen har så mange kolonner at hver rad blir en
                lang, tung liste. Da bør innholdet omstruktureres til kort eller et eget
                detaljvisningsmønster.
            </>,
        ],
    },
    avoid: [
        {
            title: "collapseToList uten data-th",
            description: "Når data-th mangler blir listevisningen utydelig og vanskelig å forstå.",
            code: `
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

export function MissingDataThExample() {
    return (
        <Table caption={<TableCaption>Uten data-th</TableCaption>} collapseToList fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris</TableHeader>
                    <TableHeader scope="col">Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                    <TableCell>Aktiv</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
`,
            Example: MissingDataThExample,
        },
    ],
    examples: [
        {
            title: "collapseToList med data-th",
            description: (
                <>
                    Når tabellen kollapser til liste, bruk <code>data-th</code> på hver
                    <code>TableCell</code> slik at etikettene følger med.
                </>
            ),
            code: `
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

export function ResponsiveTableExample() {
    return (
        <Table caption={<TableCaption>Forsikringer</TableCaption>} collapseToList fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris</TableHeader>
                    <TableHeader scope="col">Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell data-th="Produkt">Bilforsikring</TableCell>
                    <TableCell data-th="Pris" align="right">1 200 kr</TableCell>
                    <TableCell data-th="Status">Aktiv</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
`,
            Example: ResponsiveTableExample,
        },
    ],
    accessibility: {
        title: "Behold etiketter når tabellen blir til liste",
        description: (
            <>
                Når tabeller brytes ned på små skjermer må hver celle fortsatt ha en tydelig
                etikett. <code>data-th</code> gjør at brukere forstår hva tallene betyr.
            </>
        ),
        ariaRoles: [
            <>
                Bruk <code>&lt;caption&gt;</code> for å beskrive tabellen, også når den
                kollapser til liste.{" "}
                <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption" external>
                    MDN: caption-elementet
                </Link>
                .
            </>,
            <>
                Behold <code>&lt;th scope&gt;</code> for å uttrykke kolonneoverskrifter, selv om
                tabellen kollapser visuelt.{" "}
                <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th" external>
                    MDN: th-elementet
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Tabellrelasjoner må bevares selv når layouten endres.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "1.4.10",
                title: "Reflow",
                level: "AA",
                relevance: "Tabeller må kunne tilpasses små skjermer uten at innholdet blir uleselig.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/reflow.html",
            },
        ],
        avoid: [
            "Ikke bruk collapseToList uten data-th — brukeren mister konteksten til verdiene.",
            "Ikke fjern tabellcaption; den forklarer hva tabellen handler om.",
            "Unngå å skjule overskrifter uten at hver celle får en etikett.",
        ],
        testing: [
            "Reduser vinduet og verifiser at listevisningen fortsatt har tydelige etiketter.",
            "Skjermleser: sjekk at tabellens beskrivelse fortsatt annonseres.",
        ],
    },
    resources: [
        {
            title: "MDN: The caption element",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption",
            publisher: "MDN",
            relevance: 4,
            description: "Hvordan caption beskriver tabellens formål.",
        },
        {
            title: "MDN: The th element",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th",
            publisher: "MDN",
            relevance: 4,
            description: "Overskrifter og scope i tabeller.",
        },
    ],
    components: [
        "table",
        "table-head",
        "table-header",
        "table-body",
        "table-row",
        "table-cell",
        "table-caption",
        "flex",
    ],
};

export default post;
