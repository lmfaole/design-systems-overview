import {
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    vanillaSkeletonExampleCssCode,
    vanillaSkeletonExampleHtmlCode,
    vanillaSkeletonPreviewHtml,
} from "../_shared/loading-examples";

export const skeletonWhenStructureIsKnownImplementations = [
    createVanillaImplementation({
        title: "Implementer skjelettvisning med HTML og CSS",
        descriptionHtml: '<p>Bruk enkle plassholdere når du kjenner strukturen som skal komme, og hold dem innenfor regionen som faktisk lastes. Kombiner med <code>aria-busy</code> på containeren, så både layout og forventning holder seg stabile mens innholdet hentes.</p>',
        liveExamples: [
            createVanillaPatternExample({
                key: "vanilla-skeleton-example",
                eyebrow: "Stabil layout",
                title: "Bruk skjelettvisning når strukturen er kjent",
                description: "Enkle plassholdere i HTML og CSS gjør at innholdet ikke hopper når dataene kommer inn.",
                preview: vanillaSkeletonPreviewHtml,
                html: vanillaSkeletonExampleHtmlCode,
                css: vanillaSkeletonExampleCssCode,
            }),
        ],
        components: [
            {
                title: "aria-busy",
                href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
            },
        ],
    }),
];
