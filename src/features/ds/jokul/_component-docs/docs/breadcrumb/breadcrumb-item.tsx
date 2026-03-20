import type { ComponentDoc } from "../types";
import { BreadcrumbItemPreview } from "./preview";

const doc: ComponentDoc = {
    id: "breadcrumb-item",
    name: "BreadcrumbItem",
    package: "@fremtind/jokul/breadcrumb",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Enkelt ledd i brødsmulestien.",
        long: "Et enkelt ledd i brødsmulestien.",
    },
    preview: <BreadcrumbItemPreview />,
    props: [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Lenke eller tekst for gjeldende side." },
    ],
};

export default doc;
