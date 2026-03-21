import type {ComponentDoc} from "../types";
import {SkeletonButtonPreview} from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-button",
    name: "SkeletonButton",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Plassholder som matcher bredde og høyde på en Button.",
        long: "Plassholder som matcher bredde og høyde på en Button.",
    },
    preview: <SkeletonButtonPreview/>,
    props: [
        {
            name: "width",
            type: "string",
            required: false,
            source: "custom",
            status: "stable",
            description: "Bredde på knapp-plassholderen, f.eks. '8rem'."
        },
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
