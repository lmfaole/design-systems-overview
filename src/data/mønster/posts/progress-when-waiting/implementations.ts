import {
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    vanillaProgressExampleCssCode,
    vanillaProgressExampleHtmlCode,
    vanillaProgressExampleJsCode,
    vanillaProgressPreviewHtml,
} from "../_shared/loading-examples";

export const progressWhenWaitingImplementations = [
    createVanillaImplementation({
        title: "Implementer fremdrift med HTML, CSS og JS",
        descriptionHtml: '<p>Når ventetiden er lang nok til at brukeren trenger forventningsstyring, bør du gå fra vag aktivitet til konkret fremdrift. Bruk <code>&lt;progress&gt;</code> når du kan vise verdi, og kombiner den med tekst som sier hva som skjer og hva brukeren kan forvente videre.</p>',
        liveExamples: [
            createVanillaPatternExample({
                key: "vanilla-progress-example",
                eyebrow: "Lengre ventetid",
                title: "Gå over til fremdrift når brukeren må vente",
                description: "Vis prosent og tydelig status når lasten varer lenge nok til at brukeren trenger forventningsstyring.",
                preview: vanillaProgressPreviewHtml,
                html: vanillaProgressExampleHtmlCode,
                css: vanillaProgressExampleCssCode,
                js: vanillaProgressExampleJsCode,
            }),
        ],
        components: [
            {
                title: "<progress>",
                href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress",
            },
        ],
    }),
];
