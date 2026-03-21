import type { PatternPostContent } from "../_shared";

export const loadingStatesContent: PatternPostContent = {
    title: "Lastetilstander",
    category: "tilbakemelding",
    description: "Gi brukeren tydelig beskjed om at systemet jobber, uten å stoppe flyten mer enn nødvendig.",
    doAndDonts: {
        dos: [
            {
                title: "Vis status der ventingen oppstår",
                description: "Knytt lastetilstanden til den delen av grensesnittet som faktisk oppdateres.",
            },
            {
                title: "Hold layouten stabil",
                description: "Bruk skjelettvisning når innholdet har kjent struktur, slik at innholdet ikke hopper når det kommer inn.",
            },
            {
                title: "Tilpass styrken til ventetiden",
                description: "Start med diskret, inline status for korte laster, og eskaler til tydeligere tilbakemelding hvis ventetiden trekker ut.",
            },
        ],
        donts: [
            {
                title: "Ikke blokker hele flaten for korte laster",
                description: "Fullskjerms lasting eller tunge overlegg bryter flyten hvis brukeren kunne fortsatt å lese eller jobbe videre.",
            },
            {
                title: "Ikke bruk bare spinner",
                description: "Ren bevegelse sier lite om hva som skjer, hvor lenge det varer, eller hvilken del av siden som oppdateres.",
            },
            {
                title: "Ikke la status blinke forbi",
                description: "Hvis tilstanden er så kort at den ikke kan oppfattes, trenger du ofte ingen loader. Hvis den varer lenge nok til å merkes, trenger du tydelig tekstlig status.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Status må annonseres uten fokusflytting",
            description: "Bruk role=\"status\" eller en passende live region for korte oppdateringer, og la fokus bli der brukeren allerede arbeider.",
        },
        {
            title: "Regionen som lastes må markeres",
            description: "Sett aria-busy=\"true\" på containeren som oppdateres, slik at hjelpemidler forstår at innholdet er midlertidig uferdig.",
        },
        {
            title: "Bevegelse og farge er ikke nok alene",
            description: "Kombiner animasjon med tekstlig status, ellers blir tilstanden utydelig for skjermlesere og brukere med nedsatt syn eller kognitiv belastning.",
        },
        {
            title: "Lange laster trenger neste steg",
            description: "Hvis ventetiden trekker ut, bør brukeren få mer kontekst, mulighet til å prøve igjen, eller en annen vei videre.",
        },
    ],
    furtherReading: [
        {
            title: "Jøkul Loader",
            href: "/ds/jokul/component/loader",
            description: "Komponenten for korte lastetilstander og diskret ventestatus.",
        },
        {
            title: "Jøkul Skeleton",
            href: "/ds/jokul/component/skeleton",
            description: "Brukes for å holde layouten stabil mens innhold hentes inn.",
        },
        {
            title: "Jøkul ProgressBar",
            href: "/ds/jokul/component/progress-bar",
            description: "Bruk når du kan vise faktisk eller omtrentlig fremdrift.",
        },
        {
            title: "ARIA Live Regions",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
            description: "Forklarer hvordan statusmeldinger annonseres uten å flytte fokus.",
        },
        {
            title: "Status Messages (WCAG 4.1.3)",
            href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
            description: "Beskriver kravene til statusmeldinger som oppdateres dynamisk.",
        },
    ],
};
