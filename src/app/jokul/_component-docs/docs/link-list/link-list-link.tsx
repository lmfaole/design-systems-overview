import type { ComponentDoc } from "../types";
import { LinkListLinkPreview } from "./preview";

const doc: ComponentDoc = {
    id: "link-list-link",
    name: "LinkList.Link",
    package: "@fremtind/jokul/link-list",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Lenke inne i lenkegruppelisten.",
        long: "En lenke inne i lenkegruppelisten.",
    },
    preview: <LinkListLinkPreview />,
    props: [
        { name: "href", type: "string", required: true, source: "native", status: "stable", description: "URL-en lenken peker til." },
        { name: "target", type: "string", required: false, source: "native", status: "stable", description: 'Åpner lenken i nytt vindu/fane (f.eks. "_blank").' },
        { name: "rel", type: "string", required: false, source: "native", status: "stable", description: 'Relasjon mellom gjeldende dokument og lenket dokument (f.eks. "noopener noreferrer").' },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Lenketekst eller innhold." },
    ],
};

export default doc;
