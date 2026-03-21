import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-telefonnummer",
    name: "formatTelefonnummer",
    package: "@fremtind/jokul/utilities",
    category: "Norske identifikatorer",
    description: {
        short: "Formaterer norske mobil- og fastnummer etter Språkrådets mønstre.",
        long: "formatTelefonnummer håndterer både mobilnummer og fasttelefonnummer. Den grupperer sifrene slik brukere forventer, og kan også legge til landkode foran nummeret.",
    },
    signature: "formatTelefonnummer(input: string, options?: FormatTelefonnummerOptions): string",
    returnType: "string",
    keywords: ["telefon", "mobil", "fasttelefon", "phone", "country code"],
    options: [
        {
            name: "partial",
            type: "boolean",
            description: "Tillat formattering av ufullstendig input under skriving.",
            defaultValue: "false",
        },
        {
            name: "countryCode",
            type: "string",
            description: "Valgfri landkode uten pluss-tegn, for eksempel `47`.",
        },
    ],
    relatedExports: [
        {
            name: "TELEFONNUMMER_REGEX",
            description: "Regex-sett for mobil, fasttelefon og partial-varianter.",
        },
    ],
    notes: [
        "Landkode legges til som egen gruppe først, for eksempel `+47 93 01 23 45`.",
        "Funksjonen kjenner bare igjen norske nummermønstre fra regexene den eksporterer.",
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Formatter mobilnummer",
            code: `
import { formatTelefonnummer } from "@fremtind/jokul/utilities";

formatTelefonnummer("93012345");
            `,
            result: "93\\u00A001\\u00A023\\u00A045",
        },
        {
            title: "Formatter fastnummer",
            code: `
import { formatTelefonnummer } from "@fremtind/jokul/utilities";

formatTelefonnummer("22334455");
            `,
            result: "22\\u00A033\\u00A044\\u00A055",
        },
        {
            title: "Legg til landkode",
            code: `
import { formatTelefonnummer } from "@fremtind/jokul/utilities";

formatTelefonnummer("93012345", { countryCode: "47" });
            `,
            result: "+47\\u00A093\\u00A001\\u00A023\\u00A045",
        },
    ],
};

export default doc;
