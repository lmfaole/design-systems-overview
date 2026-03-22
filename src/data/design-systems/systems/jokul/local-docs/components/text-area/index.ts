import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { textAreaPlayground } from "./example";
import { textAreaComponentProfile } from "./profile";
import { textAreaPropTables } from "./props";

export const textAreaDoc: DesignSystemComponentAssetDoc = {
    slug: "text-area",
    kind: "component",
    title: "TextArea",
    description: "TextArea brukes når brukeren må kunne skrive et svar eller en beskrivelse som naturlig blir flere linjer lang.",
    keywords: [
        "text area",
        "textarea",
        "flere linjer",
        "lang tekst",
        "jokul text area",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "TextArea bygger videre på Jøkul sin InputGroup-familie og deler mye av kontrakten med andre skjemafelt: label, støtte-/feiltekst og tydelig fokusmarkering.",
        "Det som skiller komponenten ut er hvordan den håndterer høyde, teller og lange svar. Lokale docs bør derfor vise nettopp disse valgene i stedet for bare et statisk textarea-eksempel.",
        "Playgrounden under lar deg styre åpnet høyde, auto-expansion, teller, verdi og feilstatus direkte.",
    ],
    example: {
        slug: "case-description",
        interactive: textAreaPlayground,
        notes: [
            "Bruk et større tekstfelt bare når brukeren faktisk trenger plass til å forklare, beskrive eller begrunne noe mer utfyllende.",
        ],
    },
    componentProfile: textAreaComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke TextArea",
            paragraphs: [
                "Bruk TextArea når svaret forventes å være mer enn én kort verdi, for eksempel en beskrivelse, begrunnelse eller fritekstmelding.",
                "Hvis brukeren bare trenger å skrive et kort svar, er TextInput enklere å skanne og raskere å fylle ut.",
            ],
            items: [
                "Velg høyde og autoExpand ut fra hvor mye tekst brukeren realistisk sett må kunne se samtidig.",
                "Vis teller bare når en faktisk grense er relevant for oppgaven eller integrasjonen bak feltet.",
                "La label og eventuell hjelpetekst forklare detaljnivået du forventer, ikke bare hva feltet heter.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Flerlinjefelt trenger like tydelig label og feilmelding som andre skjemakontroller, selv om de ofte brukes til mer ustrukturert innhold.",
                "Intern scrolling i tekstfelt kan gjøre det vanskeligere å holde oversikt over innholdet. AutoExpand eller større åpningshøyde kan være bedre når det er plass.",
            ],
            items: [
                "Koble feil- og hjelpetekst til feltet med `aria-describedby`.",
                "Pass på at tegnbegrensning forklares tidlig nok til at brukeren slipper å skrive mye som senere må kuttes.",
            ],
        },
    ],
    propTables: textAreaPropTables,
    relatedLinks: [
        {
            title: "TextInput",
            href: getJokulAssetHref("komponenter", "text-input"),
            description: "Bruk vanlig tekstfelt når svaret er kort og ikke trenger flere linjer.",
        },
        {
            title: "ErrorIcon",
            href: getJokulAssetHref("ikoner", "error"),
            description: "Feilstatus i Jøkul sine skjemafelt bygger ofte videre på samme visuelle språk som ErrorIcon.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn input-group-, text-area- og tilhørende ikonstiler før du bygger skjemaer med TextArea.",
        },
    ],
};
