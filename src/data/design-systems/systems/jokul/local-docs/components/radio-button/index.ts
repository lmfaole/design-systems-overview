import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { radioButtonPlayground } from "./example";
import { radioButtonComponentProfile } from "./profile";
import { radioButtonPropTables, radioButtonSubcomponents } from "./props";

export const radioButtonDoc: DesignSystemComponentAssetDoc = {
    slug: "radio-button",
    kind: "component",
    title: "RadioButtonGroup",
    description: "RadioButtonGroup brukes når brukeren må velge nøyaktig ett alternativ i en liten, tydelig gruppe.",
    keywords: [
        "radio button",
        "radio group",
        "enkeltvalg",
        "fieldset",
        "jokul radio button",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Denne docs-siden dekker både `RadioButtonGroup` og `RadioButton`, fordi de nesten alltid brukes sammen. Gruppen eier legend, validering og felles navn, mens hvert enkelt alternativ eier etikett og egen verdi.",
        "Den lokale forhåndsvisningen følger Jøkul sin faktiske DOM-kontrakt med `fieldset`, `legend`, `jkl-radio-button` og underliggende `<input type=\"radio\">`.",
        "Playgrounden lar deg styre valgt verdi, inline-oppsett, ugyldig tilstand og et deaktivert alternativ direkte.",
    ],
    example: {
        slug: "receipt-delivery",
        interactive: radioButtonPlayground,
        notes: [
            "Hold antall alternativer lavt nok til at brukeren faktisk kan sammenligne dem uten ekstra skjuling eller søk.",
        ],
    },
    componentProfile: radioButtonComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke RadioButtonGroup",
            paragraphs: [
                "Bruk radio buttons når brukeren må velge ett, og bare ett, alternativ fra en kjent gruppe.",
                "Hvis brukeren kan velge flere alternativer samtidig, er checkboxer som regel riktigere. Hvis alternativene blir mange, er select ofte mer håndterlig.",
            ],
            items: [
                "Gi gruppen en tydelig legend som beskriver spørsmålet alternativene svarer på.",
                "Sorter alternativene i en rekkefølge som støtter oppgaven, for eksempel mest sannsynlige valg først.",
                "Bruk inline bare når etikettene er korte og ikke mister skannbarhet side om side.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Legend og label må til sammen gi nok kontekst til at skjermlesere kan forstå både spørsmålet og de enkelte svaralternativene.",
                "Når gruppen er ugyldig, bør feilmeldingen peke på hele gruppen, ikke bare ett av alternativene.",
            ],
            items: [
                "La piltaster flytte valgt alternativ innen gruppen uten å bryte forventet tastaturnavigasjon.",
                "Ikke bruk disabled alternativer uten forklaring når brukeren kan forvente at valget finnes.",
            ],
        },
    ],
    propTables: radioButtonPropTables,
    subcomponents: radioButtonSubcomponents,
    relatedLinks: [
        {
            title: "Checkbox",
            href: getJokulAssetHref("komponenter", "checkbox"),
            description: "Bruk checkbox når valgene ikke utelukker hverandre og brukeren kan krysse av flere samtidig.",
        },
        {
            title: "Select",
            href: getJokulAssetHref("komponenter", "select"),
            description: "Bruk select når ett valg fortsatt skal tas, men listen er lang nok til at radio buttons blir tung å skanne.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn core-, input-group- og radio-button-stilene før du bygger skjemaflater med Jøkul.",
        },
    ],
};
