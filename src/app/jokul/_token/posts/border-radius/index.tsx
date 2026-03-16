import { BorderRadiusIllustration } from "@/shared/components/Illustration";
import { borderRadiusTokens } from "./tokens";
import type { TokenPost } from "../types";

const post: TokenPost = {
  id: 20,
  title: "Kantradiuser",
  excerpt: "Seks trinn fra ingen avrunding til full pille-form — konsekvent form på tvers av alle Jøkul-komponenter.",
  tokenOverview: [
    {
      description:
        "Kantradiuser definerer graden av avrunding på hjørnene til komponenter. Skalaen går fra skarpe kanter til fullstendig rundede former, og hvert trinn har et definert bruksområde.",
      caption: "Alle border-radius-tokens",
      columns: ["Forhåndsvisning", "Token", "Verdi", "Rem", "Bruksområde"],
      rows: borderRadiusTokens.map(({ token, value, rem, usage }) => [
        <div
          key={`${token}-preview`}
          aria-hidden
          style={{
            width: "48px",
            height: "48px",
            background: "var(--jkl-color-background-action)",
            borderRadius: `var(${token})`,
            flexShrink: 0,
          }}
        />,
        <code key={`${token}-name`}>{token}</code>,
        value,
        rem,
        usage,
      ]),
    },
  ],
  illustration: <BorderRadiusIllustration />,
  relatedComponents: ["button", "card", "chip", "modal", "popover"],
  resources: [
    {
      title: "MDN: border-radius",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
      publisher: "MDN",
      relevance: 4,
      description: "CSS-egenskapen som styrer avrunding i hjørner.",
    },
  ],
};

export default post;
