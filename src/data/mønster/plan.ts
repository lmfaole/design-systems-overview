export interface PatternRestartPlanLink {
    title: string;
    href: `/${string}`;
    description: string;
}

export interface PatternRestartPlanSubsection {
    id: string;
    title: string;
    paragraphs?: string[];
    items?: string[];
    orderedItems?: string[];
    links?: PatternRestartPlanLink[];
}

export interface PatternRestartPlanSection {
    id: string;
    title: string;
    paragraphs: string[];
    subsections?: PatternRestartPlanSubsection[];
}

export interface PatternRestartPlan {
    title: string;
    description: string;
    intro: string[];
    sections: PatternRestartPlanSection[];
}

export const patternRestartPlan: PatternRestartPlan = {
    title: "Mønster",
    description: "Mønsterdataene er nullstilt. Denne siden beskriver hvordan nye mønstre skal kobles til komponenter, tokens, søk og navigasjon uten å duplisere samme informasjon flere steder.",
    intro: [
        "De gamle mønstersidene er fjernet for å starte på nytt med en mindre og tydeligere datamodell.",
        "Neste versjon skal bygge ett felles register for mønstre og la søk, sitemap, brødsmuler og komponentbacklinks avledes fra samme kjerne i stedet for fra parallelle lister.",
    ],
    sections: [
        {
            id: "grunnmodell",
            title: "Grunnmodell for nye mønstre",
            paragraphs: [
                "Hvert mønster bør beskrive én konkret situasjon. Brede samleposter gjør det vanskelig å vite hvilken side som skal lenkes fra komponentdokumentasjon, søk og relaterte mønstre.",
                "Et nytt mønsterregister bør derfor starte med små sammendragsposter og bare utvide til full detaljside når mønsteret faktisk er klart til å publiseres.",
            ],
            subsections: [
                {
                    id: "grunnmodell-register",
                    title: "Felles register",
                    items: [
                        "Én oppføring per mønster med slug, tittel, beskrivelse, søkeord og status.",
                        "Én eksplisitt liste over relaterte lokale docsider, for eksempel komponenter og tokens under /ds/jokul.",
                        "Ingen manuelt vedlikeholdte duplikater av titler eller href-er i søk, sitemap eller testdata.",
                    ],
                },
                {
                    id: "grunnmodell-detalj",
                    title: "Detaljinnhold",
                    items: [
                        "Når et mønster publiseres, bør detaljinnholdet deles opp etter bruk, tilgjengelighet, implementasjon og videre lesning.",
                        "Detaljsiden bør lese slug, tittel og relasjoner fra registeret og bare eie selve innholdet.",
                        "Dette gjør det mulig å legge tilbake mønstre én etter én uten å gjeninnføre et stort sentralt postkartotek.",
                    ],
                },
            ],
        },
        {
            id: "koblinger",
            title: "Hvordan mønstre kobles til annen data",
            paragraphs: [
                "Mønsterregisteret bør peke til de lokale docsidene som mønsteret forklarer eller utfyller. Samme kobling kan deretter brukes begge veier.",
                "Da kan komponentsider få tilbakekoblinger til relevante mønstre, og mønstersider kan vise hvilke konkrete komponenter og tokens som er aktuelle i samme kontekst.",
            ],
            subsections: [
                {
                    id: "koblinger-designsystem",
                    title: "Eksisterende designsystemdata å koble mot",
                    links: [
                        {
                            title: "Jøkul Skeleton loader",
                            href: "/ds/jokul/komponenter/skeleton-loader",
                            description: "Komponentsiden som bør få backlink når et nytt skjelettmønster kommer tilbake.",
                        },
                        {
                            title: "Jøkul Table",
                            href: "/ds/jokul/komponenter/table",
                            description: "Et godt eksempel på en sammensatt komponent som vil trenge presise mønsterkoblinger.",
                        },
                        {
                            title: "Jøkul Spacing",
                            href: "/ds/jokul/tokens/spacing",
                            description: "Token-dokumentasjon som kan refereres fra mønstre når layout og luft er en del av anbefalingen.",
                        },
                    ],
                },
                {
                    id: "koblinger-avledet",
                    title: "Avledede flater",
                    links: [
                        {
                            title: "Designsystemsøk",
                            href: "/ds/søk",
                            description: "Søkeindeksen bør lese mønstersammendragene direkte, ikke en egen håndskrevet mønsterliste.",
                        },
                        {
                            title: "HTML-sitemap",
                            href: "/sitemap",
                            description: "Sitemap skal hente mønsterruter fra samme register som selve mønstersidene bruker.",
                        },
                    ],
                },
            ],
        },
        {
            id: "innforing",
            title: "Foreslått innføringsrekkefølge",
            paragraphs: [
                "Neste leveranse bør være liten nok til at kontrakten faktisk blir brukt og testet før mange mønstre legges inn igjen.",
            ],
            subsections: [
                {
                    id: "innforing-neste-steg",
                    title: "Neste steg",
                    orderedItems: [
                        "Definer ett lite mønstersammendrag i registeret med relaterte docsider og søkeord.",
                        "Bygg én detaljside som leser kjernefelt fra registeret og resten fra en egen detaljmodul.",
                        "Avled search docs, sitemap-paths og komponentbacklinks fra samme register.",
                        "Legg til ett nytt konkret mønster og verifiser at koblingene dukker opp på både mønstersiden og relevante komponentsider.",
                    ],
                },
            ],
        },
    ],
};
