import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { selectPlayground } from "./example";
import { selectComponentProfile } from "./profile";
import { selectPropTables } from "./props";

export const selectDoc: DesignSystemComponentAssetDoc = {
    slug: "select",
    kind: "component",
    title: "Select",
    description: "Select brukes når brukeren skal velge én verdi fra en kjent liste, og den native varianten er nok.",
    keywords: [
        "select",
        "native select",
        "nedtrekksliste",
        "valg",
        "jokul select",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Denne lokale siden fokuserer på `NativeSelect`, altså Jøkul sin wrapper rundt vanlig `<select>`. Det er ofte det riktige valget når listen er kort og ikke trenger søk eller ekstra interaksjonslag.",
        "Forhåndsvisningen under bruker den samme input-group- og wrapperkontrakten som Jøkul selv: `jkl-select`, `jkl-input-group` og `jkl-select__button` rundt feltet.",
        "Playgrounden viser hvordan placeholder, bredde, feilstatus og valgt verdi påvirker både markupen og React-eksempelet.",
    ],
    example: {
        slug: "native-select",
        interactive: selectPlayground,
        notes: [
            "Hold alternativene korte nok til at de kan skannes raskt uten ekstra hjelpetekst i listen.",
        ],
    },
    componentProfile: selectComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Select",
            paragraphs: [
                "Bruk Select når brukeren skal velge én verdi fra en kjent, relativt kort liste, og det er nyttig å holde alle valgene samlet i ett felt.",
                "Hvis listen er svært kort og valgene bør være synlige samtidig, kan radio buttons være lettere å sammenligne.",
            ],
            items: [
                "Sorter alternativene på en måte som gir mening for oppgaven, for eksempel naturlig rekkefølge eller forventet bruksfrekvens.",
                "Bruk placeholder eller hjelpetekst bare for å gi ekstra føring, ikke som erstatning for en tydelig label.",
                "Hold listen kort nok til at brukeren ikke må scrolle gjennom store mengder alternativer uten søk.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Native select arver mye tilgjengelighet fra nettleseren, men label, hjelpetekst og feilmelding må fortsatt være presise og koblet riktig.",
                "Når feltet er ugyldig, bør feilmeldingen forklare hvorfor brukeren må velge noe eller hva som er feil med det valget som er tatt.",
            ],
            items: [
                "Bruk `aria-describedby` når hjelpetekst eller feilmelding utdyper valget.",
                "Unngå placeholdertekst som er så vag at brukeren ikke forstår hva listen faktisk gjelder.",
            ],
        },
    ],
    propTables: selectPropTables,
    relatedLinks: [
        {
            title: "ChevronDownIcon",
            href: getJokulAssetHref("ikoner", "chevron-down"),
            description: "Select bruker chevron-retning som et viktig signal om at feltet åpner en liste med valg.",
        },
        {
            title: "TextInput",
            href: getJokulAssetHref("komponenter", "text-input"),
            description: "Bruk tekstfelt når brukeren skal skrive inn en verdi i stedet for å velge fra en forhåndsdefinert liste.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn core-, input-group- og select-stilene før du bygger lokale skjemaoppsett.",
        },
    ],
};
