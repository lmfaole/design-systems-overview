import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { messagePlayground } from "./example";
import { messageComponentProfile } from "./profile";
import { messagePropTables, messageSubcomponents } from "./props";

export const messageDoc: DesignSystemComponentAssetDoc = {
    slug: "message",
    kind: "component",
    title: "Message",
    description: "Message viser tydelig status eller viktig informasjon i flyten uten å bryte brukeren ut i en ny side eller dialog.",
    keywords: [
        "message",
        "statusmelding",
        "alert",
        "feedback",
        "jokul message",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Message er Jøkul sin avgrensede status- og informasjonsflate for innhold som må synes tydelig, men fortsatt leve inne i den vanlige siden.",
        "Komponenten er tett knyttet til Jøkul sine statusikoner, og `FormErrorMessage` bygger videre på samme mønster for å samle skjema-feil.",
        "Playgrounden under fokuserer på den dokumenterte rotkontrakten: variant, full bredde og valgfri avvising.",
    ],
    example: {
        slug: "inline-status-message",
        interactive: messagePlayground,
        notes: [
            "Meldingen bør stå nær det området den gjelder, så brukeren ikke må lete etter hva statusen handler om.",
        ],
    },
    componentProfile: messageComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Message",
            paragraphs: [
                "Bruk Message når brukeren trenger tydelig status, forklaring eller advarsel knyttet til et bestemt område eller steg i grensesnittet.",
                "Hvis brukeren må stanse og ta stilling før noe annet kan skje, er modal eller annen mer blokkende mekanikk ofte mer riktig enn en passiv melding.",
            ],
            items: [
                "Velg variant ut fra alvorlighet og forventet respons.",
                "Hold meldingen konkret: hva har skjedd, og hva betyr det for brukeren nå?",
                "Bruk FormErrorMessage når flere feltfeil må oppsummeres samlet etter innsending.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Statusmeldinger må stå i riktig kontekst og være skrevet slik at brukeren forstår konsekvensen uten å tolke ikon eller farge alene.",
                "Hvis meldingen kan lukkes må knappen være enkel å nå med tastatur og tydelig nok for skjermlesere.",
            ],
            items: [
                "Ikke la fargen alene fortelle om meldingen er informativ, positiv eller kritisk.",
                "Unngå avvisbare meldinger når informasjonen fortsatt er nødvendig for å fullføre oppgaven.",
            ],
        },
    ],
    propTables: messagePropTables,
    subcomponents: messageSubcomponents,
    relatedLinks: [
        {
            title: "InfoIcon",
            href: getJokulAssetHref("ikoner", "info"),
            description: "Info-varianten bygger på samme ikonfamilie som resten av Jøkul sine statusflater.",
        },
        {
            title: "WarningIcon",
            href: getJokulAssetHref("ikoner", "warning"),
            description: "Warning-varianten bruker Jøkul sitt advarselsikon for å gi ekstra tyngde til meldingen.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Importer core-, icon-, webfont- og message-stilene før du bruker Message lokalt.",
        },
    ],
};
