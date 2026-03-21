import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SelectPreview } from "./preview";
import { SelectExample } from "./example";

const doc: ComponentDoc = {
    id: "select",
    name: "Select (beta)",
    package: "@fremtind/jokul/select",
    category: "Skjema",
    status: "beta",
    complexity: { use: "easy", maintenance: "medium" },
    description: {
        short: "BETA Select er en ny, forenklet variant av Select.",
        long: "BETA Select er en ny, forenklet variant av Select som wrapper det native <select>-elementet med Jøkul-styling. Den bruker children i stedet for en items-array og standard React onChange — i motsetning til den stabile Select som har et egendefinert dropdown-grensesnitt. Planen er at BETA Select erstatter den stabile varianten.",
    },
    relationships: {
        alternatives: [{ id: "select-stable", description: "Bruk den stabile Select (SelectStable) i produksjon inntil denne BETA-komponentens API er ferdigstilt." }],
        related: [{ id: "radio-button", description: "Bruk RadioButton når det er få alternativer og du vil at de alltid skal være synlige uten nedtrekksliste." }, { id: "autosuggest", description: "Kombiner med Autosuggest når brukeren trenger å skrive-filtrere en svært lang liste med alternativer." }],
    },

    preview: <SelectPreview />,
    example: (props) => <SelectExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "name", "placeholder", "value", "helpLabel", "errorLabel", "disabled"],
        order: ["label", "name", "placeholder", "value", "helpLabel", "errorLabel", "disabled"],
        overrides: {
            label: { defaultValue: "Velg fylke" },
            name: { defaultValue: "county-beta" },
            placeholder: { defaultValue: "Velg" },
            value: { defaultValue: "oslo" },
            helpLabel: { defaultValue: "Velg fylket du bor i." },
            errorLabel: { placeholder: "Feilmelding" },
        },
    },
    props,
};

export default doc;
