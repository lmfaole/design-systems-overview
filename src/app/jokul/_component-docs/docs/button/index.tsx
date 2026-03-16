import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { ButtonPreview } from "./preview";
import { ButtonExample } from "./example";

const doc: ComponentDoc = {
    id: "button",
    name: "Button",
    package: "@fremtind/jokul/button",
    category: "Handling",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Brukes til å utløse handlinger.",
        long: "Button brukes til å utløse handlinger. Knapper er det primære interaksjonselementet og skal alltid kommunisere hva som skjer når brukeren trykker på dem. Velg variant basert på handlingens prioritet — bruk én primary-knapp per kontekst og reserver ghost for lavprioriterte handlinger.",
    },
    relationships: {
        related: [
            { id: "text-input", description: "Plasser Button ved siden av TextInput for å sende inn et skjema eller utløse en søkehandling." },
            { id: "toggle-switch", description: "Bruk ToggleSwitch i stedet for Button når handlingen er en vedvarende binær innstilling fremfor en engangshendelse." },
            { id: "icon", description: "Legg til Icon inne i Button for å forsterke handlingen med et visuelt symbol ved siden av etiketten." },
        ],
    },

    preview: <ButtonPreview />,
    example: (props) => <ButtonExample {...props} />,
    exampleControls: [
        { name: "variant", options: ["primary", "secondary", "ghost"], defaultValue: "primary" },
        { name: "icon", options: ["false", "true"], defaultValue: "false" },
        { name: "iconPosition", options: ["left", "right"], defaultValue: "left" },
        { name: "disabled", options: ["false", "true"], defaultValue: "false" },
        { name: "loader", options: ["false", "true"], defaultValue: "false" },
    ],
    props,
    migrations
};

export default doc;
