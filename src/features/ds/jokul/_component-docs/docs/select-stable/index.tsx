import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { SelectStablePreview } from "./preview";
import { SelectStableExample } from "./example";

const doc: ComponentDoc = {
    id: "select-stable",
    name: "Select",
    package: "@fremtind/jokul/select",
    category: "Skjema",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Egendefinert dropdown gir flere a11y- og fokusfeller enn native select.",
            maintenance: "Krever kontinuerlig oppfølging av tastatur- og skjermleseratferd.",
        },
    },
    description: {
        short: "Nedtrekksmenyen med egendefinert dropdown-grensesnitt.",
        long: "Select er nedtrekksmenyen med egendefinert dropdown-grensesnitt. Den tar en items-array og har sin egen SelectChangeEventHandler. En ny, forenklet variant — BETA Select — er under utvikling og vil erstatte denne over tid.",
    },
    relationships: {
        alternatives: [{ id: "select", description: "Select (BETA) er den anbefalte etterfølgeren med forbedret API; migrer når den er stabil." }],
        related: [{ id: "radio-button", description: "Bruk RadioButton når det er få alternativer og du vil at de alltid skal være synlige." }, { id: "autosuggest", description: "Kombiner med Autosuggest når brukeren trenger å søke og filtrere en lang liste med alternativer ved å skrive." }],
    },

    preview: <SelectStablePreview />,
    example: (props) => <SelectStableExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "name", "value", "defaultPrompt", "searchable", "maxShownOptions", "inline", "width", "helpLabel", "errorLabel"],
        order: ["label", "name", "value", "defaultPrompt", "searchable", "maxShownOptions", "inline", "width", "helpLabel", "errorLabel"],
        overrides: {
            label: { defaultValue: "Velg forsikring" },
            name: { defaultValue: "insurance" },
            value: { defaultValue: "home" },
            defaultPrompt: { defaultValue: "Velg forsikring" },
            maxShownOptions: { defaultValue: 5, min: 3, max: 10, step: 1 },
            width: { defaultValue: "20rem" },
            helpLabel: { defaultValue: "Velg typen som passer best." },
            errorLabel: { placeholder: "Feilmelding" },
        },
    },
    props,
    migrations,
};

export default doc;
