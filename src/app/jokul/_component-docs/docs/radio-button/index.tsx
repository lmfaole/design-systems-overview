import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { RadioButtonPreview } from "./preview";

const doc: ComponentDoc = {
    id: "radio-button",
    name: "Radio Button",
    package: "@fremtind/jokul/radio-button",
    category: "Skjema",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "RadioButton og RadioButtonGroup brukes for envalgslister.",
        long: "RadioButton og RadioButtonGroup brukes for envalgslister.",
    },
    relationships: {
        alternatives: [{ id: "radio-panel", description: "Bruk RadioPanel når du trenger et større klikkbart kortområde rundt hvert alternativ." }],
        related: [
            { id: "input-group", description: "Bruk InputGroup for å gruppere RadioButton-felter under en felles label og dele hjelpetekst." },
            { id: "checkbox", description: "Bruk Checkbox i stedet når brukeren kan velge flere alternativer samtidig." },
        ],
    },

    preview: <RadioButtonPreview />,
    props,
    migrations,
};

export default doc;
