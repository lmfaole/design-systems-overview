import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { buttonPlayground } from "./example";
import { buttonComponentProfile } from "./profile";
import { buttonDeprecatedPropMigrations, buttonPropTables } from "./props";

export const buttonDoc: DesignSystemComponentAssetDoc = {
    slug: "button",
    kind: "component",
    title: "Button",
    description: "Button brukes til en tydelig handling og bør reserveres for neste steg brukeren faktisk kan ta.",
    keywords: [
        "button",
        "knapp",
        "primær handling",
        "sekundær handling",
        "disabled",
        "jokul button",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Button er en grunnleggende handlingskomponent i Jøkul. Start med én tydelig primærhandling per område, og flytt mindre viktige valg ned i hierarkiet.",
        "Forhåndsvisningen bruker Jøkul sin faktiske CSS fra monopakka `@fremtind/jokul`, og HTML-en følger den samme klassekontrakten som stilpakkene forventer.",
        "Eksemplet under er den primære playgrounden for Button og lar deg styre de Jøkul-definerte propsene direkte.",
        "Hendelsesloggen under playgrounden viser hvilke native events komponenten faktisk fyrer mens du bruker forhåndsvisningen.",
    ],
    example: {
        slug: "primary-action",
        interactive: buttonPlayground,
        notes: [
            "Hold knappeetiketten kort og handlingsorientert.",
            "Bruk én tydelig primærknapp per område når det er mulig.",
        ],
    },
    componentProfile: buttonComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Button",
            paragraphs: [
                "Bruk Button for eksplisitte handlinger som sender inn et skjema, bekrefter et valg eller åpner et neste steg i en arbeidsflyt.",
                "Bruk lenker for navigasjon til en ny side eller et nytt dokument. Når elementet faktisk navigerer, bør det ikke presenteres som en knapp.",
            ],
            items: [
                "Sett den viktigste handlingen først i leserekkefølgen.",
                "Skill mellom primære og sekundære handlinger i både tekst og hierarki.",
                "Ikke la flere like sterke handlinger konkurrere i samme område uten en tydelig prioritet.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Knappen må alltid ha et tilgjengelig navn. Synlig tekst er som regel det enkleste og beste valget.",
                "Unngå å bruke kun ikon dersom handlingen ikke er helt standardisert. Da trenger brukeren vanligvis en synlig tekst eller en separat label.",
            ],
            items: [
                "Pass på at label beskriver handlingen, ikke bare objektet.",
                "Bruk `type=\"submit\"` når knappen faktisk sender inn et skjema.",
                "Ikke bruk `disabled` som eneste feilmelding eller veiledning.",
            ],
        },
    ],
    propTables: buttonPropTables,
    deprecatedPropMigrations: buttonDeprecatedPropMigrations,
    relatedLinks: [
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Start her for å hente inn monopakka og de relevante Jøkul-stilene i prosjektet.",
        },
        {
            title: "Spacing",
            href: getJokulAssetHref("tokens", "spacing"),
            description: "Spacing-tokenene hjelper deg å holde samme rytme rundt og inni knapper og skjemaområder.",
        },
    ],
};
