import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { cardPlayground } from "./example";
import { cardComponentProfile } from "./profile";
import { cardPropTables, cardSubcomponents } from "./props";

export const cardDoc: DesignSystemComponentAssetDoc = {
    slug: "card",
    kind: "component",
    title: "Card",
    description: "Card samler beslektet innhold i en tydelig container som kan fungere både som informasjonsflate og som samlet navigasjonsmål.",
    keywords: [
        "card",
        "kort",
        "content container",
        "oversikt",
        "jokul card",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Card er nyttig når du trenger en tydelig innholdsenhet som kan stå i lister, dashboards eller oppsummeringsflater uten å bli like tung som en full tabell.",
        "I Jøkul styres kortet i hovedsak av variant, padding og om det skal fremstå klikkbart. `CardImage` håndterer samtidig bildeplasseringen uten lokale margin-hacks.",
        "Playgrounden under viser hele den lokale kontrakten som er dokumentert her, inkludert bildeplassering fra `CardImage`.",
    ],
    example: {
        slug: "release-status-card",
        interactive: cardPlayground,
        notes: [
            "Kort er best når brukeren skal skanne flere like enheter, ikke når én flate skal bære et helt arbeidsløp alene.",
        ],
    },
    componentProfile: cardComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Card",
            paragraphs: [
                "Bruk Card når innhold, status og eventuelle handlinger hører tett sammen og bør kunne skannes som en egen enhet.",
                "Hvis brukeren trenger å sammenligne flere faste felter radvis er tabell eller beskrivelsesliste ofte tydeligere enn mange korte kort.",
            ],
            items: [
                "Hold samme struktur på like kort slik at brukeren kan skanne dem raskt.",
                "La hele kortet være klikkbart bare når hele flaten leder til samme mål.",
                "Bruk bildeplassering som støtter innholdet, ikke bare fyller luft.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Klikkbare kort må rendres som ekte interaktive elementer. Visuell klikkbarhet alene er ikke nok for tastaturbrukere og hjelpemidler.",
                "Kort med bilde trenger fortsatt tydelig tekstlig identitet. Bildet kan gi kontekst, men bør sjelden være eneste bærer av meningen.",
            ],
            items: [
                "Gi klikkbare kort et tydelig navn, spesielt når mye av teksten i kortet er sekundær informasjon.",
                "Unngå å legge lenker eller knapper inni et kort som allerede er gjort helt klikkbart.",
            ],
        },
    ],
    propTables: cardPropTables,
    subcomponents: cardSubcomponents,
    relatedLinks: [
        {
            title: "DescriptionList",
            href: getJokulAssetHref("komponenter", "description-list"),
            description: "Bruk beskrivelsesliste inne i kort når du vil vise korte nøkkel-verdi-par uten tabellstruktur.",
        },
        {
            title: "SummaryTable",
            href: getJokulAssetHref("komponenter", "summary-table"),
            description: "SummaryTable passer bedre enn Card når brukeren skal lese en kompakt oppsummering med tydelige rader.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Importer core- og card-stilene før du setter opp kort i lokale oversiktsflater.",
        },
    ],
};
