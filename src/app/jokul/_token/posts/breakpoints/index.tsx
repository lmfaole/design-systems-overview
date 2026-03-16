import { BreakpointsIllustration } from "@/shared/components/Illustration";
import { breakpointTokens, breakpointRanges } from "./tokens";
import { breakpointMixins } from "./mixins";
import type { TokenPost } from "../types";

const post: TokenPost = {
  id: 14,
  title: "Breakpoints",
  excerpt:
    "En referanse til Jøkuls fire breakpoints, navngitte skjermstørrelser og SCSS-mixin-er for responsiv layout — fra mobil til ekstra bred desktop.",
  tokenOverview: [
    {
      heading: "Breakpoints",
      description:
        "Jøkul definerer tre SCSS-variabler som deler skjermbredden inn i fire navngitte soner. Disse er ikke CSS custom properties — de finnes kun i SCSS og brukes via breakpoint-mixin-ene.",
      caption: "Jøkuls tre breakpoint-variabler",
      columns: ["SCSS-variabel", "Verdi", "Gjelder fra", "Typiske enheter"],
      rows: breakpointTokens.map(({ variable, value, range, devices }) => [
        <code key={`${variable}-var`}>{variable}</code>,
        <strong key={`${variable}-val`}>{value}</strong>,
        range,
        devices,
      ]),
    },
    {
      heading: "Soner",
      description:
        "De tre variablene gir fire navngitte soner. Preferér de navngitte mixin-ene (small-device, from-medium-device osv.) fremfor direkte bruk av variablene.",
      caption: "De fire skjermsonene og tilhørende mixin-er",
      columns: ["Sone", "Fra", "Til", "Mixin", "Bruksområde"],
      rows: breakpointRanges.map(({ name, min, max, mixin, usage }) => [
        <strong key={`${name}-n`}>{name}</strong>,
        min,
        max,
        <code key={`${name}-m`}>{mixin}</code>,
        usage,
      ]),
    },
  ],
  scssSection: breakpointMixins,
  illustration: <BreakpointsIllustration />,
  relatedComponents: [],
  resources: [
    {
      title: "MDN: Using media queries",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
      publisher: "MDN",
      relevance: 4,
      description: "Grunnleggende bruk av media queries.",
    },
    {
      title: "MDN: @container",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@container",
      publisher: "MDN",
      relevance: 3,
      description: "Container queries som supplement til breakpoints.",
    },
    {
      title: "Mobile First — Luke Wroblewski",
      url: "https://www.lukew.com/ff/entry.asp?933",
      publisher: "Luke Wroblewski",
      relevance: 3,
      description: "Prinsippet om å starte design i mobilformat.",
    },
    {
      title: "WCAG 2.1 — 1.3.4: Orientation",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/orientation.html",
      publisher: "W3C/WAI",
      relevance: 4,
      description: "Krav om at innhold ikke låses til én orientering.",
    },
    {
      title: "WCAG 2.1 — 1.4.10: Reflow",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/reflow.html",
      publisher: "W3C/WAI",
      relevance: 4,
      description: "Krav om at innhold fungerer ved smale visninger.",
    },
  ],
};

export default post;
