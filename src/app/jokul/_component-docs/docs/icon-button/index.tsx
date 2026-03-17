import type { ComponentDoc } from "../types";
import { props } from "./props";
import { IconButtonPreview } from "./preview";
import { migrations } from "./migration";
import { IconButtonExample } from "./example";

const doc: ComponentDoc = {
    id: "icon-button",
    name: "Icon Button",
    package: "@fremtind/jokul/icon-button",
    category: "Handling",
    status: "deprecated",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Kompakt knapp for handlinger uten synlig tekst.",
        long: "Kompakt knapp for handlinger som kun trenger et ikon. Gi alltid en aria-label som beskriver handlingen. Deprecated: bruk heller Button med variant=\"ghost\" og icon.",
    },
    relationships: {
        alternatives: [
            { id: "button", description: "Bruk Button med variant=\"ghost\" og icon-prop for ikonknapper." },
            { id: "icon", description: "Bruk Icon når symbolet er rent dekorativt og ikke trenger å være et fokuserbart interaktivt element." },
        ],
    },

    preview: <IconButtonPreview />,
    example: (props) => <IconButtonExample {...props} />,
    exampleControlsConfig: {
        include: ["aria-label", "icon", "iconName", "disabled", "type"],
        order: ["aria-label", "icon", "iconName", "disabled", "type"],
        overrides: {
            "aria-label": { kind: "text", defaultValue: "Åpne handlinger" },
            icon: {
                kind: "select",
                options: ["more_vert", "edit", "delete", "search", "help", "custom"],
                defaultValue: "more_vert",
            },
            iconName: {
                kind: "text",
                defaultValue: "more_vert",
                visibleWhen: { name: "icon", value: "custom" },
            },
            type: { kind: "select", options: ["button", "submit", "reset"], defaultValue: "button" },
        },
    },
    props,
    migrations,
};

export default doc;
