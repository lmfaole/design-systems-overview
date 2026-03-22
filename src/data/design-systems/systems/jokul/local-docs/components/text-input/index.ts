import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { textInputPlayground } from "./example";
import { textInputComponentProfile } from "./profile";
import { textInputPropTables } from "./props";

export const textInputDoc: DesignSystemComponentAssetDoc = {
    slug: "text-input",
    kind: "component",
    title: "TextInput",
    description: "TextInput brukes for korte tekstverdier og tallignende felt der brukeren trenger tydelig label, støtte og feilmelding.",
    keywords: [
        "text input",
        "tekstfelt",
        "beløp",
        "input",
        "jokul text input",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "TextInput er Jøkul sitt standardfelt for korte tekstverdier. Komponenten kombinerer inputfeltet med InputGroup-kontrakten for label, hjelpetekst og feilstatus.",
        "Den lokale forhåndsvisningen bruker samme wrapper- og klassekontrakt som Jøkul selv: `jkl-input-group`, `jkl-text-input` og de tilhørende støtteklassene rundt feltet.",
        "Playgrounden under viser hvordan feltet endrer seg når du bytter justering, enhet, feilstatus og om feltet er forhåndsutfylt.",
    ],
    example: {
        slug: "amount-input",
        interactive: textInputPlayground,
        notes: [
            "Velg riktig inputtype og støttetekst når format eller forventet verdi ikke er åpenbar.",
        ],
    },
    componentProfile: textInputComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke TextInput",
            paragraphs: [
                "Bruk TextInput for korte tekstfelt som navn, referanser, beløp eller andre enkle verdier som får plass på én linje.",
                "Hvis brukeren skal skrive lengre fritekst, er TextArea ofte et bedre valg fordi det gir mer plass og riktigere forventning.",
            ],
            items: [
                "Bruk tydelig label og eventuelt hjelpetekst når formatet ikke er åpenbart.",
                "Vis enhet i feltet bare når den tilfører informasjon brukeren ellers måtte gjettet seg til.",
                "Hold samme bredde og rytme mellom relaterte felt i samme skjemaområde.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Tekstfeltet må alltid ha et tilgjengelig navn. I Jøkul håndteres dette gjennom InputGroup, men labelteksten må fortsatt være konkret og forståelig.",
                "Når feltet er ugyldig, må feilmeldingen forklare både hva som er feil og hvordan brukeren kan rette det.",
            ],
            items: [
                "Bruk `aria-describedby` til å koble feltet til hjelpetekst eller feilmelding når det trengs.",
                "Ikke stol på placeholder alene for å formidle viktig informasjon om feltet.",
            ],
        },
    ],
    propTables: textInputPropTables,
    relatedLinks: [
        {
            title: "ErrorIcon",
            href: getJokulAssetHref("ikoner", "error"),
            description: "Feilstatus i TextInput blir tydeligere når ikon og tekst støtter hverandre uten å konkurrere.",
        },
        {
            title: "Select",
            href: getJokulAssetHref("komponenter", "select"),
            description: "Bruk select når brukeren skal velge én verdi fra en kjent liste i stedet for å skrive fritt.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Hent inn core-, input-group- og text-input-stilene før du bygger lokale skjemaoppsett.",
        },
    ],
};
