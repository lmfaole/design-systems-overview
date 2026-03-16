import { SpacingIllustration } from "@/shared/components/Illustration";
import { spacingTokens, unitTokens } from "./tokens";
import { spacingMixins } from "./mixins";
import type { TokenPost } from "../types";

const post: TokenPost = {
  id: 12,
  title: "Spacing",
  excerpt: "Komplett referanse til Jøkuls spacing-skala og CSS-variabler.",
  tokenOverview: [
    {
      heading: "Spacing-skala",
      description:
        "Navngitte semantiske tokens basert på et 8-punkts grid. Bruk disse i komponenter og layouter for konsistent visuell rytme.",
      caption: "Spacing-skalaen — alle tilgjengelige tokens",
      columns: ["Forhåndsvisning", "Token", "Verdi", "Bruksområde"],
      rows: spacingTokens.map(({ name, token, px, usage }) => [
        <div
          key={`${name}-bar`}
          aria-hidden
          style={{
            height: "12px",
            width: `var(${token})`,
            minWidth: "4px",
            background: "var(--jkl-color-background-action)",
            borderRadius: "2px",
          }}
        />,
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
      columns: ["Forhåndsvisning", "Token", "Multiplier", "px", "rem"],
      rows: unitTokens.map(({ token, multiplier, px, rem }) => [
        <div
          key={`${token}-bar`}
          aria-hidden
          style={{
            height: "8px",
            width: px === "0px" ? "2px" : `var(${token})`,
            maxWidth: "100%",
            background: "var(--jkl-color-background-action)",
            borderRadius: "2px",
            opacity: px === "0px" ? 0.2 : 1,
          }}
        />,
        <code key={`${token}-name`}>{token}</code>,
        multiplier,
        px,
        rem,
      ]),
    },
  ],
  scssSection: spacingMixins,
  illustration: <SpacingIllustration />,
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
