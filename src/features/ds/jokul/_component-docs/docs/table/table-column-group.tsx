import type {ComponentDoc} from "../types";
import {TableColumnGroupPreview} from "./preview";

const doc: ComponentDoc = {
    id: "table-column-group",
    name: "TableColumnGroup",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Wrapper for TableColumn-elementer colgroup for å gruppere kolonner med felles.",
        long: "Wrapper for TableColumn-elementer (colgroup) for å gruppere kolonner med felles egenskaper.",
    },
    preview: <TableColumnGroupPreview/>,
    props: [
        {name: "span", type: "number", required: false, source: "native", status: "stable", description: "Antall kolonner gruppen dekker."},
        {name: "className", type: "string", required: false, source: "react", status: "stable", description: "Egendefinert klasse på colgroup."},
        {name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "En eller flere TableColumn."},
    ],
};

export default doc;
