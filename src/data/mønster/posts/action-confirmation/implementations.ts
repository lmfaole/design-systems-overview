import {
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    vanillaInlineConfirmationCssCode,
    vanillaInlineConfirmationHtmlCode,
    vanillaInlineConfirmationJsCode,
    vanillaInlineConfirmationPreviewHtml,
    vanillaReceiptConfirmationCssCode,
    vanillaReceiptConfirmationHtmlCode,
    vanillaReceiptConfirmationPreviewHtml,
    vanillaToastConfirmationCssCode,
    vanillaToastConfirmationHtmlCode,
    vanillaToastConfirmationJsCode,
    vanillaToastConfirmationPreviewHtml,
} from "./implementation-examples";

const vanillaActionConfirmationExamples = [
    createVanillaPatternExample({
        key: "vanilla-inline-confirmation",
        eyebrow: "Inline bekreftelse",
        title: "Bekreft lagring i samme flate",
        description: "Når brukeren blir på samme side, er en lokal statusmelding ofte nok til å skape trygghet.",
        preview: vanillaInlineConfirmationPreviewHtml,
        html: vanillaInlineConfirmationHtmlCode,
        css: vanillaInlineConfirmationCssCode,
        js: vanillaInlineConfirmationJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-toast-confirmation",
        eyebrow: "Kort bekreftelse",
        title: "Bruk en kortvarig status når konsekvensen er liten",
        description: "For kopiering eller små justeringer kan en kort, tydelig status være nok så lenge den varer lenge nok til å leses.",
        preview: vanillaToastConfirmationPreviewHtml,
        html: vanillaToastConfirmationHtmlCode,
        css: vanillaToastConfirmationCssCode,
        js: vanillaToastConfirmationJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-receipt-confirmation",
        eyebrow: "Kvittering",
        title: "Gi vedvarende bekreftelse når noe er sendt",
        description: "Når brukeren trenger referanse eller neste steg, bør bekreftelsen være mer enn bare en kort status.",
        preview: vanillaReceiptConfirmationPreviewHtml,
        html: vanillaReceiptConfirmationHtmlCode,
        css: vanillaReceiptConfirmationCssCode,
    }),
];

export const actionConfirmationImplementations = [
    createVanillaImplementation({
        title: "Implementer bekreftelser med HTML, CSS og JS",
        descriptionHtml: "<p>Start med en synlig tekstlig status tett på handlingen. Bruk JavaScript til å vise bekreftelsen når handlingen faktisk er fullført, og gjør store bekreftelser vedvarende nok til at brukeren rekker å bruke dem.</p>",
        liveExamples: vanillaActionConfirmationExamples,
        components: [
            {
                title: 'role="status"',
                href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role",
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
