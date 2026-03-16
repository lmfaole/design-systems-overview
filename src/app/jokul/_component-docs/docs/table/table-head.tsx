import type { ComponentDoc } from "../types";
import { TableHeadPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-head",
    name: "TableHead",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Wrapper for overskriftsraden i tabellen.",
        long: "Wrapper for overskriftsraden i tabellen.",
    },
    preview: <TableHeadPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "TableRow-elementer." },
    ],
};

export default doc;
