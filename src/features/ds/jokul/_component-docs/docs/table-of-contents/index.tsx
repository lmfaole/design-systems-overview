import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TableOfContentsPreview } from "./preview";

const doc: ComponentDoc = {
    id: "table-of-contents",
    name: "Table Of Contents",
    package: "@fremtind/jokul/table-of-contents",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "TableOfContents viser en navigerbar innholdsfortegnelse for siden.",
        long: "TableOfContents viser en navigerbar innholdsfortegnelse for siden.",
    },
    preview: <TableOfContentsPreview />,
    example: () => <TableOfContentsPreview />,
    relationships: {
        subcomponents: [
            { id: "table-of-contents-link", description: "En lenke i innholdsfortegnelsen." },
        ],
    },
    props,
};

export default doc;
