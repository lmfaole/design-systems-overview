import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "extended",
        description: "Funksjonaliteten ble standard oppførsel og propen ble fjernet.",
        deprecates: { name: "extended" },
        before: `<DatePicker label="Velg dato" extended onChange={(_e, date) => setValue(date)} />`,
        after: `<DatePicker label="Velg dato" onChange={(_e, date) => setValue(date)} />`,
    },
    {
        title: "onKeyDown",
        description: "Fjernet til fordel for onChange, som nå eksponerer råstrengen via meta-argumentet.",
        deprecates: { name: "onKeyDown" },
        replacedBy: [{ name: "onChange" }],
        before: `<DatePicker
    label="Velg dato"
    onKeyDown={(e) => console.log(e.key)}
    onChange={(_e, date) => setValue(date)}
/>`,
        after: `<DatePicker
    label="Velg dato"
    onChange={(_e, date, meta) => {
        setValue(date);
        // meta.value inneholder råstrengen om du trenger den
    }}
/>`,
    },
];
