import type { ComponentDoc } from "../types";
import { TableCellPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-cell",
    name: "TableCell",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Datacelle i tabellen.",
        long: "En datacelle i tabellen.",
    },
    preview: <TableCellPreview />,
    props: [
        { name: "align", type: '"left" | "right" | "center"', required: false, source: "custom", status: "stable", default: '"left"', description: "Horisontal tekstjustering." },
        { name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "Innholdet i cellen." },
    ],
};

export default doc;
