import type { DesignSystemReferenceAssetDoc } from "../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../paths";

export const spacingDoc: DesignSystemReferenceAssetDoc<"token"> = {
    slug: "spacing",
    kind: "token",
    title: "Spacing",
    description: "Spacing-tokenene gir en fast rytme mellom elementer, grupper og seksjoner i Jøkul.",
    keywords: [
        "spacing",
        "space",
        "luft",
        "avstand",
        "gutter",
        "designtokens",
        "jokul spacing",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Spacing bør dokumenteres som en egen token-gruppe fordi den brukes av både komponenter, layout og mønstre. Da slipper man å gjemme grunnleggende rytmevalg inne i enkeltkomponenter.",
        "Denne pilotsiden viser både hvordan tokenene omtales som referanse, og hvordan de kan kombineres med konkrete kodeeksempler.",
        "Eksemplene viser først bruk med CSS-variabler og deretter samme gruppe brukt via SCSS-importer.",
    ],
    examples: [
        {
            slug: "css-variables",
            codeExamples: [
                {
                    label: "CSS",
                    language: "css",
                    code: `.stack > * + * {
    margin-block-start: var(--jkl-spacing-24);
}

.card {
    padding: var(--jkl-spacing-16);
}`,
                },
            ],
            notes: [
                "Bruk samme steg flere steder i samme mønster for å skape rytme.",
                "La spacing-tokenene definere avstand, ikke tilfeldige px-verdier per komponent.",
            ],
        },
        {
            slug: "scss",
            codeExamples: [
                {
                    label: "SCSS",
                    language: "scss",
                    code: `@use "@fremtind/jokul/styles/core/jkl";

.field-group {
    gap: jkl.$spacing-16;
    padding-block: jkl.$spacing-24;
}`,
                },
            ],
        },
    ],
    sections: [
        {
            id: "bruk",
            title: "Hvordan gruppen bør brukes",
            paragraphs: [
                "Spacing-tokenene bør velges som et begrenset sett steg som går igjen på tvers av skjemaer, kort og sideoppsett.",
                "Velg mindre steg for tett relaterte elementer og større steg når en ny gruppe eller et nytt tema starter.",
            ],
            items: [
                "Bruk samme spacing rundt like typer innhold.",
                "Unngå å blande tilfeldige custom-verdier med tokenene uten en tydelig grunn.",
                "Dokumenter når et mønster forventer tett, normal eller romslig rytme.",
            ],
        },
    ],
    tables: [
        {
            id: "tokens",
            title: "Vanlige spacing-tokens",
            columns: [
                { key: "token", label: "Token" },
                { key: "value", label: "Verdi" },
                { key: "usage", label: "Typisk bruk" },
            ],
            rows: [
                {
                    token: "--jkl-spacing-8",
                    value: "0.5rem",
                    usage: "Tett luft mellom små, nært beslektede elementer.",
                },
                {
                    token: "--jkl-spacing-16",
                    value: "1rem",
                    usage: "Standard innvendig padding eller avstand mellom felt og etikett.",
                },
                {
                    token: "--jkl-spacing-24",
                    value: "1.5rem",
                    usage: "Fast vertikal rytme mellom grupper i et skjema eller en kortflate.",
                },
                {
                    token: "--jkl-spacing-40",
                    value: "2.5rem",
                    usage: "Større skille mellom tydelige seksjoner på en side.",
                },
            ],
        },
    ],
    relatedLinks: [
        {
            title: "Button",
            href: getJokulAssetHref("komponenter", "button"),
            description: "Se hvordan samme spacing-gruppe støtter handlinger og skjemaoppsett rundt knapper.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Core-stilene fra monopakka må være på plass før CSS-variablene er tilgjengelige i prosjektet.",
        },
    ],
};
