import type { PatternPost } from "@/app/ds/monster/types";
import {
    BlockingExample,
    InlineStatusExample,
    SkeletonExample,
    SpinnerOnlyExample,
} from "./examples";

const post: PatternPost = {
    id: 1,
    title: "Lastetilstander",
    category: "tilbakemelding",
    goals: "Gi brukeren tydelig beskjed om at noe laster, uten aa stoppe flyten.",
    doAndDonts: {
        use: [
            {
                title: "Si hva som skjer",
                description: "Fortell hva som lastes, og hold teksten kort.",
                example: <InlineStatusExample />,
            },
            {
                title: "Hold plassen stabil",
                description: "Bruk skjelettvisning for aa unngaa hopp i layouten.",
                example: <SkeletonExample />,
            },
        ],
        avoid: [
            {
                title: "Skjul status",
                description: "En spinner uten tekst gir ingen mening for mange brukere.",
                example: <SpinnerOnlyExample />,
            },
            {
                title: "Blokker alt for korte laster",
                description: "Kort venting kan ofte vises inline i stedet.",
                example: <BlockingExample />,
            },
        ],
    },
    examples: [
        {
            title: "Kort statusmelding i kontekst",
            description: "For mindre oppdateringer der brukeren blir i samme flyt.",
            variants: [
                {
                    label: "HTML",
                    kind: "html",
                    howTo: "Bruk role=\"status\" og aria-live=\"polite\" for rolige oppdateringer.",
                    description: "Passer for inline status i skjema og lister.",
                    code: `
<p role="status" aria-live="polite">
  Laster inn innhold...
</p>
                    `,
                    Example: InlineStatusExample,
                },
            ],
        },
        {
            title: "Skjelett for listeinnhold",
            description: "Hold plassen mens innholdet hentes.",
            variants: [
                {
                    label: "HTML",
                    kind: "html",
                    howTo: "Sett aria-busy=\"true\" paa containeren og legg til skjult tekst.",
                    description: "Gi skjermlesere en statusmelding uten aa vise ekstra tekst.",
                    code: `
<div aria-busy="true" aria-live="polite">
  <div class="skeleton skeleton--line"></div>
  <div class="skeleton skeleton--line"></div>
  <span class="sr-only">Laster inn innhold</span>
</div>
                    `,
                    Example: SkeletonExample,
                },
            ],
        },
        {
            title: "Blokkerende lasting i panel",
            description: "Kun for handlinger som faktisk stopper videre bruk.",
            variants: [
                {
                    label: "HTML",
                    kind: "html",
                    howTo: "Marker hele regionen med aria-busy og gi en kort status.",
                    description: "Brukes ved store sidebytter eller kritiske steg.",
                    code: `
<section aria-busy="true" aria-live="polite">
  <div role="status">Laster data...</div>
</section>
                    `,
                    Example: BlockingExample,
                },
            ],
        },
    ],
    avoid: [
        {
            title: "Spinner uten forklaring",
            description: "Uten tekst blir statusen uforstaalig for skjermlesere.",
            variants: [
                {
                    label: "HTML",
                    kind: "html",
                    howTo: "Legg til skjult tekst eller role=\"status\" i stedet for kun ikon.",
                    code: `
<div class="spinner" aria-hidden="true"></div>
                    `,
                    Example: SpinnerOnlyExample,
                },
            ],
        },
    ],
    accessibility: {
        title: "Gi status uten aa flytte fokus",
        description:
            "Lastetilstander skal informere, ikke avbryte. Bruk live regions for korte meldinger og behold brukerens fokus der det er.",
        ariaRoles: [
            "role=\"status\" for korte, ikke-kritiske oppdateringer.",
            "aria-live=\"polite\" paa regioner som oppdateres mens brukeren leser.",
            "aria-busy=\"true\" paa containeren mens innholdet hentes.",
        ],
        wcag: [
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance: "Status skal annonseres uten aa flytte fokus.",
            },
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Statusen maa knyttes til riktig innholdsomraade.",
            },
            {
                id: "2.2.1",
                title: "Timing Adjustable",
                level: "A",
                relevance: "Gi brukeren tid nok hvis lasting tar lang tid.",
            },
        ],
        avoid: [
            "Ikke bruk kun farge eller bevegelse for aa formidle status.",
            "Unngaa aria-live=\"assertive\" for lengre operasjoner.",
            "Ikke flytt fokus automatisk mens noe laster.",
        ],
        testing: [
            "Start en lasting og sjekk at status leses opp i skjermleser.",
            "Test med tastatur at fokus blir der det var da lasting startet.",
        ],
    },
    resources: [
        {
            title: "ARIA Live Regions",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
            publisher: "MDN",
            relevance: 4,
            description: "Forklarer aria-live og hvordan statusmeldinger annonseres.",
        },
        {
            title: "WebAIM: ARIA",
            href: "https://webaim.org/techniques/aria/",
            publisher: "WebAIM",
            relevance: 3,
            description: "Generelle retningslinjer for riktig bruk av ARIA.",
        },
    ],
};

export default post;
