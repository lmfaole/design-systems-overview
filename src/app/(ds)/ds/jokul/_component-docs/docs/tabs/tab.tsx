import type { ComponentDoc } from "../types";
import { TabPreview } from "./preview";

const doc: ComponentDoc = {
    id: "tab",
    name: "Tab",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Enkelt fane-knapp.",
        long: "En enkelt fane-knapp.",
    },
    preview: <TabPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekst eller innhold i fanen." },
    ],
};

export default doc;
