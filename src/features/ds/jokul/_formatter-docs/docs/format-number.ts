import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-number",
    name: "formatNumber",
    package: "@fremtind/jokul/utilities",
    category: "Tall og enheter",
    description: {
        short: "Formaterer tall med locale og valgfri Intl-konfigurasjon.",
        long: "formatNumber er grunnmuren for de fleste tallformatteringene i Jøkul. Den tar et tall eller en tallstreng, parser verdien og sender resten av opsjonene videre til Intl.NumberFormat.",
    },
    signature: "formatNumber(input: string | number, options?: FormatNumberOptions): string",
    returnType: "string",
    keywords: ["intl", "locale", "numberformat", "desimaltall", "thousand separator"],
    options: [
        {
            name: "locale",
            type: "string",
            description: "Hvilken locale som brukes ved formattering av tallet.",
            defaultValue: '"no-NB"',
        },
        {
            name: "…Intl.NumberFormatOptions",
            type: "Intl.NumberFormatOptions",
            description: "Alle øvrige valg sendes rett videre til Intl.NumberFormat.",
        },
    ],
    notes: [
        "Bruk denne når du trenger ren tallformattering uten enhet eller valutasuffiks.",
        "formatValuta og formatAvstand bygger videre på samme grunnidé, men legger til suffix eller enhet.",
    ],
    related: ["parse-number", "format-valuta", "format-avstand"],
    examples: [
        {
            title: "Standard norsk formattering",
            code: `
import { formatNumber } from "@fremtind/jokul/utilities";

formatNumber(12345.67);
            `,
            result: "12\\u00A0345,67",
        },
        {
            title: "Bytt locale og avrund",
            code: `
import { formatNumber } from "@fremtind/jokul/utilities";

formatNumber(12345.67, { locale: "en-GB", maximumFractionDigits: 1 });
            `,
            result: "12,345.7",
        },
    ],
};

export default doc;
