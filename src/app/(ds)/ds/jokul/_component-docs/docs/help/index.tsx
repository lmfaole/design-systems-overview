import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { HelpPreview } from "./preview";

const doc: ComponentDoc = {
    id: "help",
    name: "Help",
    package: "@fremtind/jokul/help",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Viser en liten knapp som åpner en flytende hjelpetekst i et popover.",
        long: "Help viser en liten ?-knapp som åpner en flytende hjelpetekst i et popover. Brukes til å gi kontekstuell hjelp ved skjemafelt uten å ta opp permanent plass i grensesnittet.",
    },
    preview: <HelpPreview />,

    relationships: {
        related: [{ id: "tooltip", description: "Tooltip viser et kort ikke-interaktivt hint; Help gir et avvisbart panel med fyldigere veiledningstekst." }, { id: "popover", description: "Help er bygget på Popover og deler det samme flytende posisjoneringssystemet." }, { id: "input-group", description: "Fest Help til en InputGroup for å gi kontekstuell veiledning uten å rote til feltets etikett." }],
    },
    props,
    migrations,
};

export default doc;
