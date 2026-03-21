import type { PatternImplementation } from "@/features/ds/monster/types";
import {
    createPatternImplementation,
    createSingleCodePatternExample,
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
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

const vanillaLoadingStatesExamples = [
    createVanillaPatternExample({
        key: "vanilla-inline-status-example",
        eyebrow: "Kort ventetid",
        title: "Vis status i regionen som oppdateres",
        description: "Hold lastetilstanden nær innholdet som endres, og la teksten forklare hva som skjer.",
        preview: <VanillaInlineStatusExample />,
        html: vanillaInlineStatusExampleHtmlCode,
        css: vanillaInlineStatusExampleCssCode,
        js: vanillaInlineStatusExampleJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-skeleton-example",
        eyebrow: "Stabil layout",
        title: "Bruk skjelettvisning når strukturen er kjent",
        description: "Enkle plassholdere i HTML og CSS gjør at innholdet ikke hopper når dataene kommer inn.",
        preview: <VanillaSkeletonExample />,
        html: vanillaSkeletonExampleHtmlCode,
        css: vanillaSkeletonExampleCssCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-progress-example",
        eyebrow: "Lengre ventetid",
        title: "Gå over til fremdrift når brukeren må vente",
        description: "Vis prosent og tydelig status når lasten varer lenge nok til at brukeren trenger forventningsstyring.",
        preview: <VanillaProgressExample />,
        html: vanillaProgressExampleHtmlCode,
        css: vanillaProgressExampleCssCode,
        js: vanillaProgressExampleJsCode,
    }),
];

const jokulLoadingStatesExamples = [
    createSingleCodePatternExample({
        key: "contextual-loader-example",
        eyebrow: "Kort ventetid",
        title: "Vis en loader der oppdateringen skjer",
        description: "Bruk en liten loader tett på innholdet som endres, slik at brukeren ser hva systemet jobber med.",
        preview: <ContextualLoaderExample />,
        code: contextualLoaderExampleCode,
        codeLabel: "Eksempel med Loader",
    }),
    createSingleCodePatternExample({
        key: "skeleton-region-example",
        eyebrow: "Stabil layout",
        title: "Bruk skjelett når du kjenner strukturen",
        description: "Skjelettvisning holder av plass og reduserer hopping når kort, lister eller paneler lastes inn.",
        preview: <SkeletonRegionExample />,
        code: skeletonRegionExampleCode,
        codeLabel: "Eksempel med Skeleton",
    }),
    createSingleCodePatternExample({
        key: "accessible-status-example",
        eyebrow: "Tilgjengelig status",
        title: "Kombiner synlig melding og skjermleserstatus",
        description: "En kort melding sammen med loaderen gjør ventetiden tydeligere og holder brukeren orientert.",
        preview: <AccessibleStatusExample />,
        code: accessibleStatusExampleCode,
        codeLabel: "Eksempel med Message og Loader",
    }),
    createSingleCodePatternExample({
        key: "escalated-wait-example",
        eyebrow: "Lengre ventetid",
        title: "Eskaler til fremdrift når det tar tid",
        description: "Når brukeren må vente en stund, bør mønsteret gå fra vag aktivitet til konkret fremdrift og forventningsstyring.",
        preview: <EscalatedWaitExample />,
        code: escalatedWaitExampleCode,
        codeLabel: "Eksempel med ProgressBar",
    }),
];

export const loadingStatesImplementations: PatternImplementation[] = [
    createVanillaImplementation({
        title: "Implementer lastetilstander med HTML, CSS og JS",
        description: (
            <>
                Start med native byggesteiner: bruk <code>role="status"</code> og{" "}
                <code>aria-busy</code> for tilgjengelig status, CSS for visuell tilbakemelding, og{" "}
                <code>&lt;progress&gt;</code> når du kan vise konkret fremdrift.
            </>
        ),
        liveExamples: vanillaLoadingStatesExamples,
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
    }),
    createPatternImplementation({
        designSystem: "Jøkul",
        title: "Implementer lastetilstander i Jøkul",
        description: (
            <>
                Bruk <a href="/ds/jokul/component/loader">Loader</a> for korte, inline
                ventetilstander, <a href="/ds/jokul/component/skeleton">Skeleton</a> når du må
                holde av plass, og <a href="/ds/jokul/component/progress-bar">ProgressBar</a> når
                du kan vise fremdrift over tid.
            </>
        ),
        liveExamples: jokulLoadingStatesExamples,
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
    }),
];
