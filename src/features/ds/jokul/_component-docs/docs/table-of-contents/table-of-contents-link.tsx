import type { ComponentDoc } from "../types";
import { TableOfContentsLinkPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-of-contents-link",
    name: "TableOfContents.Link",
    package: "@fremtind/jokul/table-of-contents",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Lenke i innholdsfortegnelsen.",
        long: "En lenke i innholdsfortegnelsen. Rendres som en <a> som standard, men kan byttes med as-prop.",
    },
    preview: <TableOfContentsLinkPreview />,
    props: [
        { name: "href", type: "string", required: true, source: "native", status: "stable", description: "Anker-ID for seksjonen lenken peker til, f.eks. #intro." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Lenketeksten." },
        { name: "as", type: "React.ElementType", required: false, source: "custom", status: "stable", description: "Bytt ut underliggende element, f.eks. en router-lenke fra rammeverket ditt." },
    ],
};

export default doc;
