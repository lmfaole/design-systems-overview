import type {ComponentDoc} from "../types";
import {props} from "./props";
import {TablePreview} from "./preview";

const doc: ComponentDoc = {
    id: "table",
    name: "Table",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Komplekse tabeller krever riktig semantikk, overskrifter og responsiv håndtering.",
            maintenance: "Mange subkomponenter og varianter gir stor API-flate.",
        },
    },
    description: {
        short: "Rendrer en tilgjengelig HTML-tabell med Jøkuls stilsett.",
        long: "Table rendrer en tilgjengelig HTML-tabell med Jøkuls stilsett. Støtter sortering via useSortableTableHeader-hooken og responsiv listevisning med collapseToList.",
    },
    relationships: {
        related: [{
            id: "summary-table",
            description: "Bruk SummaryTable for tokolonnet nøkkel-verdi-sammendrag med en totalsfoter i stedet for fullstendige tabelldata."
        }],
        subcomponents: [
            {id: "table-caption", description: "Tilgjengelig tabellbeskrivelse."},
            {id: "table-header", description: "En overskriftscelle i tabellen."},
            {id: "table-cell", description: "En datacelle i tabellen."},
            {id: "table-head", description: "Wrapper for overskriftsraden i tabellen."},
            {id: "table-body", description: "Wrapper for dataradene i tabellen."},
            {id: "table-row", description: "En rad i tabellen."},
            {id: "expandable-table-row", description: "En rad som kan utvides for å vise tilleggsinformasjon."},
            {id: "expandable-table-row-controller", description: "Kontroller for utvidbar rad."},
            {id: "data-table", description: "Rendrer en tabell direkte fra kolonne- og radlister."},
            {id: "table-column", description: "Definerer bredde og egenskaper for en kolonne."},
            {id: "table-column-group", description: "Grupperer flere TableColumn."},
            {id: "table-footer", description: "Wrapper for tfoot med summer/paginering."},
            {id: "table-pagination", description: "Paginering for tabeller."},
        ],
    },
    preview: <TablePreview/>,

    props,
};

export default doc;
