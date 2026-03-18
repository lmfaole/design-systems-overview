import type {ComponentDoc} from "../types";
import {TablePaginationPreview} from "./preview";

const doc: ComponentDoc = {
    id: "table-pagination",
    name: "TablePagination",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Paginering for tabeller med kontrollert sidevalg og rader per side.",
        long: "Paginering for tabeller med kontrollert sidevalg og rader per side.",
    },
    preview: <TablePaginationPreview/>,
    props: [
        {name: "rowsPerPage", type: "number", required: true, source: "custom", status: "stable", description: "Antall rader som vises per side. Null eller negativt tolkes som «vis alle»."},
        {name: "rowsPerPageItems", type: "Array<number | { label: string; value: number }>", required: true, source: "custom", status: "stable", description: "Alternativer brukeren kan velge mellom for rader per side."},
        {name: "totalNumberOfRows", type: "number", required: true, source: "custom", status: "stable", description: "Totalt antall rader i datasettet."},
        {name: "onChange", type: "(event: React.SyntheticEvent, toPage: number, fromPage: number) => void", required: true, source: "custom", status: "stable", description: "Kalles når aktiv side endres."},
        {name: "onChangeRowsPerPage", type: "ChangeEventHandler<HTMLSelectElement>", required: true, source: "custom", status: "stable", description: "Kalles når rader-per-side endres."},
        {name: "activePage", type: "number", required: false, source: "custom", status: "stable", default: "0", description: "Nåværende sideindeks (0-basert)."},
        {name: "withGoToPage", type: "boolean | { gotoLabel: string }", required: false, source: "custom", status: "stable", default: "false", description: "Vis et felt for å hoppe til en side. Kan tilpasses med egen label."},
        {name: "labels", type: '{ rowsPerPage: string; previous: string; next: string }', required: false, source: "custom", status: "stable", default: '{ rowsPerPage: "Rader per side", previous: "Forrige", next: "Neste" }', description: "Tilpassede tekster for kontroller og skjermleser-hint."},
        {name: "className", type: "string", required: false, source: "react", status: "stable", description: "Egendefinert klasse."},
        {name: "id", type: "string", required: false, source: "native", status: "stable", description: "ID for komponenten."},
    ],
};

export default doc;
