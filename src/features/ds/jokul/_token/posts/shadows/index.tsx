import type { TokenPost } from "../types";
import { ShadowIllustration } from "./ShadowIllustration";
import { createShadowExample } from "../_shared/table-examples";
import { shadowTokens } from "./tokens";

const post: TokenPost = {
  id: 21,
  title: "Skygger",
  excerpt:
    "SCSS-variabler for skygger i Jøkul. Bruk dem når elevasjon og klikkbarhet må signaliseres tydelig, men sparsomt.",
  tokenOverview: [
    {
      heading: "Skyggevariabler",
      description:
        "Jøkul eksporterer skygger som SCSS-variabler fra `@fremtind/jokul/styles/core/jkl`. De er ikke en del av `@fremtind/jokul/core`-tokenobjektet, men de er fortsatt del av den stilistiske kontrakten i SCSS.",
      caption: "SCSS-variabler for skygger i Jøkul",
      exampleColumnIndex: 0,
      columns: ["Eksempel", "SCSS-variabel", "Verdi", "Status", "Bruksområde"],
      rows: shadowTokens.map(({ variable, value, status, usage }) => [
        createShadowExample(value),
        <code key={`${variable}-name`}>{variable}</code>,
        <code key={`${variable}-value`}>{value}</code>,
        status === "deprecated" ? "Deprecated" : "Stable",
        usage,
      ]),
    },
  ],
  illustration: <ShadowIllustration />,
  relatedComponents: ["card", "menu", "modal"],
  resources: [
    {
      title: "MDN: box-shadow",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
      publisher: "MDN",
      relevance: 4,
      description: "Hvordan box-shadow fungerer i CSS og hvilke visuelle effekter den gir.",
    },
    {
      title: "Material Design: Elevation",
      url: "https://m3.material.io/styles/elevation/overview",
      publisher: "Material Design",
      relevance: 3,
      description: "Retningslinjer for når og hvordan elevasjon bør brukes i et designsystem.",
    },
    {
      title: "WCAG 2.2 — Focus Appearance",
      url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html",
      publisher: "W3C/WAI",
      relevance: 4,
      description: "Skygger må ikke være eneste signal for fokus eller interaktivitet.",
    },
  ],
};

export default post;
