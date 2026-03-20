import {
    BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM,
    type PatternPost,
} from "@/features/ds/monster/types";
import { PatternExampleCard } from "@/features/ds/monster/posts/components";
import {
    AccessibleStatusExample,
    accessibleStatusExampleCode,
    ContextualLoaderExample,
    contextualLoaderExampleCode,
    EscalatedWaitExample,
    escalatedWaitExampleCode,
    SkeletonRegionExample,
    skeletonRegionExampleCode,
    VanillaInlineStatusExample,
    vanillaInlineStatusExampleCssCode,
    vanillaInlineStatusExampleHtmlCode,
    vanillaInlineStatusExampleJsCode,
    VanillaProgressExample,
    vanillaProgressExampleCssCode,
    vanillaProgressExampleHtmlCode,
    vanillaProgressExampleJsCode,
    VanillaSkeletonExample,
    vanillaSkeletonExampleCssCode,
    vanillaSkeletonExampleHtmlCode,
} from "./implementation-examples";
import { LoadingStatesIllustration } from "./LoadingStatesIllustration";

const post: PatternPost = {
    id: 1,
    title: "Lastetilstander",
    category: "tilbakemelding",
    description: "Gi brukeren tydelig beskjed om at systemet jobber, uten å stoppe flyten mer enn nødvendig.",
    illustration: {
        label: "Illustrasjon av skjelettvisning, loader og fremdriftsindikator for en lastetilstand.",
        component: LoadingStatesIllustration,
    },
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
    implementation: [
        {
            designSystem: BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM,
            title: "Implementer lastetilstander med HTML, CSS og JS",
            description: (
                <>
                    Start med native byggesteiner: bruk <code>role="status"</code> og{" "}
                    <code>aria-busy</code> for tilgjengelig status, CSS for visuell tilbakemelding, og{" "}
                    <code>&lt;progress&gt;</code> når du kan vise konkret fremdrift.
                </>
            ),
            liveExamples: [
                (
                    <PatternExampleCard
                        key="vanilla-inline-status-example"
                        eyebrow="Kort ventetid"
                        title="Vis status i regionen som oppdateres"
                        description="Hold lastetilstanden nær innholdet som endres, og la teksten forklare hva som skjer."
                        preview={<VanillaInlineStatusExample />}
                        codeExamples={[
                            {
                                code: vanillaInlineStatusExampleHtmlCode,
                                language: "html",
                                label: "Struktur",
                            },
                            {
                                code: vanillaInlineStatusExampleCssCode,
                                language: "css",
                                label: "Stiler",
                            },
                            {
                                code: vanillaInlineStatusExampleJsCode,
                                language: "js",
                                label: "Logikk",
                            },
                        ]}
                    />
                ),
                (
                    <PatternExampleCard
                        key="vanilla-skeleton-example"
                        eyebrow="Stabil layout"
                        title="Bruk skjelettvisning når strukturen er kjent"
                        description="Enkle plassholdere i HTML og CSS gjør at innholdet ikke hopper når dataene kommer inn."
                        preview={<VanillaSkeletonExample />}
                        codeExamples={[
                            {
                                code: vanillaSkeletonExampleHtmlCode,
                                language: "html",
                                label: "Struktur",
                            },
                            {
                                code: vanillaSkeletonExampleCssCode,
                                language: "css",
                                label: "Stiler",
                            },
                        ]}
                    />
                ),
                (
                    <PatternExampleCard
                        key="vanilla-progress-example"
                        eyebrow="Lengre ventetid"
                        title="Gå over til fremdrift når brukeren må vente"
                        description="Vis prosent og tydelig status når lasten varer lenge nok til at brukeren trenger forventningsstyring."
                        preview={<VanillaProgressExample />}
                        codeExamples={[
                            {
                                code: vanillaProgressExampleHtmlCode,
                                language: "html",
                                label: "Struktur",
                            },
                            {
                                code: vanillaProgressExampleCssCode,
                                language: "css",
                                label: "Stiler",
                            },
                            {
                                code: vanillaProgressExampleJsCode,
                                language: "js",
                                label: "Logikk",
                            },
                        ]}
                    />
                ),
            ],
            components: [
                {
                    title: 'role="status"',
                    href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role",
                },
                {
                    title: "aria-busy",
                    href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
                },
                {
                    title: "<progress>",
                    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress",
                },
            ],
            steps: [
                {
                    title: "Marker regionen som oppdateres",
                    description: "Sett aria-busy på containeren som venter på data, slik at hjelpemidler forstår at innholdet er midlertidig uferdig.",
                },
                {
                    title: "Legg inn en synlig og tekstlig status",
                    description: "Bruk en liten loader eller tekstnær indikator med role=\"status\" når ventetiden er kort og lokal.",
                },
                {
                    title: "Hold av plass med CSS når layouten er kjent",
                    description: "Lag enkle skjelettblokker med HTML og CSS for kort, lister eller paneler som ellers ville hoppet når innholdet lastes inn.",
                },
                {
                    title: "Oppdater tilstanden med JavaScript",
                    description: "La JavaScript slå av aria-busy, oppdatere statustekst eller drive et progress-element når du får ny status fra nettverket.",
                },
            ],
        },
        {
            designSystem: "Jøkul",
            title: "Implementer lastetilstander i Jøkul",
            description: (
                <>
                    Bruk <a href="/ds/jokul/component/loader">Loader</a> for korte, inline ventetilstander,{" "}
                    <a href="/ds/jokul/component/skeleton">Skeleton</a> når du må holde av plass, og{" "}
                    <a href="/ds/jokul/component/progress-bar">ProgressBar</a> når du kan vise fremdrift over tid.
                </>
            ),
            liveExamples: [
                (
                    <PatternExampleCard
                        key="contextual-loader-example"
                        eyebrow="Kort ventetid"
                        title="Vis en loader der oppdateringen skjer"
                        description="Bruk en liten loader tett på innholdet som endres, slik at brukeren ser hva systemet jobber med."
                        preview={<ContextualLoaderExample />}
                        code={contextualLoaderExampleCode}
                        codeLabel="Eksempel med Loader"
                    />
                ),
                (
                    <PatternExampleCard
                        key="skeleton-region-example"
                        eyebrow="Stabil layout"
                        title="Bruk skjelett når du kjenner strukturen"
                        description="Skjelettvisning holder av plass og reduserer hopping når kort, lister eller paneler lastes inn."
                        preview={<SkeletonRegionExample />}
                        code={skeletonRegionExampleCode}
                        codeLabel="Eksempel med Skeleton"
                    />
                ),
                (
                    <PatternExampleCard
                        key="accessible-status-example"
                        eyebrow="Tilgjengelig status"
                        title="Kombiner synlig melding og skjermleserstatus"
                        description="En kort melding sammen med loaderen gjør ventetiden tydeligere og holder brukeren orientert."
                        preview={<AccessibleStatusExample />}
                        code={accessibleStatusExampleCode}
                        codeLabel="Eksempel med Message og Loader"
                    />
                ),
                (
                    <PatternExampleCard
                        key="escalated-wait-example"
                        eyebrow="Lengre ventetid"
                        title="Eskaler til fremdrift når det tar tid"
                        description="Når brukeren må vente en stund, bør mønsteret gå fra vag aktivitet til konkret fremdrift og forventningsstyring."
                        preview={<EscalatedWaitExample />}
                        code={escalatedWaitExampleCode}
                        codeLabel="Eksempel med ProgressBar"
                    />
                ),
            ],
            components: [
                {
                    title: "Loader",
                    href: "/ds/jokul/component/loader",
                },
                {
                    title: "Skeleton",
                    href: "/ds/jokul/component/skeleton",
                },
                {
                    title: "ProgressBar",
                    href: "/ds/jokul/component/progress-bar",
                },
            ],
            steps: [
                {
                    title: "Velg riktig komponent",
                    description: "Start med Loader for korte ventetider, bruk Skeleton når layouten må holdes stabil, og gå over til ProgressBar hvis du kan vise reell eller omtrentlig fremdrift.",
                },
                {
                    title: "Plasser lastetilstanden der innholdet endres",
                    description: "Legg indikatoren i samme panel, liste eller flyt som oppdateres, slik at brukeren slipper å lete etter hvilken del av grensesnittet som jobber.",
                },
                {
                    title: "Koble på tilgjengelig status",
                    description: "Kombiner synlig tekst med role=\"status\", aria-live eller aria-busy der det passer, slik at hjelpemidler fanger opp endringen uten at fokus flyttes.",
                },
                {
                    title: "Eskaler hvis ventetiden blir lang",
                    description: "Bytt fra en diskret loader til tydeligere forklaring, fremdrift eller systemmelding hvis brukeren blir ventende lenge eller ikke kan fortsette arbeidet.",
                },
            ],
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

export default post;
