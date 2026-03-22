import {
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    vanillaInlineStatusExampleCssCode,
    vanillaInlineStatusExampleHtmlCode,
    vanillaInlineStatusExampleJsCode,
    vanillaInlineStatusPreviewHtml,
} from "../_shared/loading-examples";

export const statusInUpdatedRegionImplementations = [
    createVanillaImplementation({
        title: "Implementer lokal lastestatus med HTML, CSS og JS",
        descriptionHtml: '<p>Marker regionen som oppdateres med <code>aria-busy</code>, og la en synlig status med <code>role="status"</code> forklare hva som skjer. Dette mønsteret passer når ventetiden er kort og brukeren fortsatt skal kunne lese resten av flaten.</p>',
        liveExamples: [
            createVanillaPatternExample({
                key: "vanilla-inline-status-example",
                eyebrow: "Kort ventetid",
                title: "Vis status i regionen som oppdateres",
                description: "Hold lastetilstanden nær innholdet som endres, og la teksten forklare hva som skjer.",
                preview: vanillaInlineStatusPreviewHtml,
                html: vanillaInlineStatusExampleHtmlCode,
                css: vanillaInlineStatusExampleCssCode,
                js: vanillaInlineStatusExampleJsCode,
            }),
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
        ],
    }),
];
