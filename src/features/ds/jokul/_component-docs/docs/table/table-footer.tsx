import type {ComponentDoc} from "../types";
import {TableFooterPreview} from "./preview";

const doc: ComponentDoc = {
    id: "table-footer",
    name: "TableFooter",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Wrapper for tabellens fot tfoot der totalsummer og paginering typisk.",
        long: "Wrapper for tabellens fot (tfoot) der totalsummer og paginering typisk plasseres.",
    },
    preview: <TableFooterPreview/>,
    props: [
        {name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "Rader som hører til foten, ofte med summer eller kontroller."},
    ],
};

export default doc;
