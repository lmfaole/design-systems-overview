import type { PatternPostContent } from "../_shared";

export const actionConfirmationContent: PatternPostContent = {
    title: "Bekreftelse etter handling",
    category: "tilbakemelding",
    description: "Bekreft hva som skjedde, hva som ble lagret eller sendt, og hva brukeren kan gjøre videre uten å bryte flyten mer enn nødvendig.",
    doAndDonts: {
        dos: [
            {
                title: "Bekreft hva som faktisk skjedde",
                description: "Si om noe ble lagret, sendt, kopiert eller fullført, så brukeren slipper å gjette om handlingen fungerte.",
            },
            {
                title: "Plasser bekreftelsen nær handlingen",
                description: "Inline bekreftelse i samme flate er ofte lettere å forstå enn en løs melding et annet sted på siden.",
            },
            {
                title: "La store handlinger få en tydelig kvittering",
                description: "Når brukeren sender inn noe viktig, bør bekreftelsen også inneholde referanse, neste steg eller vei tilbake.",
            },
        ],
        donts: [
            {
                title: "Ikke bruk kortvarig toast for viktige bekreftelser",
                description: "Hvis brukeren trenger kvittering eller neste steg, blir en rask toast for lett å overse.",
            },
            {
                title: "Ikke vis bekreftelse før jobben faktisk er ferdig",
                description: "En bekreftelse må komme etter at lagring eller innsending er fullført, ikke bare etter at brukeren klikket.",
            },
            {
                title: "Ikke skjul meldingen før den kan oppfattes",
                description: "Kortvarige bekreftelser må leve lenge nok til å leses, og vedvarende bekreftelser må forbli synlige når de har praktisk verdi.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Bekreftelsen må annonseres som status",
            description: "Bruk role=\"status\" eller passende aria-live når bekreftelsen oppdateres dynamisk, slik at skjermlesere får med seg endringen uten fokusflytting.",
        },
        {
            title: "Fokus bør bli der brukeren jobber",
            description: "Etter en vellykket lagring trenger du sjelden å flytte fokus. Bekreftelsen bør være lesbar uten å rive brukeren ut av flyten.",
        },
        {
            title: "Farge og ikon er bare støtte",
            description: "Suksessgrønt eller ikon kan hjelpe visuelt, men bekreftelsen må også si tydelig i tekst hva som skjedde.",
        },
        {
            title: "Kvitteringer må være tilgjengelige etterpå",
            description: "Hvis bekreftelsen inneholder referanse, nedlasting eller neste steg, må den være mulig å nå igjen og ikke bare forsvinne automatisk.",
        },
    ],
    furtherReading: [
        {
            title: "Jøkul Message",
            href: "/ds/jokul/component/message",
            description: "Bruk Message for lokale og vedvarende bekreftelser i samme kontekst som handlingen.",
        },
        {
            title: "Jøkul Toast",
            href: "/ds/jokul/component/toast",
            description: "Passer for kortvarige bekreftelser når brukeren ikke trenger vedvarende kvittering.",
        },
        {
            title: "Jøkul ToastProvider",
            href: "/ds/jokul/component/toast-provider",
            description: "Må brukes når korte bekreftelser skal styres via Toast i applikasjonen.",
        },
        {
            title: "ARIA Live Regions",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
            description: "Forklarer hvordan dynamiske statusoppdateringer annonseres uten fokusflytting.",
        },
        {
            title: "Status Messages (WCAG 4.1.3)",
            href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
            description: "Beskriver krav til statusmeldinger som oppdateres dynamisk etter en brukerhandling.",
        },
    ],
};
