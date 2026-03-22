import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { tagPlayground } from "./example";
import { tagComponentProfile } from "./profile";
import { tagPropTables } from "./props";

export const tagDoc: DesignSystemComponentAssetDoc = {
    slug: "tag",
    kind: "component",
    title: "Tag",
    description: "Tag brukes som en liten status- eller kategorimarkør som gjør det mulig å skanne lister, kort og tabeller raskt.",
    keywords: [
        "tag",
        "status",
        "label",
        "badge",
        "jokul tag",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Tag er en enkel display-komponent i Jøkul for korte statuser og kategorier. Den er liten i flaten, men viktig for oversikt når mange elementer skal skannes raskt.",
        "Lokale docs bør vise hvordan variant og tekst spiller sammen, fordi det er kombinasjonen av disse som gjør statusen forståelig i praksis.",
        "Playgrounden under lar deg veksle mellom vanlige tag-varianter og etiketter uten å introdusere unødvendig interaktiv kompleksitet.",
    ],
    example: {
        slug: "article-status",
        interactive: tagPlayground,
        notes: [
            "Hold tagtekst kort nok til at den fungerer i tette lister, tabeller og kortoppsett uten å presse layouten unødig.",
        ],
    },
    componentProfile: tagComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Tag",
            paragraphs: [
                "Bruk Tag når du trenger en kompakt markør for status, kategori eller livssyklus, og når teksten må være lett å skanne i sammenheng med annet innhold.",
                "Hvis brukeren trenger en hel melding eller tydelig neste steg, er system message eller annen rikere feedback ofte bedre enn en tag.",
            ],
            items: [
                "La taggen støtte hovedinnholdet, ikke erstatte det.",
                "Bruk samme variant og tekst konsekvent for samme status på tvers av flater.",
                "Unngå lange etiketter som gjør at taggen oppfører seg som en liten tekstblokk i stedet for en markør.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Tagger bruker ofte farge for å gi rask orientering, men meningen må også ligge i teksten for å være robust og forståelig.",
                "Hvis taggen inngår i en større kontroll, må hele kontrollen fortsatt ha et tydelig navn og riktig fokusoppførsel.",
            ],
            items: [
                "Ikke la fargen alene bære hele forskjellen mellom to statuser.",
                "Pass på at taggen ikke ser klikkbar ut hvis den bare er ment som visning.",
            ],
        },
    ],
    propTables: tagPropTables,
    relatedLinks: [
        {
            title: "WarningIcon",
            href: getJokulAssetHref("ikoner", "warning"),
            description: "Tagger med warning-tone dukker ofte opp sammen med samme statusfamilie som WarningIcon.",
        },
        {
            title: "Table",
            href: getJokulAssetHref("komponenter", "table"),
            description: "Tagger fungerer godt i tabeller når status må kunne skannes radvis uten å dominere resten av cellen.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn core- og tag-stilene før du bruker Tag i lokale oversikter og statussamlinger.",
        },
    ],
};
