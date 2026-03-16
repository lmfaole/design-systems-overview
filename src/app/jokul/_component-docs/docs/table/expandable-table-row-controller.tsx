import type {ComponentDoc} from "../types";
import {ExpandableTableRowControllerPreview} from "./preview";

const doc: ComponentDoc = {
    id: "expandable-table-row-controller",
    name: "ExpandableTableRowController",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Kontrollerer for utvidbar rad.",
        long: "Kontrollerer for utvidbar rad. Inneholder knappen som toggler den utvidede visningen. Skal brukes inni ExpandableTableRow.",
    },
    preview: <ExpandableTableRowControllerPreview/>,
    props: [
        {
            name: "children",
            type: "React.ReactNode",
            required: false,
            source: "react",
            status: "stable",
            description: "Innholdet i cellen. Brukes gjerne som label for knappen."
        },
        {
            name: "isOpen",
            type: "boolean",
            required: false,
            source: "custom",
            status: "stable",
            description: "Om raden er åpen. Vanligvis satt automatisk av ExpandableTableRow."
        },
        {
            name: "onClick",
            type: "() => void",
            required: false,
            source: "custom",
            status: "stable",
            description: "Callback for klikk. Vanligvis satt automatisk av ExpandableTableRow."
        },
        {
            name: "data-th",
            type: "string",
            required: false,
            source: "native",
            status: "stable",
            description: "Overskrift for cellen i mobilvisning (collapseToList)."
        },
    ],
};

export default doc;
