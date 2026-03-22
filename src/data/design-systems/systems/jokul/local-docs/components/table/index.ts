import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { tablePlayground } from "./example";
import { tableParts } from "./parts";
import { tableComponentProfile } from "./profile";
import { tablePropTables } from "./props";
import { tableRecipes } from "./recipes";
import { tableSubcomponents } from "./subcomponents";

export const tableDoc: DesignSystemComponentAssetDoc = {
    slug: "table",
    kind: "component",
    title: "Table",
    description: "Table brukes når strukturerte data må kunne sammenlignes radvis uten å miste semantikken i markupen.",
    keywords: [
        "table",
        "tabell",
        "data table",
        "responsive table",
        "jokul table",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Table i Jøkul er en sammensatt komponent med tydelige deler: caption, head, headerceller, rader og dataceller.",
        "Siden komponenten ofte brukes med store datamengder og på små skjermer, må docs vise både delene, de gyldige komposisjonene og de viktigste responsivitetshensynene.",
        "Eksemplet under bruker ekte Jøkul-klasser og CSS fra monopakka `@fremtind/jokul`.",
    ],
    example: {
        slug: "orders-overview",
        interactive: tablePlayground,
        notes: [
            "Hold kolonneoverskriftene korte og konsekvente så de fungerer både i vanlig tabell og i listevisning.",
        ],
    },
    componentProfile: tableComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Table",
            paragraphs: [
                "Bruk Table når brukeren trenger å skanne og sammenligne verdier på tvers av rader og kolonner.",
                "Hvis innholdet egentlig er en liste med få felter eller en enkel oppsummering, er det ofte bedre å bruke kort, liste eller beskrivelsesliste i stedet.",
            ],
            items: [
                "Gi tabellen en tydelig caption som beskriver hva datasettet inneholder.",
                "Hold samme type data i samme kolonne gjennom hele tabellen.",
                "Tenk gjennom hvordan tabellen skal fungere på små skjermer før du legger til mange kolonner.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Semantisk tabellmarkup er avgjørende for at skjermlesere skal kunne lese sammenhengen mellom header og celle riktig.",
                "Når tabellen kan brytes ned til listevisning må hver datacelle fortsatt fortelle hvilken kolonne den tilhører.",
            ],
            items: [
                "Bruk riktige `scope`-verdier på headerceller.",
                "Legg til `data-th` på hver celle når du bruker `collapseToList`.",
                "Skjul ikke caption visuelt uten at tabellen er tydelig navngitt et annet sted i konteksten.",
            ],
        },
    ],
    parts: tableParts,
    recipes: tableRecipes,
    subcomponents: tableSubcomponents,
    propTables: tablePropTables,
    relatedLinks: [
        {
            title: "Spacing",
            href: getJokulAssetHref("tokens", "spacing"),
            description: "Spacing-tokenene påvirker rytmen mellom celler, tabellseksjoner og omkringliggende filtre.",
        },
        {
            title: "Skeleton loader",
            href: getJokulAssetHref("komponenter", "skeleton-loader"),
            description: "Bruk skeleton loader når tabellstrukturen er kjent, men dataene lastes inn.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Monopakka og komponentstilene må være på plass før tabellen vises riktig.",
        },
    ],
};
