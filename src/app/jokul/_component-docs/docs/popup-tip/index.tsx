import type { ComponentDoc } from "../types";
import { props } from "./props";
import { PopupTipPreview } from "./preview";
import migrations from "./migration";

const doc: ComponentDoc = {
    id: "popup-tip",
    name: "PopupTip",
    package: "@fremtind/jokul/tooltip",
    category: "Overlegg",
    status: "deprecated",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "PopupTip viser kort tilleggsinfo ved hover eller klikk.",
        long: "PopupTip er en enkel tooltip-trigger for korte hint. Den er deprecated — bruk heller Tooltip for fleksible triggere, eller Help når innholdet krever mer forklaring.",
    },
    relationships: {
        alternatives: [
            { id: "tooltip", description: "Bruk Tooltip for mer kontroll over trigger og innhold." },
            { id: "help", description: "Bruk Help når du trenger et avvisbart hjelpepanelet." },
        ],
        related: [
            { id: "popover", description: "Popover gir mer komplekst innhold og interaksjon." },
        ],
    },
    preview: <PopupTipPreview />,
    props,
    migrations,
};

export default doc;
