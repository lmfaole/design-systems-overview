import type { ComponentDoc } from "../types";
import { TableHeaderPreview } from "./preview";
import { TableHeaderExample } from "./table-header-example";

const doc: ComponentDoc = {
    id: "table-header",
    name: "TableHeader",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Overskriftscelle i tabellen.",
        long: "En overskriftscelle i tabellen.",
    },
    preview: <TableHeaderPreview />,
    example: (props) => <TableHeaderExample {...props} />,
    exampleControlsConfig: {
        include: ["scope", "align", "srOnly"],
        order: ["scope", "align", "srOnly"],
        overrides: {
            scope: { kind: "select", options: ["col", "row"], defaultValue: "col" },
            align: { defaultValue: "right" },
        },
    },
    props: [
        { name: "scope", type: '"col" | "row"', required: false, source: "native", status: "stable", description: "Angir om cellen er overskrift for kolonne eller rad." },
        { name: "align", type: '"left" | "right" | "center"', required: false, source: "custom", status: "stable", default: '"left"', description: "Horisontal tekstjustering." },
        { name: "sortable", type: "TableSortProps", required: false, source: "custom", status: "stable", description: "Aktiverer sortering. Bruk getSortProps() fra useSortableTableHeader." },
        { name: "srOnly", type: "boolean", required: false, source: "custom", status: "stable", description: "Skjuler header visuelt." },
        { name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "Innholdet i cellen." },
    ],
};

export default doc;
