import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { IconPreview } from "./preview";

const doc: ComponentDoc = {
    id: "icon",
    name: "Icon",
    package: "@fremtind/jokul/icon",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Rendrer Material Symbols-ikoner.",
        long: "Icon rendrer Material Symbols-ikoner. Gi navnet på ikonet som child-tekst.",
    },

    preview: <IconPreview />,
    example: (props) => <IconPreview {...props} />,
    props,
    migrations,
    relationships: {
        alternatives: [{ id: "button", description: "Bruk Button med variant=\"ghost\" og icon-prop når ikonet må være interaktivt og ha en tilgjengelig knappeetikett." }],
    }
};

export default doc;
