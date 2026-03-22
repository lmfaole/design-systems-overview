import type { PatternPostContent } from "../_shared";

export const emptyStatesContent: PatternPostContent = {
    title: "Tomtilstander",
    category: "struktur",
    description: "Forklar hvorfor det er tomt, hva brukeren kan gjøre nå, og hva som skjer når innhold dukker opp.",
    doAndDonts: {
        dos: [
            {
                title: "Forklar hvorfor det er tomt",
                description: "Si om tilstanden skyldes første gangs bruk, et filter, eller at brukeren faktisk ikke har noe innhold enda.",
            },
            {
                title: "Gi et tydelig neste steg",
                description: "Tomtilstanden bør peke videre med en konkret handling, ikke bare konstatere at noe mangler.",
            },
            {
                title: "Vis hva som kommer til å skje",
                description: "Beskriv kort hva som dukker opp her når brukeren har fullført neste steg, så flaten blir lettere å forstå.",
            },
        ],
        donts: [
            {
                title: "Ikke la tom flate stå uten kontekst",
                description: "Et tomt kort eller en tom liste uten forklaring ser ofte ut som feil eller manglende lasting.",
            },
            {
                title: "Ikke bruk samme melding for alle tomme situasjoner",
                description: "Ingen treff etter filtrering krever annen hjelp enn en første gangs oppstartsflate.",
            },
            {
                title: "Ikke send brukeren inn i en blindvei",
                description: "Hvis den eneste meldingen er at det er tomt, uten handling eller lenke videre, stopper flyten helt opp.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Behold overskrift og områdekontekst",
            description: "Tomtilstanden må fortsatt ligge under en tydelig overskrift, slik at skjermlesere og tastaturbrukere forstår hvilken del av siden som er tom.",
        },
        {
            title: "Annonsér bare dynamiske endringer",
            description: "Bruk aria-live eller role=\"status\" når tomtilstanden oppstår etter søk eller filtrering, men ikke på hver statiske førstegangsflate.",
        },
        {
            title: "Handlingsknapper må være presise",
            description: "Knapper som \"Start\" eller \"Gå videre\" sier lite alene. Bruk heller handlinger som beskriver hva som faktisk skjer.",
        },
        {
            title: "Ikoner og illustrasjoner er bare støtte",
            description: "Den visuelle signaturen kan gjøre tilstanden lettere å skanne, men må aldri være eneste forklaring på hva brukeren ser.",
        },
    ],
    furtherReading: [
        {
            title: "ARIA: aria-live",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live",
            description: "Forklarer når dynamiske statusendringer bør annonseres for hjelpemidler.",
        },
        {
            title: "WAI: Headings",
            href: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
            description: "Viser hvordan tydelige overskrifter gir bedre struktur også når en flate er tom.",
        },
        {
            title: "MDN: button",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button",
            description: "Relevante native knapper bør gi brukeren et tydelig neste steg ut av tomtilstanden.",
        },
        {
            title: "MDN: hidden",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden",
            description: "Nyttig når tomtilstanden eller innholdet byttes dynamisk etter filtrering og søk.",
        },
    ],
};
