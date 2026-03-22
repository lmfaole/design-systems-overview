import type { PatternPostContent } from "../_shared";

export const skeletonWhenStructureIsKnownContent: PatternPostContent = {
    slug: "skjelettvisning",
    title: "Bruk skjelettvisning når strukturen er kjent",
    category: "tilbakemelding",
    description: "Hold layouten stabil med skjelettvisning når du kjenner strukturen før innholdet er klart.",
    doAndDonts: {
        dos: [
            {
                title: "Match den faktiske strukturen",
                description: "Skjelettet bør ligne omtrent på kortet, listen eller panelet som kommer, slik at innholdet ikke hopper når det vises.",
            },
            {
                title: "Bruk enkle plassholdere",
                description: "Hold deg til grove former og rytme. Målet er stabilitet og forventning, ikke en falsk kopi av ferdig innhold.",
            },
            {
                title: "Avslutt skjelettet så snart innholdet er klart",
                description: "Skjelettvisning er en midlertidig overgang, ikke en dekorativ tilstand som bør bli liggende.",
            },
        ],
        donts: [
            {
                title: "Ikke bruk skjelett når strukturen er ukjent",
                description: "Hvis du ikke vet hva som kommer, er en enkel statusmelding ofte tydeligere enn tilfeldige plassholdere.",
            },
            {
                title: "Ikke bygg hele siden som skjelett uten behov",
                description: "Begrens skjelettet til regionen som faktisk mangler innhold, så resten av grensesnittet fortsatt kan brukes.",
            },
            {
                title: "Ikke la animasjonen være hovedbudskapet",
                description: "Skimmer og bevegelse kan støtte, men brukeren må fortsatt forstå at innholdet lastes inn.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Marker regionen som midlertidig uferdig",
            description: 'Bruk aria-busy="true" på containeren som får nytt innhold, slik at hjelpemidler forstår at tilstanden er midlertidig.',
        },
        {
            title: "Unngå å lese opp dekorative plassholdere",
            description: "Skjelettet i seg selv gir sjelden nyttig informasjon. Sørg for at hjelpeinnholdet heller beskriver at innhold lastes.",
        },
        {
            title: "Reduser unødvendig bevegelse",
            description: "En rolig eller statisk variant er bedre enn aggressiv shimmer når brukeren er sensitiv for bevegelse.",
        },
    ],
    furtherReading: [
        {
            title: "MDN: aria-busy",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
            description: "Forklarer hvordan du markerer innhold som ikke er ferdig oppdatert ennå.",
        },
        {
            title: "WAI: Images of Text and Placeholder Content",
            href: "https://www.w3.org/WAI/tutorials/images/",
            description: "Nyttig bakgrunn når du vurderer hva som skal være dekorativt og hva som faktisk må formidles som innhold.",
        },
    ],
};
