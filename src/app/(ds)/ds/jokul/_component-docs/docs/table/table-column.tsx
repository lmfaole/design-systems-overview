import type {ComponentDoc} from "../types";
import {TableColumnPreview} from "./preview";

const doc: ComponentDoc = {
    id: "table-column",
    name: "TableColumn",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Col definisjon for å angi bredde egenskaper på en tabellkolonne.",
        long: "En <col>-definisjon for å angi bredde/egenskaper på en tabellkolonne.",
    },
    preview: <TableColumnPreview/>,
    props: [
        {name: "span", type: "number", required: false, source: "native", status: "stable", description: "Antall kolonner denne definisjonen skal gjelde for."},
        {name: "width", type: "string", required: false, source: "native", status: "stable", description: "CSS-bredde. Brukes ofte med prosent eller ch."},
        {name: "className", type: "string", required: false, source: "react", status: "stable", description: "Egendefinert klasse på col-elementet."},
    ],
};

export default doc;
