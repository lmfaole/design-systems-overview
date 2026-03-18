import type { ComponentDoc } from "../types";
import { TableCaptionPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-caption",
    name: "TableCaption",
    package: "@fremtind/jokul/table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Tilgjengelig tabellbeskrivelse.",
        long: "Tilgjengelig tabellbeskrivelse. Bruk srOnly for å skjule den visuelt når konteksten allerede navngir tabellen.",
    },
    preview: <TableCaptionPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Beskrivelsesteksten." },
        { name: "srOnly", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Skjuler caption visuelt, men beholder den for skjermlesere." },
    ],
};

export default doc;
