import type { ComponentDoc } from "../types";
import { TableRowPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-row",
    name: "TableRow",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Rad i tabellen.",
        long: "En rad i tabellen.",
    },
    preview: <TableRowPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "TableHeader og TableCell-elementer." },
    ],
};

export default doc;
