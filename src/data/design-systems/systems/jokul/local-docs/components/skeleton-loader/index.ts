import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { skeletonLoaderPlayground } from "./example";
import { skeletonLoaderParts } from "./parts";
import { skeletonLoaderComponentProfile } from "./profile";
import { skeletonLoaderPropTables } from "./props";
import { skeletonLoaderRecipes } from "./recipes";

export const skeletonLoaderDoc: DesignSystemComponentAssetDoc = {
    slug: "skeleton-loader",
    kind: "component",
    title: "Skeleton loader",
    description: "Skeleton loader holder plassen varm mens kjent struktur venter på reelt innhold.",
    keywords: [
        "skeleton loader",
        "skeleton",
        "skjelett",
        "skjelettlaster",
        "placeholder",
        "jokul skeleton loader",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Skeleton loader er Jøkul sitt mønster for ventetilstander der layouten allerede er kjent. I stedet for en generell spinner får brukeren en plassholder som speiler den endelige strukturen.",
        "Den lokale forhåndsvisningen bruker Jøkul sine faktiske klasser fra monopakka `@fremtind/jokul` og den ekte `skeleton-loader.min.css`-fila.",
        "Playgrounden under styrer hele den dokumenterte markupkontrakten for element-, input- og table-variantene.",
    ],
    example: {
        slug: "known-layout-placeholder",
        interactive: skeletonLoaderPlayground,
        notes: [
            "Bytt ut skeletonen med ekte innhold så snart dataene er klare.",
        ],
    },
    componentProfile: skeletonLoaderComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Skeleton loader",
            paragraphs: [
                "Bruk skeleton loader når plasseringen og formen på innholdet er kjent, men dataene ikke er klare ennå.",
                "Hvis brukeren heller trenger beskjed om at et system jobber uten at layouten er bestemt, er en vanlig Loader ofte bedre.",
            ],
            items: [
                "Velg en skeleton-struktur som ligner det endelige innholdet tett nok til å sette riktig forventning.",
                "Hold skeletonen lokal til området som faktisk venter på data.",
                "Unngå store skjelettflater som ikke sier noe om hva som kommer.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Skeleton loader er dekorativ og må ikke være den eneste formidlingen av lastetilstanden.",
                "Brukeren trenger fortsatt status gjennom kontekst, overskrift, hjelpetekst eller live region dersom oppdateringen er viktig å få med seg.",
            ],
            items: [
                "Skjul den visuelle skeleton-markupen fra skjermlesere med `aria-hidden=\"true\"`.",
                "Bruk heller ekte tekst eller statusmelding rundt skeletonen enn å prøve å gjøre selve plassholderen tilgjengelig.",
            ],
        },
    ],
    relationships: [
        {
            kind: "parent",
            description: "Mønsterområdet bygges opp på nytt for å koble generelle lastetilstandsmønstre tilbake til konkrete komponentdocsider.",
            links: [
                {
                    title: "Mønster",
                    href: "/ds/mønster",
                    description: "Her ligger planen for hvordan nye mønstre skal knyttes til blant annet Skeleton loader.",
                },
            ],
        },
        {
            kind: "sibling",
            description: "Nærliggende komponenter som løser samme ventetid på andre måter.",
            links: [
                {
                    title: "Loader",
                    href: getJokulAssetHref("komponenter", "loader"),
                    description: "Bruk den vanlige loaderen når du trenger generell status i stedet for en kjent struktur.",
                },
            ],
        },
    ],
    parts: skeletonLoaderParts,
    recipes: skeletonLoaderRecipes,
    propTables: skeletonLoaderPropTables,
    relatedLinks: [
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Bruk installasjonsguiden for å hente inn Jøkul-stilene fra monopakka.",
        },
    ],
};
