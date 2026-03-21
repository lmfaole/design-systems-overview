import type { PatternImplementation } from "@/features/ds/monster/types";
import {
    createPatternImplementation,
    createSingleCodePatternExample,
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    JokulCollectionEmptyStateExample,
    jokulCollectionEmptyStateCode,
    JokulFilteredEmptyStateExample,
    jokulFilteredEmptyStateCode,
    JokulGuidedEmptyStateExample,
    jokulGuidedEmptyStateCode,
    VanillaCollectionEmptyStateExample,
    vanillaCollectionEmptyStateCssCode,
    vanillaCollectionEmptyStateHtmlCode,
    vanillaCollectionEmptyStateJsCode,
    VanillaFilteredEmptyStateExample,
    vanillaFilteredEmptyStateCssCode,
    vanillaFilteredEmptyStateHtmlCode,
    vanillaFilteredEmptyStateJsCode,
    VanillaGuidedEmptyStateExample,
    vanillaGuidedEmptyStateCssCode,
    vanillaGuidedEmptyStateHtmlCode,
} from "./implementation-examples";

const vanillaEmptyStatesExamples = [
    createVanillaPatternExample({
        key: "vanilla-collection-empty-state",
        eyebrow: "Tom liste",
        title: "Vis første steg når innhold mangler helt",
        description: "Bruk en enkel forklaring og en tydelig primærhandling når brukeren skal opprette noe for første gang.",
        preview: <VanillaCollectionEmptyStateExample />,
        html: vanillaCollectionEmptyStateHtmlCode,
        css: vanillaCollectionEmptyStateCssCode,
        js: vanillaCollectionEmptyStateJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-filtered-empty-state",
        eyebrow: "Ingen treff",
        title: "Skille mellom tomt og filtrert tomt",
        description: "Når brukeren har snevret inn et resultatsett, bør tomtilstanden hjelpe dem tilbake til treffene.",
        preview: <VanillaFilteredEmptyStateExample />,
        html: vanillaFilteredEmptyStateHtmlCode,
        css: vanillaFilteredEmptyStateCssCode,
        js: vanillaFilteredEmptyStateJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-guided-empty-state",
        eyebrow: "Førstegangsflate",
        title: "Forklar hva som dukker opp senere",
        description: "Vis kort hva flaten brukes til, slik at tomtilstanden blir en introduksjon i stedet for en stoppkloss.",
        preview: <VanillaGuidedEmptyStateExample />,
        html: vanillaGuidedEmptyStateHtmlCode,
        css: vanillaGuidedEmptyStateCssCode,
    }),
];

const jokulEmptyStatesExamples = [
    createSingleCodePatternExample({
        key: "jokul-collection-empty-state",
        eyebrow: "Tom liste",
        title: "Bruk Card og én tydelig handling",
        description: "En avgrenset flate med tydelig CTA gjør det enklere å komme i gang uten at resten av siden føles feil.",
        preview: <JokulCollectionEmptyStateExample />,
        code: jokulCollectionEmptyStateCode,
        codeLabel: "Eksempel med Card og Button",
    }),
    createSingleCodePatternExample({
        key: "jokul-filtered-empty-state",
        eyebrow: "Ingen treff",
        title: "La Message forklare hvorfor det er tomt",
        description: "Når brukeren selv har snevret inn resultatene, bør tomtilstanden hjelpe dem tilbake med en tydelig forklaring.",
        preview: <JokulFilteredEmptyStateExample />,
        code: jokulFilteredEmptyStateCode,
        codeLabel: "Eksempel med Card, Message og Button",
    }),
    createSingleCodePatternExample({
        key: "jokul-guided-empty-state",
        eyebrow: "Førstegangsflate",
        title: "Bruk tomtilstanden som introduksjon",
        description: "En kort punktliste og en primærhandling kan gjøre en ellers tom flate til en trygg start for nye brukere.",
        preview: <JokulGuidedEmptyStateExample />,
        code: jokulGuidedEmptyStateCode,
        codeLabel: "Eksempel med Card og Button",
    }),
];

export const emptyStatesImplementations: PatternImplementation[] = [
    createVanillaImplementation({
        title: "Implementer tomtilstander med HTML, CSS og JS",
        description: (
            <>
                Start med en tydelig overskrift, kort forklaring og en konkret handling. Bruk
                JavaScript bare når tomtilstanden oppstår dynamisk etter søk, filtrering eller
                andre brukerhandlinger.
            </>
        ),
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
    createPatternImplementation({
        designSystem: "Jøkul",
        title: "Implementer tomtilstander i Jøkul",
        description: (
            <>
                Bruk <a href="/ds/jokul/component/card">Card</a> for å ramme inn en tom flate,{" "}
                <a href="/ds/jokul/component/button">Button</a> for neste steg, og{" "}
                <a href="/ds/jokul/component/message">Message</a> når tomtilstanden skyldes
                filtrering eller en midlertidig situasjon.
            </>
        ),
        liveExamples: jokulEmptyStatesExamples,
        components: [
            {
                title: "Card",
                href: "/ds/jokul/component/card",
            },
            {
                title: "Button",
                href: "/ds/jokul/component/button",
            },
            {
                title: "Message",
                href: "/ds/jokul/component/message",
            },
        ],
    }),
];
