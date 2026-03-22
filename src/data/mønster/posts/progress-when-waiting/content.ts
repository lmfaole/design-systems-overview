import type { PatternPostContent } from "../_shared";

export const progressWhenWaitingContent: PatternPostContent = {
    slug: "fremdrift-ved-venting",
    title: "Gå over til fremdrift når brukeren må vente",
    category: "tilbakemelding",
    description: "Vis konkret fremdrift når ventetiden er lang nok til at brukeren trenger forventningsstyring.",
    doAndDonts: {
        dos: [
            {
                title: "Vis fremdrift når du faktisk kan si noe nyttig",
                description: "Prosent, trinn eller tydelig status hjelper brukeren å forstå hvor langt prosessen har kommet.",
            },
            {
                title: "Fortell hva brukeren venter på",
                description: "Kombiner fremdriftsindikatoren med tekst som forklarer hvilken jobb systemet holder på med.",
            },
            {
                title: "Gi neste steg når ventetiden er lang",
                description: "Hvis det tar tid, bør brukeren få bekreftet at de kan vente, fortsette senere eller gjøre noe annet.",
            },
        ],
        donts: [
            {
                title: "Ikke bruk vag aktivitet for lange prosesser",
                description: "En spinner alene er for utydelig når brukeren faktisk må planlegge rundt ventetiden.",
            },
            {
                title: "Ikke vis falsk presisjon",
                description: "Hvis du ikke kan vise reell prosent, bruk heller tydelige steg eller kvalitativ status enn misvisende tall.",
            },
            {
                title: "Ikke la fremdriften stå stille uten forklaring",
                description: "Når prosessen stopper opp eller tar lengre tid enn forventet, må brukeren få kontekst i stedet for et stillestående målebånd.",
            },
        ],
    },
    accessibilityConcerns: [
        {
            title: "Fremdriften må kunne forstås uten farge",
            description: "Prosent, tekst eller verdier må være lesbare også for brukere som ikke oppfatter farge eller subtil animasjon.",
        },
        {
            title: "Sørg for at verdi og etikett henger sammen",
            description: "Knytt fremdriftsindikatoren til en tydelig etikett eller status som sier hva fremdriften gjelder.",
        },
        {
            title: "Oppdater bare når noe faktisk endrer seg",
            description: "Skjermlesere skal ikke få støyende oppdateringer for hver minste animasjonsramme eller kosmetiske endring.",
        },
    ],
    furtherReading: [
        {
            title: "MDN: progress",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress",
            description: "Native fremdriftsindikator når du kan vise konkret eller omtrentlig progresjon.",
        },
        {
            title: "Status Messages (WCAG 4.1.3)",
            href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
            description: "Beskriver kravene til statusmeldinger som oppdateres dynamisk.",
        },
    ],
};
