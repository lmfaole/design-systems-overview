import type { DesignSystemComponentAssetDoc } from "../../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../../paths";
import { loaderPlayground } from "./example";
import { loaderComponentProfile } from "./profile";
import { loaderPropTables } from "./props";

export const loaderDoc: DesignSystemComponentAssetDoc = {
    slug: "loader",
    kind: "component",
    title: "Loader",
    description: "Loader viser at systemet jobber videre og bør alltid brukes sammen med tydelig status- eller konteksttekst.",
    keywords: [
        "loader",
        "spinner",
        "lasting",
        "status",
        "jokul loader",
    ],
    packageName: "@fremtind/jokul",
    installGuideSlug: "react-og-core",
    intro: [
        "Loader er Jøkul sin visuelle indikator for pågående arbeid. Bruk den når brukeren må vente på at systemet henter eller sender data, men bare når tilstanden ikke kan beskrives bedre med konkret fremdrift.",
        "Siden Jøkul nå leveres via monopakka `@fremtind/jokul`, dokumenterer props-tabellene markupkontrakten: klassemodifikatorer, HTML-attributter og ARIA som styrer hvordan loaderen brukes.",
        "Playgrounden under lar deg styre hele den dokumenterte kontrakten direkte og viser både oppdatert forhåndsvisning og HTML-kode.",
    ],
    example: {
        slug: "status-loader",
        interactive: loaderPlayground,
        notes: [
            "Loaderen er selve animasjonen. Den omkringliggende teksten eller live regionen må formidle hva som faktisk skjer.",
        ],
    },
    componentProfile: loaderComponentProfile,
    sections: [
        {
            id: "bruk",
            title: "Når du skal bruke Loader",
            paragraphs: [
                "Bruk Loader når systemet jobber videre, men brukeren ikke får en mer presis fremdriftsindikator som prosent, steg eller skjelettvisning.",
                "Velg heller skjelettvisning når strukturen er kjent og du vil beholde sideoppsettet mens innholdet lastes inn.",
            ],
            items: [
                "Knyt loaderen til konkret tekst som beskriver hva som skjer.",
                "Fjern loaderen så snart innholdet er klart eller handlingen er fullført.",
                "Unngå å vise flere like store loadere samtidig uten tydelig avgrensning av hvilket område som oppdateres.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Loaderen alene formidler ikke nok informasjon for skjermlesere. Kombiner derfor alltid animasjonen med status- eller hjelpetekst.",
                "Når området oppdateres dynamisk, bør statusen bo i et område med `role=\"status\"` eller tilsvarende live-region.",
            ],
            items: [
                "Skjul bare selve animasjonen med `aria-hidden=\"true\"`, ikke statusmeldingen.",
                "Unngå å la en loader spinne lenge uten ny informasjon eller endring i grensesnittet.",
            ],
        },
    ],
    propTables: loaderPropTables,
    tables: [
        {
            id: "css-klasser",
            title: "CSS-klasser",
            description: "Loaderen styres via en liten klassekontrakt for størrelse og plassering.",
            columns: [
                { key: "name", label: "Klasse" },
                { key: "purpose", label: "Formål" },
            ],
            rows: [
                {
                    name: ".jkl-loader",
                    purpose: "Basisklassen for loader-markupen.",
                },
                {
                    name: ".jkl-loader--inline",
                    purpose: "Brukes når loaderen skal flyte med tekst eller andre inline-elementer.",
                },
                {
                    name: ".jkl-loader--medium",
                    purpose: "Gir en tydelig mellomstor variant som passer i egne statusområder.",
                },
                {
                    name: ".jkl-loader--small",
                    purpose: "Kompakt variant for trange områder.",
                },
                {
                    name: ".jkl-loader__dot",
                    purpose: "Animerte prikker som bygger selve loaderen.",
                },
            ],
        },
    ],
    relatedLinks: [
        {
            title: "Button",
            href: getJokulAssetHref("komponenter", "button"),
            description: "Se hvordan loaderen kan kombineres med knapper for innsendings- og ventetilstander.",
        },
        {
            title: "Installer Jøkul",
            href: getJokulInstallGuideHref("react-og-core"),
            description: "Bruk installasjonsguiden for å hente inn core og komponentstiler fra monopakka.",
        },
    ],
};
