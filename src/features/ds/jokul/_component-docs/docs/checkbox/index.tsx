import type { ComponentDoc } from "../types";
import { props } from "./props";
import { CheckboxPreview } from "./preview";
import { CheckboxExample } from "./example";

const doc: ComponentDoc = {
    id: "checkbox",
    name: "Checkbox",
    package: "@fremtind/jokul/checkbox",
    category: "Skjema",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Brukes for binære valg i skjemaer, typisk samtykke eller flervalgslister.",
        long: "Checkbox brukes for binære valg i skjemaer, typisk for samtykke eller flervalgslister.",
    },
    relationships: {
        alternatives: [{ id: "checkbox-panel", description: "Bruk CheckboxPanel når du trenger et større klikkbart kortområde som inkluderer etiketten." }],
        related: [
            { id: "input-group", description: "Bruk InputGroup for å gruppere Checkbox-felter under en felles label og dele hjelpetekst." },
            { id: "toggle-switch", description: "Bruk ToggleSwitch for binære av/på-innstillinger som trer i kraft umiddelbart uten en innsendingshandling." },
        ],
    },

    preview: <CheckboxPreview />,
    example: (props) => <CheckboxExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "defaultChecked", "indeterminate", "invalid"],
        order: ["label", "defaultChecked", "indeterminate", "invalid"],
        overrides: {
            label: { kind: "text", defaultValue: "Godta vilkårene" },
            defaultChecked: { kind: "boolean", defaultValue: false },
            indeterminate: { kind: "boolean", defaultValue: false },
            invalid: { kind: "boolean", defaultValue: false },
        },
    },
    props,
};

export default doc;
