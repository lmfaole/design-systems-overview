import type { ComponentDoc } from "../types";
import { TabPanelPreview } from "./preview";

const doc: ComponentDoc = {
    id: "tab-panel",
    name: "TabPanel",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Innholdsområdet tilknyttet en fane.",
        long: "Innholdsområdet tilknyttet en fane.",
    },
    preview: <TabPanelPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Innholdet som vises når fanen er aktiv." },
        { name: "tabIndex", type: "number", required: false, source: "native", status: "stable", description: "Overstyrer tabIndex på panelet." },
    ],
};

export default doc;
