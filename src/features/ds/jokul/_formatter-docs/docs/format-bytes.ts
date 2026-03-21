import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-bytes",
    name: "formatBytes",
    package: "@fremtind/jokul/utilities",
    category: "Tall og enheter",
    description: {
        short: "Gjør byte-størrelser lesbare som KB eller MB.",
        long: "formatBytes brukes når rå byte-verdier må vises for mennesker, for eksempel i filopplasting eller nedlastingslister. Den konverterer til KB eller MB og formatterer tallet med norsk locale.",
    },
    signature: "formatBytes(bytes: number, options?: FormatNumberOptions): string",
    returnType: "string",
    keywords: ["filesize", "kb", "mb", "bytes", "upload"],
    options: [
        {
            name: "…FormatNumberOptions",
            type: "FormatNumberOptions",
            description: "Formatteringsvalg som sendes videre til formatNumber.",
        },
    ],
    notes: [
        "Funksjonen bruker bare KB og MB. Hvis du trenger GB eller flere enheter må du bygge noe mer spesialisert.",
        "Skifter til MB ved 100000 bytes og oppover.",
    ],
    related: ["format-number"],
    examples: [
        {
            title: "Vis mindre filstørrelse i KB",
            code: `
import { formatBytes } from "@fremtind/jokul/utilities";

formatBytes(34567);
            `,
            result: "34,57\\u00A0KB",
        },
        {
            title: "Vis større filstørrelse i MB",
            code: `
import { formatBytes } from "@fremtind/jokul/utilities";

formatBytes(3456789);
            `,
            result: "3,5\\u00A0MB",
        },
    ],
};

export default doc;
