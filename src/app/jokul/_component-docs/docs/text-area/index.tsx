import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TextAreaPreview } from "./preview";

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

    props,
};

export default doc;
