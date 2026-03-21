import { code, joinHtml, span, strong, text } from "@/lib/html";
import {
    exportedFontSizeTokens,
    exportedFontWeightTokens,
    exportedIconWeightTokens,
    exportedLineHeightStepTokens,
    exportedSemanticLineHeightTokens,
    exportedTypographyStyleTokens,
    fontSizeReference,
    fontWeightReference,
    formatPublicTypographyTokenPath,
    lineHeightReference,
} from "./tokens";
import { typographyMixins } from "./mixins";
import {
    createLineHeightExample,
    createTextExample,
} from "../_shared/table-examples";
import type { TokenPost } from "../types";

const post: TokenPost = {
    id: 10,
    title: "Typografi",
    excerpt:
        "En grundig gjennomgang av Jøkuls typografisystem: Fremtind Grotesk, typografiskalaen, CSS-variabler, linjelengde og responsiv bruk.",
    tokenOverview: [
        {
            heading: "Eksporterte font-size-verdier",
            description:
                "Jøkul eksporterer font-størrelsene i `@fremtind/jokul/core` som `tokens.typography.font.size.*`.",
            caption: "Eksporterte font-size-tokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedFontSizeTokens.map(({ path, value, usage }) => [
                createTextExample("Aa", { fontSize: value, lineHeight: 1, fontWeight: "700" }, "font-size"),
                code(formatPublicTypographyTokenPath(path)),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Eksporterte line-height-verdier",
            description:
                "Den rå line-height-skalaen i Jøkul, eksportert som `tokens.typography.line.height.*`.",
            caption: "Eksporterte line-height-trinn fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedLineHeightStepTokens.map(({ path, value, usage }) => [
                createLineHeightExample(value),
                code(formatPublicTypographyTokenPath(path)),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Eksporterte semantiske line-height-tokens",
            description:
                "Navngitte line-height-tokens for typiske bruksområder som kompakt UI-tekst og løpende brødtekst.",
            caption: "Eksporterte semantiske line-height-tokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedSemanticLineHeightTokens.map(({ path, value, usage }) => [
                createLineHeightExample(value),
                code(formatPublicTypographyTokenPath(path)),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Eksporterte vekt-tokens",
            description:
                "Tekstvekter eksporteres både som `tokens.typography.weight.*` og `tokens.typography.font.weight.*`.",
            caption: "Eksporterte font-weight-tokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedFontWeightTokens.map(({ path, aliasPath, value, usage }) => [
                createTextExample("Aa", { fontSize: "var(--jkl-font-size-4)", fontWeight: value }, "font-weight"),
                span(
                    joinHtml(
                        [
                            code(formatPublicTypographyTokenPath(path)),
                            aliasPath ? code(formatPublicTypographyTokenPath(aliasPath)) : null,
                        ],
                        "<br />",
                    ),
                ),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Eksporterte ikonvekter",
            description:
                "Ikonvektene i Jøkul ligger i samme tokenobjekt og påvirker blant annet material-symboler og ikonografi.",
            caption: "Eksporterte ikonvekt-tokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedIconWeightTokens.map(({ path, value, usage }) => [
                createTextExample("◎", { fontSize: "var(--jkl-font-size-5)", fontWeight: value }, "icon-weight"),
                code(formatPublicTypographyTokenPath(path)),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Eksporterte typografistiler",
            description:
                "Jøkul eksporterer navngitte tekststiler som samler font-size, line-height og font-weight for `small` og `base`.",
            caption: "Eksporterte typografistiler fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Stil", "Eksport", "Small", "Base", "Bruksområde"],
            rows: exportedTypographyStyleTokens.map(({ name, path, aliasPath, small, base, usage }) => [
                createTextExample(
                    "Aa",
                    {
                        fontSize: base.fontSize,
                        lineHeight: base.lineHeight,
                        fontWeight: base.fontWeight,
                    },
                    "typography-style",
                ),
                strong(name),
                span(
                    joinHtml(
                        [
                            code(formatPublicTypographyTokenPath(path)),
                            aliasPath ? code(formatPublicTypographyTokenPath(aliasPath)) : null,
                        ],
                        "<br />",
                    ),
                ),
                span(
                    joinHtml(
                        [code(small.fontSize), code(small.lineHeight), code(small.fontWeight)],
                        "<br />",
                    ),
                ),
                span(
                    joinHtml(
                        [code(base.fontSize), code(base.lineHeight), code(base.fontWeight)],
                        "<br />",
                    ),
                ),
                text(usage),
            ]),
        },
        {
            heading: "Størrelse",
            description:
                "Ti trinn fra micro til display. Bruk alltid disse tokenene fremfor hardkodede verdier for å sikre konsistent typografisk hierarki.",
            caption: "Font-size tokens — 10 trinn fra micro til display",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Verdi", "Stil-rolle", "Bruksområde"],
            rows: fontSizeReference.map(({ token, value, role, usage }) => [
                createTextExample("Aa", { fontSize: `var(${token})`, lineHeight: 1 }, "font-size"),
                code(token),
                text(value),
                text(role),
                text(usage),
            ]),
        },
        {
            heading: "Linjehøyde",
            description:
                "Tre nivåer som kontrollerer luft mellom tekstlinjer. Velg basert på tekstlengde og leseformål.",
            caption: "Line-height tokens — tre nivåer",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Token", "Verdi", "Bruksområde"],
            rows: lineHeightReference.map(({ token, value, usage }) => [
                createLineHeightExample(`var(${token})`),
                code(token),
                text(value),
                text(usage),
            ]),
        },
        {
            heading: "Vekt",
            description:
                "To vektnivåer — normal for brødtekst, bold for overskrifter og fremheving. Bruk sparsomt for å bevare hierarki.",
            caption: "Font-weight tokens — to vektnivåer",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Token", "Verdi", "Bruksområde"],
            rows: fontWeightReference.map(({ token, value, usage }) => [
                createTextExample(
                    "Aa",
                    {
                        fontSize: "var(--jkl-font-size-4)",
                        fontWeight: `var(${token})`,
                    },
                    "font-weight",
                ),
                code(token),
                text(value),
                text(usage),
            ]),
        },
    ],
    scssSection: typographyMixins,
    illustration: "typografi",
    relatedComponents: ["text-input", "text-area"],
    resources: [
        {
            title: "MDN: font-size",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size",
            publisher: "MDN",
            relevance: 4,
            description: "Grunnleggende om font-størrelser i CSS.",
        },
        {
            title: "MDN: line-height",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/line-height",
            publisher: "MDN",
            relevance: 4,
            description: "Hvordan linjehøyde påvirker lesbarhet.",
        },
        {
            title: "MDN: font-weight",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight",
            publisher: "MDN",
            relevance: 3,
            description: "Bruk av font-vekter i CSS.",
        },
        {
            title: "WCAG 2.1 — 1.4.4: Resize Text",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Krav til at tekst skal kunne forstørres.",
        },
        {
            title: "WCAG 2.1 — 1.4.12: Text Spacing",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Krav til at tekst tåler økt linje- og bokstavavstand.",
        },
        {
            title: "Practical Typography — Matthew Butterick",
            url: "https://practicaltypography.com/",
            publisher: "Practical Typography",
            relevance: 3,
            description: "Praktiske råd om typografisk kvalitet.",
        },
    ],
};

export default post;
