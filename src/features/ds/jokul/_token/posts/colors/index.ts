import { code, joinHtml, span, text } from "@/lib/html";
import {
    backgroundTokens,
    borderTokens,
    exportedAlertBackgroundTokens,
    exportedBackgroundTokens,
    exportedBorderTokens,
    exportedFunctionalColorTokens,
    exportedPrimitiveColorTokens,
    exportedTextTokens,
    feedbackSurfaceTokens,
    formatPublicColorTokenPath,
    primitiveColorTokens,
    textTokens,
} from "./tokens";
import { colorMixins } from "./mixins";
import {
    createColorSwatchExample,
    createDualColorSwatchExample,
    createLengthBarExample,
    createTextExample,
} from "../_shared/table-examples";
import type { TokenPost } from "../types";

const post: TokenPost = {
    id: 11,
    title: "Farger",
    excerpt:
        "En fullstendig referanse til Jøkuls fargesystem: primitive tokens, semantiske tokens, fargeroller, lys/mørk tema og kontrastkrav.",
    tokenOverview: [
        {
            heading: "Eksporterte primitive farger",
            description:
                "Disse tokenene eksporteres fra `@fremtind/jokul/core` som `tokens.color.brand.*`. De er rå merkevarefarger uten semantikk.",
            caption: "Eksporterte primitive fargetokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Verdi", "Navn"],
            rows: exportedPrimitiveColorTokens.map(({ path, value, label }) => [
                createColorSwatchExample(value),
                code(formatPublicColorTokenPath(path)),
                text(value),
                text(label),
            ]),
        },
        {
            heading: "Eksporterte funksjonelle farger",
            description:
                "Jøkul eksporterer også funksjonelle statusfarger som rå verdier. De brukes blant annet som grunnlag for semantiske feedback-farger.",
            caption: "Eksporterte funksjonelle farger fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedFunctionalColorTokens.map(
                ({ lightPath, darkPath, lightValue, darkValue, description }) => [
                    createDualColorSwatchExample(lightValue, darkValue),
                    span(
                        joinHtml(
                            [
                                code(formatPublicColorTokenPath(lightPath)),
                                code(formatPublicColorTokenPath(darkPath)),
                            ],
                            "<br />",
                        ),
                    ),
                    text(lightValue),
                    text(darkValue),
                    text(description),
                ],
            ),
        },
        {
            heading: "Eksporterte bakgrunnsroller",
            description:
                "Semantiske bakgrunnstokens i `tokens.color.background.*`. Hver rad dokumenterer både lys og mørk verdi.",
            caption: "Eksporterte bakgrunnstokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedBackgroundTokens.map(({ path, lightValue, darkValue, description }) => [
                createDualColorSwatchExample(lightValue, darkValue),
                code(formatPublicColorTokenPath(path)),
                text(lightValue),
                text(darkValue),
                text(description),
            ]),
        },
        {
            heading: "Eksporterte alert-flater",
            description:
                "Statusflater for meldinger og varsler. Disse finnes som egne eksporterte bakgrunnstokens i Jøkul core.",
            caption: "Eksporterte alert-bakgrunner fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedAlertBackgroundTokens.map(({ path, lightValue, darkValue, description }) => [
                createDualColorSwatchExample(lightValue, darkValue),
                code(formatPublicColorTokenPath(path)),
                text(lightValue),
                text(darkValue),
                text(description),
            ]),
        },
        {
            heading: "Eksporterte tekstroller",
            description:
                "Semantiske tekstfarger fra `tokens.color.text.*`. Bruk disse når du jobber direkte mot Jøkul-tokenobjektet i JS eller TS.",
            caption: "Eksporterte tekstfarger fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedTextTokens.map(({ path, lightValue, darkValue, description }) => [
                createDualColorSwatchExample(lightValue, darkValue),
                code(formatPublicColorTokenPath(path)),
                text(lightValue),
                text(darkValue),
                text(description),
            ]),
        },
        {
            heading: "Eksporterte kantroller",
            description:
                "Semantiske kant- og separatorfarger fra `tokens.color.border.*`.",
            caption: "Eksporterte kantfarger fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedBorderTokens.map(({ path, lightValue, darkValue, description }) => [
                createDualColorSwatchExample(lightValue, darkValue),
                code(formatPublicColorTokenPath(path)),
                text(lightValue),
                text(darkValue),
                text(description),
            ]),
        },
        {
            heading: "Primitive",
            description:
                "Jøkuls konkrete fargepalett — merkevarefarger med faste hex-verdier. Bruk ikke disse direkte i komponentkode; bruk de semantiske tokenene som peker til dem.",
            caption: "Primitive fargetokens",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Navn"],
            rows: primitiveColorTokens.map(({ token, name }) => [
                createColorSwatchExample(`var(${token})`),
                code(token),
                text(name),
            ]),
        },
        {
            heading: "Bakgrunn",
            description:
                "Semantiske tokens for bakgrunns- og overflatefarger. Bytter verdi automatisk mellom lys og mørk modus.",
            caption: "Bakgrunns- og overflatefarger",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: backgroundTokens.map(({ token, description }) => [
                createColorSwatchExample(`var(${token})`),
                code(token),
                text(description),
            ]),
        },
        {
            heading: "Tekst",
            description:
                "Semantiske tokens for tekstfarger. Sørger for riktig kontrast mot bakgrunnen i begge temaer.",
            caption: "Semantiske tekstfarger",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: textTokens.map(({ token, description }) => [
                createTextExample(
                    "Abc",
                    {
                        color: `var(${token})`,
                        fontWeight: token.includes("default") ? "700" : undefined,
                        background: token.includes("inverted")
                            ? "var(--jkl-color-background-container-inverted)"
                            : token.includes("on-action")
                              ? "var(--jkl-color-background-action)"
                              : undefined,
                        padding:
                            token.includes("inverted") || token.includes("on-action")
                                ? "0 0.25rem"
                                : undefined,
                        borderRadius:
                            token.includes("inverted") || token.includes("on-action")
                                ? "var(--jkl-border-radius-xs)"
                                : undefined,
                    },
                    "text-color",
                ),
                code(token),
                text(description),
            ]),
        },
        {
            heading: "Kantlinje",
            description:
                "Semantiske tokens for streker, skillelinjer og innramminger av interaktive elementer.",
            caption: "Semantiske kantlinjefarger",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: borderTokens.map(({ token, description }) => [
                createLengthBarExample("100%", {
                    kind: "border-color",
                    thickness: "2px",
                    color: `var(${token})`,
                }),
                code(token),
                text(description),
            ]),
        },
        {
            heading: "Feedback",
            description:
                "Overflatefarger for statusmeldinger — suksess, advarsel, feil og info. Brukes som bakgrunn i Message- og SystemMessage-komponenter.",
            caption: "Feedback-overflatefarger",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Variant"],
            rows: feedbackSurfaceTokens.map(({ token, variant }) => [
                createColorSwatchExample(`var(${token})`),
                code(token),
                text(variant),
            ]),
        },
    ],
    scssSection: colorMixins,
    illustration: "farger",
    relatedComponents: ["tag", "message", "system-message"],
    resources: [
        {
            title: "WebAIM Contrast Checker",
            url: "https://webaim.org/resources/contrastchecker/",
            publisher: "WebAIM",
            relevance: 4,
            description: "Verktøy for å sjekke kontrast mellom tekst og bakgrunn.",
        },
        {
            title: "APCA Contrast Calculator",
            url: "https://www.myndex.com/APCA/",
            publisher: "Myndex",
            relevance: 3,
            description: "Alternativ kontrastmodell for mer presis vurdering.",
        },
        {
            title: "WCAG 2.1 — 1.4.3: Contrast (Minimum)",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Minstekrav til kontrast for tekst.",
        },
        {
            title: "WCAG 2.1 — 1.4.6: Contrast (Enhanced)",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Strengere kontrastkrav for forbedret lesbarhet.",
        },
        {
            title: "MDN: color-scheme",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme",
            publisher: "MDN",
            relevance: 3,
            description: "Hvordan nettleseren håndterer lys/mørk fargemodus.",
        },
        {
            title: "MDN: CSS custom properties",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/--*",
            publisher: "MDN",
            relevance: 3,
            description: "Grunnlaget for å definere og bruke fargetokens i CSS.",
        },
    ],
};

export default post;
