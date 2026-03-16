import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { DatePickerPreview } from "./preview";

const doc: ComponentDoc = {
    id: "datepicker",
    name: "Date Picker",
    package: "@fremtind/jokul/datepicker",
    category: "Skjema",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Datoformat, lokalisering og tastaturnavigasjon gjør riktig bruk krevende.",
            maintenance: "Avhenger av kalenderlogikk, formatering og a11y-krav.",
        },
    },
    description: {
        short: "DatePicker er et skjemafelt for å velge en dato.",
        long: "DatePicker er et skjemafelt for å velge en dato. Den kombinerer et tekstfelt med en interaktiv kalender og validerer datoformatet automatisk.",
    },
    relationships: {
        related: [{ id: "text-input", description: "DatePicker bruker TextInput som triggerfelt for manuell datoregistrering." }, { id: "select", description: "Bruk Select for enkle måneds-/årsnedfellslister når en full kalendervelger er unødvendig." }],
    },
    preview: <DatePickerPreview />,

    props,
    migrations,
};

export default doc;
