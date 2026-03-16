import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SegmentedControlPreview } from "./preview";

const doc: ComponentDoc = {
    id: "segmented-control",
    name: "Segmented Control",
    package: "@fremtind/jokul/segmented-control",
    category: "Handling",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "SegmentedControl er en gruppe av knapper der kun ett alternativ kan velges om gangen.",
        long: "SegmentedControl er en gruppe av knapper der kun ett alternativ kan velges om gangen.",
    },
    relationships: {
        related: [{ id: "radio-button", description: "Bruk RadioButton når alternativene trenger en vertikal stablet listevisning i stedet for en horisontal knappegruppe." }],
        subcomponents: [
            { id: "segmented-control-button", description: "Et enkelt alternativ i SegmentedControl." },
        ],
    },

    preview: <SegmentedControlPreview />,
    props,
};

export default doc;
