import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { descriptionListPlayground } from "./example";
import { descriptionListComponentProfile } from "./profile";
import { descriptionListPropTables, descriptionListSubcomponents } from "./props";

export const descriptionListDoc: DesignSystemComponentAssetDoc = {
    slug: "description-list",
    kind: "component",
    title: "DescriptionList",
    description: "DescriptionList viser korte nøkkel-verdi-par i en semantisk struktur som er lettere enn en tabell, men tydeligere enn løs tekst.",
    keywords: [
        "description list",
        "beskrivelsesliste",
        "key value",
        "detaljer",
        "jokul description list",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "DescriptionList passer godt når brukeren skal lese en liten samling felter og verdier uten behov for kolonnevis sammenligning.",
        "Jøkul eksporterer både selve listecontaineren og delkomponentene `DescriptionTerm` og `DescriptionDetail`, så docs-siden viser både overordnet kontrakt og de små byggesteinene.",
        "Playgrounden lar deg veksle mellom alignments og separatorer for å se hvordan samme innhold oppfører seg i ulike oppsett.",
    ],
    example: {
        slug: "system-facts",
        interactive: descriptionListPlayground,
        notes: [
            "Hold hver term kort nok til at den fungerer som etikett, ikke som en ekstra forklaringssetning.",
        ],
    },
    componentProfile: descriptionListComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke DescriptionList",
            paragraphs: [
                "Bruk DescriptionList når innholdet består av tydelige term-verdi-par og brukeren skal lese noen få felt i sammenheng.",
                "Hvis brukeren skal sammenligne mange rader eller kolonner systematisk, er tabell eller summary table ofte bedre.",
            ],
            items: [
                "Bruk samme detaljnivå på alle radene i listen.",
                "Velg vertikal layout når verdiene er lange eller skjermbredden er knapp.",
                "Legg til separatorer når listen er så lang at radene ellers flyter sammen visuelt.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Beskrivelsesliste gir hjelpemidler en tydelig semantisk kobling mellom term og verdi så lenge radene faktisk er reelle par.",
                "Ikke bruk komponenten som en generell layout-grid for vilkårlig innhold. Da blir semantikken misvisende.",
            ],
            items: [
                "Sørg for at hver term faktisk beskriver verdien som følger rett etter.",
                "Unngå å blande inn helt ulike innholdstyper i samme beskrivelsesliste hvis de ikke følger samme lesemønster.",
            ],
        },
    ],
    propTables: descriptionListPropTables,
    subcomponents: descriptionListSubcomponents,
    relatedLinks: [
        {
            title: "SummaryTable",
            href: getJokulAssetHref("komponenter", "summary-table"),
            description: "SummaryTable er bedre når oppsummeringen har tydelige totalsummer eller sterkere radstruktur.",
        },
        {
            title: "Table",
            href: getJokulAssetHref("komponenter", "table"),
            description: "Vanlige tabeller passer bedre når flere verdier må sammenlignes på tvers av kolonner.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Importer core- og description-list-stilene før du bruker komponenten i lokale oppslag.",
        },
    ],
};
