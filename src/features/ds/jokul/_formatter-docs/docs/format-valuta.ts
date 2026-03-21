import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-valuta",
    name: "formatValuta",
    package: "@fremtind/jokul/utilities",
    category: "Tall og enheter",
    description: {
        short: "Formaterer beløp med norsk tallformat og valutasuffiks.",
        long: "formatValuta er standardvalget når du skal vise kroner og øre i Jøkul. Den formaterer tallet med norsk locale, bruker `kr` som standard og holder to desimaler når input ikke er et heltall.",
    },
    signature: "formatValuta(input: string | number, options?: FormatValutaOptions): string",
    returnType: "string",
    keywords: ["currency", "belop", "kr", "nok", "money"],
    options: [
        {
            name: "prefix",
            type: "string",
            description: "Valgfritt prefiks som vises foran beløpet.",
        },
        {
            name: "suffix",
            type: "string",
            description: "Valgfritt suffiks. Send inn tom streng for å fjerne `kr` helt.",
            defaultValue: '"kr"',
        },
        {
            name: "…FormatNumberOptions",
            type: "FormatNumberOptions",
            description: "Locale og øvrige Intl-valg som videresendes til tallformatteringen.",
        },
    ],
    notes: [
        "Heltall vises uten desimaler. Så snart input har desimaler, låses formatteringen til to desimaler.",
        "Bruk `suffix: \"\"` hvis du trenger et rent beløp uten valuta, men normalt er formatNumber et bedre valg da.",
    ],
    related: ["format-number", "parse-number"],
    examples: [
        {
            title: "Formatter heltall som kroner",
            code: `
import { formatValuta } from "@fremtind/jokul/utilities";

formatValuta(12345);
            `,
            result: "12\\u00A0345\\u00A0kr",
        },
        {
            title: "Behold to desimaler for øre",
            code: `
import { formatValuta } from "@fremtind/jokul/utilities";

formatValuta(12345.5);
            `,
            result: "12\\u00A0345,50\\u00A0kr",
        },
        {
            title: "Vis prefiks uten valutasuffiks",
            code: `
import { formatValuta } from "@fremtind/jokul/utilities";

formatValuta(12345.5, { prefix: "ca.", suffix: "" });
            `,
            result: "ca.\\u00A012\\u00A0345,50",
        },
    ],
};

export default doc;
