import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-kontonummer",
    name: "formatKontonummer",
    package: "@fremtind/jokul/utilities",
    category: "Norske identifikatorer",
    description: {
        short: "Formaterer kontonummer som `1234 56 78901` eller med valgfri separator.",
        long: "formatKontonummer er laget for norske kontonumre og deler verdien i 4-2-5. Den kan både brukes for ren visning og som inputmaske, og lar deg bytte ut mellomrommet med egen separator.",
    },
    signature: "formatKontonummer(input: string, options?: { partial?: boolean; separator?: string }): string",
    returnType: "string",
    keywords: ["kontonummer", "bankkonto", "account number", "mask"],
    options: [
        {
            name: "partial",
            type: "boolean",
            description: "Tillat formattering av ufullstendig input under skriving.",
            defaultValue: "false",
        },
        {
            name: "separator",
            type: "string",
            description: "Eget skilletegn mellom gruppene.",
            defaultValue: '"\\u00A0"',
        },
    ],
    relatedExports: [
        {
            name: "KONTONUMMER_REGEX",
            description: "Regex-sett med `full` og `partial` variant for validering eller masking.",
        },
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Standard med non-breaking space",
            code: `
import { formatKontonummer } from "@fremtind/jokul/utilities";

formatKontonummer("86011117947");
            `,
            result: "8601\\u00A011\\u00A017947",
        },
        {
            title: "Bruk punktum som separator",
            code: `
import { formatKontonummer } from "@fremtind/jokul/utilities";

formatKontonummer("86011117947", { separator: "." });
            `,
            result: "8601.11.17947",
        },
    ],
};

export default doc;
