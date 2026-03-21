import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-kortnummer",
    name: "formatKortnummer",
    package: "@fremtind/jokul/utilities",
    category: "Norske identifikatorer",
    description: {
        short: "Deler kortnummer i grupper på fire sifre.",
        long: "formatKortnummer gjør lange kortnumre enklere å lese ved å dele dem opp i fire-sifrede blokker. Den kan også brukes med `partial: true` når nummeret skrives inn i et skjema.",
    },
    signature: "formatKortnummer(input: string, options?: { partial?: boolean }): string",
    returnType: "string",
    keywords: ["kortnummer", "card number", "credit card", "mask"],
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
            name: "KORTNUMMER_REGEX",
            description: "Regex-sett med `full` og `partial` variant for validering eller masking.",
        },
    ],
    related: ["register-with-masks"],
    examples: [
        {
            title: "Formatter kortnummer i fireblokker",
            code: `
import { formatKortnummer } from "@fremtind/jokul/utilities";

formatKortnummer("4242424242424242");
            `,
            result: "4242\\u00A04242\\u00A04242\\u00A04242",
        },
    ],
};

export default doc;
