import type { ComponentDoc } from "../types";
import { DescriptionDetailPreview } from "./preview";

const doc: ComponentDoc = {
    id: "description-detail",
    name: "DescriptionDetail",
    package: "@fremtind/jokul/description-list",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Verdien dd i et nøkkel-verdi-par.",
        long: "Verdien (dd) i et nøkkel-verdi-par.",
    },
    preview: <DescriptionDetailPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekst eller innhold for detaljen." },
    ],
};

export default doc;
