import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { summaryTablePlayground } from "./example";
import { summaryTableComponentProfile } from "./profile";
import { summaryTablePropTables, summaryTableSubcomponents } from "./props";

export const summaryTableDoc: DesignSystemComponentAssetDoc = {
    slug: "summary-table",
    kind: "component",
    title: "SummaryTable",
    description: "SummaryTable samler korte etikett-verdi-rader i en kompakt oppsummering som fortsatt beholder tabellsemantikken.",
    keywords: [
        "summary table",
        "oppsummering",
        "sammendrag",
        "kvittering",
        "jokul summary table",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "SummaryTable er nyttig når du vil vise et lite sammendrag av felter og verdier uten å bygge en full datatabell.",
        "Komponenten består av selve tabellen og `SummaryTableRow`, og bruker en skjult header for å beholde semantikken selv om presentasjonen er veldig kompakt.",
        "Playgrounden under viser den dokumenterte kontrakten for caption og footer, siden disse valgene ofte avgjør om oppsummeringen blir forståelig og robust.",
    ],
    example: {
        slug: "documentation-summary",
        interactive: summaryTablePlayground,
        notes: [
            "SummaryTable fungerer best når hver rad er kort, konkret og tydelig avgrenset fra totalsummen i footer.",
        ],
    },
    componentProfile: summaryTableComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke SummaryTable",
            paragraphs: [
                "Bruk SummaryTable når du trenger en lett oppsummering av noen få rader med etikett og verdi, for eksempel i kvitteringer, sammendrag og gjennomganger før innsending.",
                "Hvis brukeren må sortere, sammenligne flere kolonner eller skanne mange rader, bør du heller bruke vanlig tabell eller beskrivelsesliste.",
            ],
            items: [
                "La footer være en tydelig oppsummering, ikke bare enda en vanlig rad.",
                "Gi oppsummeringen et meningsfullt navn via caption når den ikke allerede er tydelig navngitt i konteksten.",
                "Hold både etiketter og verdier korte nok til at to-kolonneoppsettet fortsatt er lett å lese.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Selv kompakte oppsummeringer bør bruke ekte tabellmarkup når etikett og verdi faktisk opptrer som radstruktur med to kolonner.",
                "Caption og skjult header gjør at hjelpemidler får en tydelig forståelse av hva oppsummeringen gjelder og hvordan kolonnene henger sammen.",
            ],
            items: [
                "Ikke fjern captionen uten at oppsummeringen er tydelig navngitt av overskrift eller omkringliggende tekst.",
                "Unngå å bruke SummaryTable som ren visuell layout hvis innholdet ikke egentlig er tabulær oppsummering.",
            ],
        },
    ],
    propTables: summaryTablePropTables,
    subcomponents: summaryTableSubcomponents,
    relatedLinks: [
        {
            title: "DescriptionList",
            href: getJokulAssetHref("komponenter", "description-list"),
            description: "DescriptionList passer bedre når term og verdi skal leses som enkel metadata fremfor tydelig oppsummering med totalsum.",
        },
        {
            title: "Table",
            href: getJokulAssetHref("komponenter", "table"),
            description: "Table er bedre når datasettet har flere kolonner, større volum eller behov for mer tradisjonell tabelloppførsel.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Importer core- og summary-table-stilene før du bygger oppsummeringer og kvitteringsflater.",
        },
    ],
};
