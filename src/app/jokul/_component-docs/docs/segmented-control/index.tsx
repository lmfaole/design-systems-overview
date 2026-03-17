import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SegmentedControlPreview } from "./preview";
import { SegmentedControlExample } from "./example";

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
    example: (props) => <SegmentedControlExample {...props} />,
    exampleControlsConfig: {
        include: ["legend", "description", "helpLabel", "errorLabel", "selectedValue", "separated", "disableLast"],
        order: ["legend", "selectedValue", "description", "helpLabel", "errorLabel", "separated", "disableLast"],
        overrides: {
            legend: { kind: "text", defaultValue: "Velg forsikring" },
            description: { kind: "text", defaultValue: "Velg ett alternativ." },
            helpLabel: { kind: "text", defaultValue: "Du kan endre valget senere." },
            errorLabel: { kind: "text", defaultValue: "" },
            selectedValue: {
                kind: "select",
                options: ["bil", "hus", "reise"],
                defaultValue: "bil",
            },
            separated: { kind: "boolean", defaultValue: false },
            disableLast: { kind: "boolean", defaultValue: false },
        },
    },
    props,
};

export default doc;
