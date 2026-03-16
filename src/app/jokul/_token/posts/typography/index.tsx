import { TypographyIllustration } from "@/shared/components/Illustration";
import { fontSizeReference, lineHeightReference, fontWeightReference } from "./tokens";
import { typographyMixins } from "./mixins";
import type { TokenPost } from "../types";

const post: TokenPost = {
  id: 10,
  title: "Typografi",
  excerpt:
    "En grundig gjennomgang av Jøkuls typografisystem: Fremtind Grotesk, typografiskalaen, CSS-variabler, linjelengde og responsiv bruk.",
  tokenOverview: [
    {
      heading: "Størrelse",
      description:
        "Ti trinn fra micro til display. Bruk alltid disse tokenene fremfor hardkodede verdier for å sikre konsistent typografisk hierarki.",
      caption: "Font-size tokens — 10 trinn fra micro til display",
      columns: ["Forhåndsvisning", "Token", "Verdi", "Stil-rolle", "Bruksområde"],
      rows: fontSizeReference.map(({ token, value, role, usage }) => [
        <span
          key={`${token}-preview`}
          aria-hidden
          style={{ fontSize: `var(${token})`, lineHeight: 1, display: "block" }}
        >
          Aa
        </span>,
        <code key={`${token}-code`}>{token}</code>,
        value,
        role,
        usage,
      ]),
    },
    {
      heading: "Linjehøyde",
      description:
        "Tre nivåer som kontrollerer luft mellom tekstlinjer. Velg basert på tekstlengde og leseformål.",
      caption: "Line-height tokens — tre nivåer",
      columns: ["Token", "Verdi", "Bruksområde"],
      rows: lineHeightReference.map(({ token, value, usage }) => [
        <code key={`${token}-code`}>{token}</code>,
        value,
        usage,
      ]),
    },
    {
      heading: "Vekt",
      description:
        "To vektnivåer — normal for brødtekst, bold for overskrifter og fremheving. Bruk sparsomt for å bevare hierarki.",
      caption: "Font-weight tokens — to vektnivåer",
      columns: ["Token", "Verdi", "Bruksområde"],
      rows: fontWeightReference.map(({ token, value, usage }) => [
        <code key={`${token}-code`}>{token}</code>,
        value,
        usage,
      ]),
    },
  ],
  scssSection: typographyMixins,
  illustration: <TypographyIllustration />,
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
