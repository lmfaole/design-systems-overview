import type {ComponentDoc} from "../types";
import {SkeletonTextAreaPreview} from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-text-area",
    name: "SkeletonTextArea",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Plassholder som matcher bredde og høyde på et TextArea-felt.",
        long: "Plassholder som matcher bredde og høyde på et TextArea-felt.",
    },
    preview: <SkeletonTextAreaPreview/>,
    props: [
        {
            name: "children",
            type: "React.ReactNode",
            required: false,
            source: "react",
            status: "stable",
            description: "Valgfritt innhold."
        },
    ],
};

export default doc;
