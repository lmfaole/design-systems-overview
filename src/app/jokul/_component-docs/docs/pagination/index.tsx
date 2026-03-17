import type { ComponentDoc } from "../types";
import { props } from "./props";
import { PaginationPreview } from "./preview";
import { PaginationExample } from "./example";

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
    example: (props) => <PaginationExample {...props} />,
    exampleControlsConfig: {
        include: ["currentPage", "numberOfPages", "labels.previous", "labels.next"],
        order: ["currentPage", "numberOfPages", "labels.previous", "labels.next"],
        overrides: {
            currentPage: { defaultValue: 3, min: 1, max: 20, step: 1 },
            numberOfPages: { defaultValue: 8, min: 1, max: 20, step: 1 },
            "labels.previous": { kind: "text", defaultValue: "Forrige side" },
            "labels.next": { kind: "text", defaultValue: "Neste side" },
        },
    },
    props,
};

export default doc;
