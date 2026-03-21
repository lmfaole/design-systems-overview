import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { DatePickerPreview } from "./preview";
import { DatePickerExample } from "./example";

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
    example: (props) => <DatePickerExample {...props} />,
    exampleControlsConfig: {
        include: [
            "label",
            "value",
            "defaultValue",
            "placeholder",
            "helpLabel",
            "errorLabel",
            "disableBeforeDate",
            "disableAfterDate",
            "showCalendarLabel",
            "hideCalendarLabel",
            "labelProps.variant",
            "labelProps.srOnly",
        ],
        order: [
            "label",
            "value",
            "defaultValue",
            "placeholder",
            "helpLabel",
            "errorLabel",
            "disableBeforeDate",
            "disableAfterDate",
            "showCalendarLabel",
            "hideCalendarLabel",
            "labelProps.variant",
            "labelProps.srOnly",
        ],
        overrides: {
            label: { defaultValue: "Velg dato" },
            value: { defaultValue: "" },
            defaultValue: { defaultValue: "15.05.2026" },
            placeholder: { defaultValue: "dd.mm.åååå" },
            helpLabel: {
                defaultValue: "Skriv inn dato eller bruk kalenderen.",
                visibleWhen: { name: "errorLabel", operator: "notEquals", value: "Ugyldig dato" },
            },
            errorLabel: { placeholder: "Feilmelding" },
            disableBeforeDate: { placeholder: "01.01.2020" },
            disableAfterDate: { placeholder: "31.12.2030" },
            showCalendarLabel: { defaultValue: "Åpne kalender" },
            hideCalendarLabel: { defaultValue: "Lukk kalender" },
            "labelProps.variant": { kind: "select", options: ["small", "medium", "large"], defaultValue: "medium" },
            "labelProps.srOnly": { kind: "boolean", defaultValue: false },
        },
    },

    props,
    migrations,
};

export default doc;
