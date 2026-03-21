import type {ComponentDoc} from "../types";
import {SkeletonRadioButtonGroupPreview} from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-radio-button-group",
    name: "SkeletonRadioButtonGroup",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Plassholder for en gruppe radioknapper.",
        long: "Plassholder for en gruppe radioknapper.",
    },
    preview: <SkeletonRadioButtonGroupPreview/>,
    props: [
        {
            name: "radioButtons",
            type: "number",
            required: true,
            source: "custom",
            status: "stable",
            description: "Antall radioknapper som skal vises som plassholdere."
        },
    ],
};

export default doc;
