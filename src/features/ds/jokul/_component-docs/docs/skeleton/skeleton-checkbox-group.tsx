import type {ComponentDoc} from "../types";
import {SkeletonCheckboxGroupPreview} from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-checkbox-group",
    name: "SkeletonCheckboxGroup",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Plassholder for en gruppe avkrysningsbokser.",
        long: "Plassholder for en gruppe avkrysningsbokser.",
    },
    preview: <SkeletonCheckboxGroupPreview/>,
    props: [
        {
            name: "checkboxes",
            type: "number",
            required: true,
            source: "custom",
            status: "stable",
            description: "Antall avkrysningsbokser som skal vises som plassholdere."
        },
    ],
};

export default doc;
