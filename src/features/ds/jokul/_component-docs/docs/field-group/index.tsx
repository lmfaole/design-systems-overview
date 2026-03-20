import type { ComponentDoc } from "../types";
import { props } from "./props";
import { FieldGroupPreview } from "./preview";
import { FieldGroupExample } from "./example";

const doc: ComponentDoc = {
    id: "field-group",
    name: "Field Group",
    package: "@fremtind/jokul/input-group",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "FieldGroup grupperer relaterte skjemaelementer under en felles legend.",
        long: "FieldGroup grupperer relaterte skjemaelementer under en felles legend.",
    },
    relationships: {
        related: [
            { id: "input-group", description: "Bruk InputGroup for enkeltfelt med label, hjelpetekst og feilmelding." },
            { id: "checkbox", description: "Wrapper flere Checkbox-elementer i FieldGroup for å gi dem en felles tilgjengelig legende." },
            { id: "radio-button", description: "Wrapper RadioButton-alternativer i FieldGroup slik at skjermlesere annonserer det felles spørsmålet som en gruppeetikett." },
        ],
    },

    preview: <FieldGroupPreview />,
    example: (props) => <FieldGroupExample {...props} />,
    exampleControlsConfig: {
        include: ["legend", "description", "helpLabel", "errorLabel", "labelProps.variant", "labelProps.srOnly"],
        order: ["legend", "description", "helpLabel", "errorLabel", "labelProps.variant", "labelProps.srOnly"],
        overrides: {
            legend: { defaultValue: "Velg produkter" },
            description: { defaultValue: "Velg det som passer behovet ditt." },
            helpLabel: {
                defaultValue: "Du kan velge flere alternativer.",
                visibleWhen: { name: "errorLabel", operator: "notEquals", value: "Du må velge minst ett alternativ" },
            },
            errorLabel: { placeholder: "Feilmelding" },
            "labelProps.variant": { kind: "select", options: ["small", "medium", "large"], defaultValue: "medium" },
            "labelProps.srOnly": { kind: "boolean", defaultValue: false },
        },
    },
    props,
};

export default doc;
