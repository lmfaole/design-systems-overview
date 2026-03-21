import {SpacingIllustration} from "@/features/ds/jokul/_shared/components/Illustration";
import {
    exportedSemanticSpacingTokens,
    exportedSpacingScaleTokens,
    formatPublicSpacingTokenPath,
    spacingTokens,
    unitTokens,
} from "./tokens";
import {spacingMixins} from "./mixins";
import {createLengthBarExample} from "../_shared/table-examples";
import type {TokenPost} from "../types";

const post: TokenPost = {
    id: 12,
    title: "Spacing",
    excerpt: "Komplett referanse til Jøkuls spacing-skala og CSS-variabler.",
    tokenOverview: [
        {
            heading: "Eksportert grunnskala",
            description:
                "Disse tokenene eksporteres fra `@fremtind/jokul/core` som `tokens.spacing.*` og er den rå numeriske spacing-skalaen i Jøkul.",
            caption: "Eksporterte spacing-verdier fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedSpacingScaleTokens.map(({path, value, usage}) => [
                createLengthBarExample(value),
                <code key={`${path}-token`}>{formatPublicSpacingTokenPath(path)}</code>,
                value,
                usage,
            ]),
        },
        {
            heading: "Eksportert semantisk spacing",
            description:
                "Disse tokenene eksporteres som `tokens.semanticSpacing.*` og er de navngitte spacing-verdiene du bør bruke i komponent-API-er og tokensystemer.",
            caption: "Eksporterte semantiske spacing-tokens fra Jøkul core",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "Verdi", "Bruksområde"],
            rows: exportedSemanticSpacingTokens.map(({path, value, usage}) => [
                createLengthBarExample(value),
                <code key={`${path}-token`}>{formatPublicSpacingTokenPath(path)}</code>,
                value,
                usage,
            ]),
        },
        {
            heading: "Spacing-skala",
            description:
                "Navngitte semantiske tokens basert på et 8-punkts grid. Bruk disse i komponenter og layouter for konsistent visuell rytme.",
            caption: "Spacing-skalaen — alle tilgjengelige tokens",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Verdi", "Bruksområde"],
            rows: spacingTokens.map(({name, token, px, usage}) => [
                createLengthBarExample(`var(${token})`),
                <code key={`${name}-token`}>{token}</code>,
                px,
                usage,
            ]),
        },
        {
            heading: "Unit-skala",
            description:
                "Primitive størrelsesenheter som skalerer responsivt med --jkl-unit-base (0.5rem / 8px på desktop). Brukes internt i Jøkul-komponenter og for presist layout-arbeid.",
            caption: "Unit-tokens — grunnleggende størrelsesenheter",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Token", "Multiplier", "px", "rem"],
            rows: unitTokens.map(({token, multiplier, px, rem}) => [
                createLengthBarExample(`var(${token})`, {kind: "unit", thickness: "0.5rem"}),
                <code key={`${token}-name`}>{token}</code>,
                multiplier,
                px,
                rem,
            ]),
        },
    ],
    scssSection: spacingMixins,
    illustration: <SpacingIllustration/>,
    relatedComponents: [],
    resources: [
        {
            title: "The 8-Point Grid System",
            url: "https://spec.fm/specifics/8-pt-grid",
            publisher: "Spec.fm",
            relevance: 4,
            description: "Bakgrunn for 8‑punkts grid og spacing‑skalaer.",
        },
        {
            title: "MDN: gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            publisher: "MDN",
            relevance: 4,
            description: "Bruk av gap i grid/flex‑layouter.",
        },
        {
            title: "MDN: padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            publisher: "MDN",
            relevance: 3,
            description: "Hvordan padding påvirker layout og spacing.",
        },
        {
            title: "MDN: margin",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
            publisher: "MDN",
            relevance: 3,
            description: "Hvordan margin styrer mellomrom mellom elementer.",
        },
        {
            title: "Spacing, Grids and Layouts — Material Design",
            url: "https://m3.material.io/foundations/layout/understanding-layout/spacing",
            publisher: "Material Design",
            relevance: 3,
            description: "Retningslinjer for spacing i design‑systemer.",
        },
    ],
};

export default post;
