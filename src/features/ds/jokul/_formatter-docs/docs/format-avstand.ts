import type { FormatterDoc } from "./types";

const doc: FormatterDoc = {
    id: "format-avstand",
    name: "formatAvstand",
    package: "@fremtind/jokul/utilities",
    category: "Tall og enheter",
    description: {
        short: "Formaterer en tallverdi som en avstand med enhet.",
        long: "formatAvstand bygger på Intl.NumberFormat med `style: \"unit\"` og gjør det enkelt å vise avstand, lengde eller hastighet med samme formattering som resten av Jøkul.",
    },
    signature: "formatAvstand(input: string | number, options?: FormatAvstandOptions): string",
    returnType: "string",
    keywords: ["distance", "unit", "km", "meter", "length"],
    options: [
        {
            name: "unit",
            type: "LengthUnit",
            description: "Lengdeenheten som formatteringen skal bruke.",
            defaultValue: '"kilometer"',
        },
        {
            name: "suffix",
            type: "string",
            description: "Ekstra tekst som legges rett etter enheten, for eksempel `/s` eller `/år`.",
        },
        {
            name: "…FormatNumberOptions",
            type: "FormatNumberOptions",
            description: "Locale og øvrige Intl-valg som styrer tall-delen av formatteringen.",
        },
    ],
    notes: [
        "Hvis du ikke trenger enhet i output, bruk formatNumber direkte i stedet.",
        "Funksjonen bruker samme tallparser som formatNumber, så både string og number støttes.",
    ],
    related: ["format-number"],
    examples: [
        {
            title: "Standard er kilometer",
            code: `
import { formatAvstand } from "@fremtind/jokul/utilities";

formatAvstand(12.5);
            `,
            result: "12,5 km",
        },
        {
            title: "Legg til annen enhet og suffix",
            code: `
import { formatAvstand } from "@fremtind/jokul/utilities";

formatAvstand(12.5, { unit: "meter", suffix: "/s", maximumFractionDigits: 1 });
            `,
            result: "12,5 m/s",
        },
    ],
};

export default doc;
