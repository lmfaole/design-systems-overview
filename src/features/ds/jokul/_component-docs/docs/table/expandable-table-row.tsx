import type { ComponentDoc } from "../types";
import { ExpandableTableRowPreview } from "./preview";
import { ExpandableTableRowExample } from "./expandable-table-row-example";

const doc: ComponentDoc = {
    id: "expandable-table-row",
    name: "ExpandableTableRow",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Rad som kan utvides for å vise tilleggsinformasjon.",
        long: "En rad som kan utvides for å vise tilleggsinformasjon.",
    },
    preview: <ExpandableTableRowPreview />,
    example: (props) => <ExpandableTableRowExample {...props} />,
    exampleControlsConfig: {
        include: ["isOpen", "colSpan", "collapseToList"],
        order: ["isOpen", "colSpan", "collapseToList"],
        overrides: {
            isOpen: { kind: "boolean", defaultValue: false },
            colSpan: { kind: "number", defaultValue: 3, min: 1, max: 6, step: 1 },
            collapseToList: { kind: "boolean", defaultValue: false },
        },
    },
    props: [
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Celler i raden, inkluder ExpandableTableRowController for kontroll."
        },
        {
            name: "expandedChildren",
            type: "React.ReactNode",
            required: true,
            source: "custom",
            status: "stable",
            description: "Innhold som skal vises når raden er utvidet."
        },
        {
            name: "onToggle",
            type: "(isOpen: boolean) => void",
            required: false,
            source: "custom",
            status: "stable",
            description: "Callback som kjøres når raden åpnes eller lukkes."
        },
        {
            name: "isOpen",
            type: "boolean",
            required: false,
            source: "custom",
            status: "stable",
            description: "Om raden skal være åpen (kontrollert tilstand)."
        },
        {
            name: "colSpan",
            type: "number",
            required: false,
            source: "custom",
            status: "stable",
            description: "Antall kolonner den utvidede raden skal spenne over (standard 100)."
        },
        {
            name: "clickable",
            type: "boolean | ClickableRowProps",
            required: false,
            source: "custom",
            status: "stable",
            description: "Om raden skal være klikkbar for å utvide. Kan settes til false for å kun tillate utvidelse via ExpandableTableRowController."
        },
    ],
};

export default doc;
