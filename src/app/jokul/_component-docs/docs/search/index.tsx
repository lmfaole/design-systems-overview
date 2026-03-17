import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SearchPreview } from "./preview";
import { SearchExample } from "./example";

const doc: ComponentDoc = {
    id: "search",
    name: "Search Input",
    package: "@fremtind/jokul/search",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "SearchInput er et søkeinputfelt med søkeikon og valgfri label.",
        long: "SearchInput er et søkeinputfelt med søkeikon og valgfri label.",
    },
    relationships: {
        related: [{ id: "text-input", description: "Search utvider TextInput med en dedikert søkerolle og en valgfri innsendingsknapp." }, { id: "autosuggest", description: "Kombiner Search med Autosuggest for å vise direkteforslag mens brukeren skriver et søk." }],
        subcomponents: [
            { id: "search-button", description: "Frittstående søkeknapp som pares med Search-inputfeltet." },
        ],
    },
    preview: <SearchPreview />,
    example: (props) => <SearchExample {...props} />,
    exampleControlsConfig: {
        include: [
            "label",
            "placeholder",
            "icon",
            "helpLabel",
            "errorLabel",
            "labelProps.variant",
            "labelProps.srOnly",
            "disabled",
            "readOnly",
        ],
        order: [
            "label",
            "placeholder",
            "icon",
            "helpLabel",
            "errorLabel",
            "labelProps.variant",
            "labelProps.srOnly",
            "disabled",
            "readOnly",
        ],
        overrides: {
            label: { defaultValue: "Søk" },
            placeholder: { defaultValue: "Hva leter du etter?" },
            icon: { kind: "select", options: ["search", "filter_alt", "filter_list"], defaultValue: "search" },
            helpLabel: {
                defaultValue: "Søk på navn eller nummer.",
                visibleWhen: { name: "errorLabel", operator: "notEquals", value: "Søket er ugyldig" },
            },
            errorLabel: { placeholder: "Feilmelding" },
            "labelProps.variant": { kind: "select", options: ["small", "medium", "large"], defaultValue: "medium" },
            "labelProps.srOnly": { kind: "boolean", defaultValue: false },
            disabled: { kind: "boolean", defaultValue: false },
            readOnly: { kind: "boolean", defaultValue: false },
        },
    },

    props,
};

export default doc;
