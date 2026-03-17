import type {ComponentDoc} from "../types";
import {DataTablePreview} from "./preview";

const doc: ComponentDoc = {
    id: "data-table",
    name: "DataTable",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Rendrer en komplett tabell fra kolonne- og radlister.",
        long: "Rendrer en komplett tabell fra kolonne- og radlister, med responsive listevisning og caption for tilgjengelighet.",
    },
    relationships: {
        related: [
            {
                id: "table",
                description: "Bruk Table når du trenger full kontroll over semantikk og struktur med Table-delene.",
            },
        ],
    },
    preview: <DataTablePreview/>,
    props: [
        {name: "columns", type: "string[]", required: true, source: "custom", status: "stable", description: "Kolonneoverskrifter i korrekt rekkefølge."},
        {name: "rows", type: "React.ReactNode[][]", required: true, source: "custom", status: "stable", description: "Raddata, samme lengde som columns. Hver celle kan være tekst eller JSX."},
        {name: "caption", type: "string", required: false, source: "custom", status: "stable", description: "Beskrivelse for skjermlesere. Vises også visuelt hvis ikke skjult i TableCaption."},
        {name: "collapseToList", type: "boolean", required: false, source: "custom", status: "stable", description: "Bryter ned tabellen til listevisning på små skjermer. Husk data-th på celler om du bruker rå TableCell."},
        {name: "emptyTableText", type: "string", required: false, source: "custom", status: "stable", description: "Tekst som vises når rows er tom."},
        {name: "verticalAlign", type: '"center" | "top"', required: false, source: "custom", status: "stable", default: '"top"', description: "Vertikal justering av celleinnhold."},
    ],
};

export default doc;
