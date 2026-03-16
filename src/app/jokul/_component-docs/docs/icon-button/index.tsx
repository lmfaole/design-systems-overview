import type { ComponentDoc } from "../types";
import { props } from "./props";
import { IconButtonPreview } from "./preview";
import { migrations } from "./migration";

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
    props,
    migrations,
};

export default doc;
