import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "parse-number",
    name: "parseNumber",
    package: "@fremtind/jokul/utilities",
    category: "Tall og enheter",
    description: {
        short: "Parser en formattert tallstreng tilbake til et Number.",
        long: "parseNumber gjør formatterte tall brukbare i kode igjen. Den tåler både komma og punktum, fjerner whitespace og bruker siste komma eller punktum som desimalskilletegn.",
    },
    signature: "parseNumber(input: string | number): number",
    returnType: "number",
    keywords: ["parse", "tallstreng", "komma", "punktum", "decimal parser"],
    notes: [
        "Nyttig når brukeren skriver inn tall som allerede er formattert for visning.",
        "Bruk denne før validering eller lagring hvis input kan inneholde mellomrom, komma eller punktum.",
    ],
    related: ["format-number", "format-valuta"],
    examples: [
        {
            title: "Les norsk formattert tall",
            code: `
import { parseNumber } from "@fremtind/jokul/utilities";

parseNumber("12 345,67");
            `,
            result: "12345.67",
        },
        {
            title: "Les engelsk formattert tall",
            code: `
import { parseNumber } from "@fremtind/jokul/utilities";

parseNumber("12,345.67");
            `,
            result: "12345.67",
        },
    ],
};

export default doc;
