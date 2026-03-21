import type { PatternImplementation } from "@/features/ds/monster/types";
import {
    createPatternImplementation,
    createSingleCodePatternExample,
    createVanillaImplementation,
    createVanillaPatternExample,
} from "../_shared";
import {
    JokulInlineConfirmationExample,
    jokulInlineConfirmationCode,
    JokulNextStepConfirmationExample,
    jokulNextStepConfirmationCode,
    JokulReceiptConfirmationExample,
    jokulReceiptConfirmationCode,
    VanillaInlineConfirmationExample,
    vanillaInlineConfirmationCssCode,
    vanillaInlineConfirmationHtmlCode,
    vanillaInlineConfirmationJsCode,
    VanillaReceiptConfirmationExample,
    vanillaReceiptConfirmationCssCode,
    vanillaReceiptConfirmationHtmlCode,
    VanillaToastConfirmationExample,
    vanillaToastConfirmationCssCode,
    vanillaToastConfirmationHtmlCode,
    vanillaToastConfirmationJsCode,
} from "./implementation-examples";

const vanillaActionConfirmationExamples = [
    createVanillaPatternExample({
        key: "vanilla-inline-confirmation",
        eyebrow: "Inline bekreftelse",
        title: "Bekreft lagring i samme flate",
        description: "Når brukeren blir på samme side, er en lokal statusmelding ofte nok til å skape trygghet.",
        preview: <VanillaInlineConfirmationExample />,
        html: vanillaInlineConfirmationHtmlCode,
        css: vanillaInlineConfirmationCssCode,
        js: vanillaInlineConfirmationJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-toast-confirmation",
        eyebrow: "Kort bekreftelse",
        title: "Bruk en kortvarig status når konsekvensen er liten",
        description: "For kopiering eller små justeringer kan en kort, tydelig status være nok så lenge den varer lenge nok til å leses.",
        preview: <VanillaToastConfirmationExample />,
        html: vanillaToastConfirmationHtmlCode,
        css: vanillaToastConfirmationCssCode,
        js: vanillaToastConfirmationJsCode,
    }),
    createVanillaPatternExample({
        key: "vanilla-receipt-confirmation",
        eyebrow: "Kvittering",
        title: "Gi vedvarende bekreftelse når noe er sendt",
        description: "Når brukeren trenger referanse eller neste steg, bør bekreftelsen være mer enn bare en kort status.",
        preview: <VanillaReceiptConfirmationExample />,
        html: vanillaReceiptConfirmationHtmlCode,
        css: vanillaReceiptConfirmationCssCode,
    }),
];

const jokulActionConfirmationExamples = [
    createSingleCodePatternExample({
        key: "jokul-inline-confirmation",
        eyebrow: "Inline bekreftelse",
        title: "La Message bekrefte lagring lokalt",
        description: "Message egner seg godt når brukeren blir i samme arbeidsflate og trenger umiddelbar trygghet for at noe ble lagret.",
        preview: <JokulInlineConfirmationExample />,
        code: jokulInlineConfirmationCode,
        codeLabel: "Eksempel med Card, Message og Button",
    }),
    createSingleCodePatternExample({
        key: "jokul-receipt-confirmation",
        eyebrow: "Kvittering",
        title: "Bruk Card når bekreftelsen må vare",
        description: "Ved innsendinger og andre viktige handlinger bør bekreftelsen også bære referanse og forklaring på hva som skjer videre.",
        preview: <JokulReceiptConfirmationExample />,
        code: jokulReceiptConfirmationCode,
        codeLabel: "Eksempel med Card og Message",
    }),
    createSingleCodePatternExample({
        key: "jokul-next-step-confirmation",
        eyebrow: "Neste steg",
        title: "Koble på tydelige handlinger videre",
        description: "Når bekreftelsen leder videre til kvittering, oversikt eller oppfølging, bør det være tydelig i samme flate.",
        preview: <JokulNextStepConfirmationExample />,
        code: jokulNextStepConfirmationCode,
        codeLabel: "Eksempel med Card, Message og Button",
    }),
];

export const actionConfirmationImplementations: PatternImplementation[] = [
    createVanillaImplementation({
        title: "Implementer bekreftelser med HTML, CSS og JS",
        description: (
            <>
                Start med en synlig tekstlig status tett på handlingen. Bruk JavaScript til å vise
                bekreftelsen når handlingen faktisk er fullført, og gjør store bekreftelser
                vedvarende nok til at brukeren rekker å bruke dem.
            </>
        ),
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
    createPatternImplementation({
        designSystem: "Jøkul",
        title: "Implementer bekreftelser i Jøkul",
        description: (
            <>
                Bruk <a href="/ds/jokul/component/message">Message</a> for inline og vedvarende
                bekreftelser, <a href="/ds/jokul/component/card">Card</a> for kvitteringer med mer
                kontekst, og gå over til <a href="/ds/jokul/component/toast">Toast</a> med{" "}
                <a href="/ds/jokul/component/toast-provider">ToastProvider</a> når en kortvarig
                bekreftelse er nok.
            </>
        ),
        liveExamples: jokulActionConfirmationExamples,
        components: [
            {
                title: "Message",
                href: "/ds/jokul/component/message",
            },
            {
                title: "Card",
                href: "/ds/jokul/component/card",
            },
            {
                title: "Button",
                href: "/ds/jokul/component/button",
            },
            {
                title: "Toast",
                href: "/ds/jokul/component/toast",
            },
            {
                title: "ToastProvider",
                href: "/ds/jokul/component/toast-provider",
            },
        ],
    }),
];
