import type { ComponentDoc } from "../types";
import { TabListPreview } from "./preview";

const doc: ComponentDoc = {
    id: "tab-list",
    name: "TabList",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Wrapper som inneholder Tab-elementene.",
        long: "Wrapper som inneholder Tab-elementene.",
    },
    preview: <TabListPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tab-elementer." },
    ],
};

export default doc;
