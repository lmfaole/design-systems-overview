import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { InputGroupPreview } from "./preview";

const doc: ComponentDoc = {
    id: "input-group",
    name: "Input Group",
    package: "@fremtind/jokul/input-group",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "InputGroup kombinerer et skjemafelt med label, hjelpetekst og feilmelding på en tilgjengelig måte.",
        long: "InputGroup kombinerer et skjemafelt med label, hjelpetekst og feilmelding på en tilgjengelig måte. Bruk FieldGroup når du skal gruppere Checkbox eller RadioButton under en felles legend.",
    },
    preview: <InputGroupPreview />,

    relationships: {
        related: [
            { id: "text-input", description: "InputGroup wrapper TextInput (og lignende felt) for å legge til prefiks-/suffiksikoner eller knapper." },
            { id: "field-group", description: "Bruk FieldGroup for grupper av Checkbox eller RadioButton med felles legend." },
            { id: "checkbox", description: "Integrer Checkbox inne i InputGroup når en boolsk modifikator er tett koblet til inndataverdien." },
            { id: "radio-button", description: "Bruk FieldGroup for å gruppere RadioButton-alternativer under en felles tilgjengelig legend." },
            { id: "help", description: "Fest Help til en InputGroup for å gi kontekstuell veiledning uten å rote til etiketten." },
        ],
    },
    props,
    migrations,
};

export default doc;
