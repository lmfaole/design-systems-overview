import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { checkboxPlayground } from "./example";
import { checkboxComponentProfile } from "./profile";
import { checkboxPropTables } from "./props";

export const checkboxDoc: DesignSystemComponentAssetDoc = {
    slug: "checkbox",
    kind: "component",
    title: "Checkbox",
    description: "Checkbox brukes når brukeren kan slå ett valg av og på eller kombinere flere uavhengige valg.",
    keywords: [
        "checkbox",
        "avhuking",
        "samtykke",
        "flervalg",
        "jokul checkbox",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Checkbox er Jøkul sin grunnkomponent for av/på-valg og korte flervalgssett. Bruk den når hvert valg står på egne bein og ikke utelukker de andre valgene i samme gruppe.",
        "Den lokale forhåndsvisningen følger Jøkul sin faktiske DOM-kontrakt med `jkl-checkbox`, label og underliggende `<input type=\"checkbox\">`.",
        "Playgrounden under styrer de viktigste tilstandene direkte og viser hvordan markup og React-eksempel endrer seg med dem.",
    ],
    example: {
        slug: "consent-checkbox",
        interactive: checkboxPlayground,
        notes: [
            "Bruk tydelig labeltekst som beskriver konsekvensen av å krysse av feltet.",
        ],
    },
    componentProfile: checkboxComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Checkbox",
            paragraphs: [
                "Bruk Checkbox når brukeren kan velge flere alternativer samtidig, eller når en enkelt tilstand skal kunne slås av og på.",
                "Hvis brukeren bare kan velge ett alternativ i en gruppe, er radio buttons som regel riktigere.",
            ],
            items: [
                "Gi hvert felt en label som kan forstås uten å lese hele skjemaet rundt.",
                "Hold samme rekkefølge og avstand i flervalgssett så de er lette å skanne.",
                "Unngå forhåndsavhuking når valget har konsekvenser brukeren aktivt bør ta stilling til.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Selve avhukingsboksen er liten, så labelen må være klikkbar og tydelig. Jøkul-komponenten kobler labelen til inputen via id/htmlFor-kontrakten.",
                "Når checkboxen er ugyldig, trenger brukeren en konkret forklaring på hva som mangler og hvordan feilen kan rettes.",
            ],
            items: [
                "Bruk `aria-describedby` når hjelpetekst eller feilmelding utdyper valget.",
                "Ikke bruk disabled som eneste forklaring på hvorfor noe ikke kan velges.",
            ],
        },
    ],
    propTables: checkboxPropTables,
    relatedLinks: [
        {
            title: "CheckIcon",
            href: getJokulAssetHref("ikoner", "check"),
            description: "Et gjennomgående check-ikon gjør det lettere å kjenne igjen bekreftede og avhukede tilstander på tvers av flater.",
        },
        {
            title: "TextInput",
            href: getJokulAssetHref("komponenter", "text-input"),
            description: "Bruk sammen med tekstfelt når avhukingen styrer om ekstra informasjon skal fylles ut.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn monopakka og de relevante komponentstilene før du bygger skjemaer med Jøkul.",
        },
    ],
};
