import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ComboboxBasicPreview } from "./preview";

const doc: ComponentDoc = {
    id: "combobox",
    name: "Combobox",
    package: "@fremtind/jokul/combobox",
    category: "Skjema",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Krever synk mellom input, liste og tastatur-/fokus-håndtering.",
            maintenance: "Kompleks state-maskin for filtrering og valg må holdes stabil.",
        },
    },
    description: {
        short: "Flervalg-skjemaelement med søkefunksjon.",
        long: "Combobox er et flervalg-skjemaelement med søkefunksjon. Valgte elementer vises som chips og kan fjernes enkeltvis.",
    },
    relationships: {
        related: [{ id: "select", description: "Bruk Select når ingen fritekstinntasting er nødvendig og listen er liten nok til å bla gjennom." }, { id: "autosuggest", description: "Autosuggest ligner, men støtter ikke flervalg; bruk Combobox når flere verdier må velges." }],
    },
    preview: <ComboboxBasicPreview />,

    props,
};

export default doc;
