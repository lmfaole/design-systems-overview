import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-organisasjonsnummer",
    name: "formatOrganisasjonsnummer",
    package: "@fremtind/jokul/utilities",
    category: "Norske identifikatorer",
    description: {
        short: "Grupperer organisasjonsnummer i tre blokker på tre sifre.",
        long: "formatOrganisasjonsnummer gjør organisasjonsnummer mer skannbare ved å dele dem i tre grupper. Den er nyttig både for visning og for inputmasking sammen med React Hook Form.",
    },
    signature: "formatOrganisasjonsnummer(input: string, options?: { partial?: boolean }): string",
    returnType: "string",
    keywords: ["orgnr", "organisasjonsnummer", "bronnoysund", "mask"],
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
            name: "ORGANISASJONSNUMMER_REGEX",
            description: "Regex-sett med `full` og `partial` variant for validering eller egen masking.",
        },
    ],
    notes: [
        "Bruk `partial: true` når formatOrganisasjonsnummer brukes som inputmaske.",
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Formatter komplett organisasjonsnummer",
            code: `
import { formatOrganisasjonsnummer } from "@fremtind/jokul/utilities";

formatOrganisasjonsnummer("123456789");
            `,
            result: "123\\u00A0456\\u00A0789",
        },
    ],
};

export default doc;
