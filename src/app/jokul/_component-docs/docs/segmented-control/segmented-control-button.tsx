import type { ComponentDoc } from "../types";
import { SegmentedControlButtonPreview } from "./preview";
import { SegmentedControlButtonExample } from "./segmented-control-button-example";

const doc: ComponentDoc = {
    id: "segmented-control-button",
    name: "SegmentedControlButton",
    package: "@fremtind/jokul/segmented-control",
    category: "Handling",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Enkelt alternativ i SegmentedControl.",
        long: "Et enkelt alternativ i SegmentedControl.",
    },
    preview: <SegmentedControlButtonPreview />,
    example: (props) => <SegmentedControlButtonExample {...props} />,
    exampleControlsConfig: {
        include: ["selectedValue", "separated", "disabled"],
        order: ["selectedValue", "separated", "disabled"],
        overrides: {
            selectedValue: {
                kind: "select",
                options: ["dag", "uke"],
                defaultValue: "dag",
            },
            separated: { kind: "boolean", defaultValue: false },
            disabled: { kind: "boolean", defaultValue: false },
        },
    },
    props: [
        { name: "value", type: "string", required: true, source: "native", status: "stable", description: "Verdien som sendes ved valg." },
        { name: "checked", type: "boolean", required: false, source: "native", status: "stable", description: "Om dette alternativet er valgt (kontrollert)." },
        { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", required: false, source: "react", status: "stable", description: "Kalles når alternativet velges." },
        { name: "separated", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Gir alternativet egen luft når det skiller seg fra resten." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer alternativet." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekst eller innhold i knappen." },
    ],
};

export default doc;
