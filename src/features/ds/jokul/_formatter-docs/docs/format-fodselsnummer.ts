import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-fodselsnummer",
    name: "formatFodselsnummer",
    package: "@fremtind/jokul/utilities",
    category: "Norske identifikatorer",
    description: {
        short: "Deler fødselsnummer i dato- og individdel med non-breaking space.",
        long: "formatFodselsnummer brukes når et fødselsnummer skal være mer lesbart i UI. Den splitter de seks første og de fem siste sifrene med et non-breaking space, og kan også brukes på delvis utfylt input.",
    },
    signature: "formatFodselsnummer(input: string, options?: { partial?: boolean }): string",
    returnType: "string",
    keywords: ["fnr", "fodselsnummer", "personnummer", "mask"],
    options: [
        {
            name: "partial",
            type: "boolean",
            description: "Tillat formattering av ufullstendig input under skriving.",
            defaultValue: "false",
        },
    ],
    relatedExports: [
        {
            name: "FODSELSNUMMER_REGEX",
            description: "Regex-sett med `full` og `partial` variant for validering eller egen masking.",
        },
    ],
    notes: [
        "Bruk `partial: true` i inputs der brukeren skriver tegn for tegn.",
        "Skilletegnet er et non-breaking space, så nummeret brytes ikke mellom gruppene.",
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Formatter komplett fødselsnummer",
            code: `
import { formatFodselsnummer } from "@fremtind/jokul/utilities";

formatFodselsnummer("01020312345");
            `,
            result: "010203\\u00A012345",
        },
        {
            title: "Formatter delvis input mens brukeren skriver",
            code: `
import { formatFodselsnummer } from "@fremtind/jokul/utilities";

formatFodselsnummer("010203123", { partial: true });
            `,
            result: "010203\\u00A0123",
        },
    ],
};

export default doc;
