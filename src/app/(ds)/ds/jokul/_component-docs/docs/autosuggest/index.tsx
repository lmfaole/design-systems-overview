import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { AutosuggestPreview } from "./preview";
import { AutosuggestExample } from "./example";

const doc: ComponentDoc = {
    id: "autosuggest",
    name: "Autosuggest",
    package: "@fremtind/jokul/autosuggest",
    category: "Skjema",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Asynkrone forslag krever debounce, a11y og håndtering av tomme/feil-tilstander.",
            maintenance: "Må koordineres med input, liste og resultathåndtering over tid.",
        },
    },
    description: {
        short: "Tekstinputfelt som viser forslag mens brukeren skriver.",
        long: "Autosuggest er et tekstinputfelt som viser forslag mens brukeren skriver. Passer for søk og fritekstfelt med et endelig sett av gyldige valg.",
    },
    relationships: {
        related: [
            { id: "text-input", description: "Autosuggest bygger på TextInput og legger til en nedtrekksliste med forslag som utløses mens brukeren skriver." },
            { id: "combobox", description: "Combobox ligner Autosuggest, men bruker en strukturert items-liste og er bedre egnet for et fast sett av valg." },
            { id: "select", description: "Bruk Select når hele alternativlisten skal vises fra start i stedet for å filtreres av input." },
        ],
    },
    preview: <AutosuggestPreview />,
    example: (props) => <AutosuggestExample {...props} />,
    exampleControlsConfig: {
        include: [
            "label",
            "placeholder",
            "variant",
            "maxNumberOfHits",
            "showDropdownControllerButton",
            "helpLabel",
            "errorLabel",
        ],
        order: [
            "label",
            "placeholder",
            "variant",
            "maxNumberOfHits",
            "showDropdownControllerButton",
            "helpLabel",
            "errorLabel",
        ],
        overrides: {
            label: { defaultValue: "Søk etter forsikring" },
            placeholder: { defaultValue: "Begynn å skrive" },
            variant: { kind: "select", options: ["small", "medium", "large"], defaultValue: "medium" },
            maxNumberOfHits: { kind: "number", defaultValue: 5, min: 1 },
            showDropdownControllerButton: { kind: "boolean", defaultValue: false },
            helpLabel: {
                defaultValue: "Prøv for eksempel «Bilforsikring».",
                visibleWhen: { name: "errorLabel", operator: "notEquals", value: "Ingen treff" },
            },
            errorLabel: { placeholder: "Feilmelding" },
        },
    },

    props,
    migrations,
};

export default doc;
