import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { TextInputPreview } from "./preview";

const doc: ComponentDoc = {
    id: "text-input",
    name: "Text Input",
    package: "@fremtind/jokul/text-input",
    category: "Skjema",
    status: "stable",
    complexity: { use: "easy", maintenance: "medium" },
    description: {
        short: "TextInput er en enkeltlinjers tekstinndatafelt.",
        long: "TextInput er en enkeltlinjers tekstinndatafelt. Komponenten inkluderer label, feilmelding og hjelpetekst i ett og håndterer tilgjengelighet automatisk — label er koblet til input via htmlFor/id. Alle skjema-primitiver i Jøkul følger samme API-mønster.",
    },
    relationships: {
        related: [
            { id: "text-area", description: "Bruk TextArea for flerlinjers fritekst som kommentarer eller beskrivelser." },
            { id: "input-group", description: "Bruk InputGroup for å legge til hjelpetekst eller feilmelding — men TextInput har dette innebygget og trenger ikke InputGroup selv." },
            { id: "search", description: "Search er et spesialisert søkefelt som bygger på TextInput." },
            { id: "autosuggest", description: "Autosuggest legger til en forslagsliste på toppen av TextInput." },
            { id: "combobox", description: "Combobox kombinerer TextInput med en rullegardinliste for strukturerte valg." },
            { id: "datepicker", description: "DatePicker wrapper TextInput med et datovelger-grensesnitt." },
            { id: "button", description: "Plasser Button ved siden av TextInput for å lage et søkefelt eller en innebygd skjemahandling." },
        ],
    },
    preview: <TextInputPreview />,

    props,
    migrations
};

export default doc;
