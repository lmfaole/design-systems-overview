import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TextAreaPreview } from "./preview";
import { TextAreaExample } from "./example";

const doc: ComponentDoc = {
    id: "text-area",
    name: "Text Area",
    package: "@fremtind/jokul/text-area",
    category: "Skjema",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "TextArea er et flerlinjers tekstinputfelt for lengre tekstinnhold.",
        long: "TextArea er et flerlinjers tekstinputfelt for lengre tekstinnhold.",
    },
    relationships: {
        related: [
            { id: "text-input", description: "Bruk TextInput for enkeltlinjeverdi; TextArea er for flerlinjers fritekst som kommentarer eller beskrivelser." },
            { id: "input-group", description: "Bruk InputGroup for å legge til hjelpetekst eller feilmelding — men TextArea har dette innebygget og trenger ikke InputGroup selv." },
        ],
    },
    preview: <TextAreaPreview />,
    example: (props) => <TextAreaExample {...props} />,
    exampleControlsConfig: {
        include: ["rows", "autoExpand", "labelProps.variant", "labelProps.srOnly", "counter.maxLength", "counter.hideProgress", "helpLabel", "errorLabel"],
        order: ["rows", "autoExpand", "labelProps.variant", "labelProps.srOnly", "counter.maxLength", "counter.hideProgress", "helpLabel", "errorLabel"],
        overrides: {
            rows: { defaultValue: 4, min: 2, max: 12, step: 1 },
            "labelProps.variant": { kind: "select", options: ["small", "medium", "large"], defaultValue: "medium" },
            "labelProps.srOnly": { kind: "boolean", defaultValue: false },
            "counter.maxLength": { kind: "number", defaultValue: 120, min: 10, max: 500, step: 10 },
            "counter.hideProgress": { kind: "boolean", defaultValue: false, visibleWhen: { name: "counter.maxLength", operator: "exists" } },
            helpLabel: { defaultValue: "Skriv gjerne mer detaljert." },
        },
    },

    props,
};

export default doc;
