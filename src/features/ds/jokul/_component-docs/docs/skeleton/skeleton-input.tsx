import type {ComponentDoc} from "../types";
import {SkeletonInputPreview} from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-input",
    name: "SkeletonInput",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Plassholder som matcher bredde og høyde på et TextInput-felt.",
        long: "Plassholder som matcher bredde og høyde på et TextInput-felt.",
    },
    preview: <SkeletonInputPreview/>,
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
