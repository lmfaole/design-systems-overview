import {
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    vanillaCollectionEmptyStateCssCode,
    vanillaCollectionEmptyStateHtmlCode,
    vanillaCollectionEmptyStateJsCode,
    vanillaCollectionEmptyStatePreviewHtml,
    vanillaFilteredEmptyStateCssCode,
    vanillaFilteredEmptyStateHtmlCode,
    vanillaFilteredEmptyStateJsCode,
    vanillaFilteredEmptyStatePreviewHtml,
    vanillaGuidedEmptyStateCssCode,
    vanillaGuidedEmptyStateHtmlCode,
    vanillaGuidedEmptyStatePreviewHtml,
} from "./implementation-examples";

const vanillaEmptyStatesExamples = [
    createVanillaPatternExample({
        key: "vanilla-collection-empty-state",
        eyebrow: "Tom liste",
        title: "Vis første steg når innhold mangler helt",
        description: "Bruk en enkel forklaring og en tydelig primærhandling når brukeren skal opprette noe for første gang.",
        preview: vanillaCollectionEmptyStatePreviewHtml,
        html: vanillaCollectionEmptyStateHtmlCode,
        css: vanillaCollectionEmptyStateCssCode,
        js: vanillaCollectionEmptyStateJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-filtered-empty-state",
        eyebrow: "Ingen treff",
        title: "Skille mellom tomt og filtrert tomt",
        description: "Når brukeren har snevret inn et resultatsett, bør tomtilstanden hjelpe dem tilbake til treffene.",
        preview: vanillaFilteredEmptyStatePreviewHtml,
        html: vanillaFilteredEmptyStateHtmlCode,
        css: vanillaFilteredEmptyStateCssCode,
        js: vanillaFilteredEmptyStateJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-guided-empty-state",
        eyebrow: "Førstegangsflate",
        title: "Forklar hva som dukker opp senere",
        description: "Vis kort hva flaten brukes til, slik at tomtilstanden blir en introduksjon i stedet for en stoppkloss.",
        preview: vanillaGuidedEmptyStatePreviewHtml,
        html: vanillaGuidedEmptyStateHtmlCode,
        css: vanillaGuidedEmptyStateCssCode,
    }),
];

export const emptyStatesImplementations = [
    createVanillaImplementation({
        title: "Implementer tomtilstander med HTML, CSS og JS",
        descriptionHtml: "<p>Start med en tydelig overskrift, kort forklaring og en konkret handling. Bruk JavaScript bare når tomtilstanden oppstår dynamisk etter søk, filtrering eller andre brukerhandlinger.</p>",
        liveExamples: vanillaEmptyStatesExamples,
        components: [
            {
                title: "<button>",
                href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button",
            },
            {
                title: "aria-live",
                href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live",
            },
            {
                title: "hidden",
                href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden",
            },
        ],
    }),
];
