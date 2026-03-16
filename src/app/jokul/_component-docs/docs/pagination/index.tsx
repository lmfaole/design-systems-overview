import type { ComponentDoc } from "../types";
import { props } from "./props";
import { PaginationPreview } from "./preview";

const doc: ComponentDoc = {
    id: "pagination",
    name: "Pagination",
    package: "@fremtind/jokul/pagination",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Brukes til å dele opp lange lister i sider.",
        long: "Pagination brukes til å dele opp lange lister i sider.",
    },

    preview: <PaginationPreview />,
    props,
};

export default doc;
