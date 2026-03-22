import type { PatternPostContent } from "../_shared";

export const statusInUpdatedRegionContent: PatternPostContent = {
    slug: "status-i-oppdatert-region",
    title: "Vis status i regionen som oppdateres",
    category: "tilbakemelding",
    description: "Vis en lokal lastestatus i delen av grensesnittet som oppdateres, i stedet for å blokkere hele siden.",
    doAndDonts: {
        dos: [
            {
                title: "Legg statusen tett på innholdet som endres",
                description: "Brukeren skal se hvilken del av flaten som jobber, uten å lete etter en løs spinner et annet sted.",
            },
            {
                title: "Forklar hva som faktisk skjer",
                description: "Kombiner indikator med kort tekst som sier hva som lastes eller oppdateres akkurat nå.",
            },
            {
                title: "La resten av siden være i fred",
                description: "Hvis bare én region oppdateres, bør brukeren fortsatt kunne lese og orientere seg i resten av grensesnittet.",
            },
        ],
        donts: [
            {
                title: "Ikke blokker hele siden for en lokal oppdatering",
                description: "Store overlegg og fullskjerms lasting bryter flyten når bare ett kort, panel eller tabellsegment endres.",
            },
            {
                title: "Ikke bruk bare bevegelse",
                description: "En spinner alene sier lite om hva som skjer og er lett å overse eller misforstå.",
            },
            {
                title: "Ikke flytt fokus uten grunn",
                description: "Ved korte, lokale oppdateringer bør fokus normalt bli der brukeren allerede arbeider.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Status må annonseres uten fokusflytting",
            description: 'Bruk role="status" eller en passende live region så endringen blir lest opp uten å flytte brukeren bort fra arbeidet sitt.',
        },
        {
            title: "Marker regionen som opptatt",
            description: 'Sett aria-busy="true" på containeren som oppdateres, slik at hjelpemidler forstår at innholdet er midlertidig uferdig.',
        },
        {
            title: "Teksten må stå på egne ben",
            description: "Farge og animasjon kan støtte, men må ikke være eneste signal om at noe fortsatt lastes.",
        },
    ],
    furtherReading: [
        {
            title: 'MDN: role="status"',
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role",
            description: "Grunnmønsteret for korte, dynamiske statusoppdateringer som ikke skal stjele fokus.",
        },
        {
            title: "MDN: aria-busy",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
            description: "Viser hvordan du merker regionen som oppdateres, i stedet for hele siden.",
        },
        {
            title: "ARIA Live Regions",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
            description: "Forklarer hvordan statusmeldinger annonseres uten å flytte fokus.",
        },
    ],
};
