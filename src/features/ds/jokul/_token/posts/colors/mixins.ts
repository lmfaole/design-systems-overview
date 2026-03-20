import type { ScssMixin } from "../types";

export const colorMixins: ScssMixin[] = [
  {
    name: "light-mode-variables",
    description:
      "Wrapper for å definere CSS-variabler som kun gjelder i lyst tema. Innholdet plasseres på :root når brukeren har lyst system-tema, og på [data-theme=\"light\"].",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS-variabler (og ev. andre deklarasjoner) for lyst tema.",
      },
    ],
    properties: [
      {
        name: "@media screen and (prefers-color-scheme: light)",
        description: "Legger innholdet på :root når systemtema er lyst.",
      },
      {
        name: "[data-theme=\"light\"]",
        description: "Legger innholdet på eksplisitt light theme override.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

@include jkl.light-mode-variables {
    --my-component-bg: #ffffff;
    --my-component-text: #1a1a1a;
}`,
  },
  {
    name: "dark-mode-variables",
    description:
      "Wrapper for å definere CSS-variabler som kun gjelder i mørkt tema. Innholdet plasseres på :root når brukeren har mørkt system-tema, og på [data-theme=\"dark\"].",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS-variabler (og ev. andre deklarasjoner) for mørkt tema.",
      },
    ],
    properties: [
      {
        name: "@media screen and (prefers-color-scheme: dark)",
        description: "Legger innholdet på :root når systemtema er mørkt.",
      },
      {
        name: "[data-theme=\"dark\"]",
        description: "Legger innholdet på eksplisitt dark theme override.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

@include jkl.dark-mode-variables {
    --my-component-bg: #1a1a1a;
    --my-component-text: #ffffff;
}`,
  },
  {
    name: "forced-colors-mode",
    description:
      "Wrapper for @media (forced-colors: active). Bruk for å legge til fallbacks for brukere med Windows High Contrast-modus eller andre høykontrasttemaer.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde i Forced Colors-modus.",
      },
    ],
    properties: [
      {
        name: "@media screen and (forced-colors: active)",
        description: "Wrapper innholdet i forced-colors media query.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    @include jkl.forced-colors-mode {
        outline: 2px solid ButtonText;
        box-shadow: none;
    }
}`,
  },
  {
    name: "forced-colors-svg-fallback",
    description:
      "Hjelper for å sette riktig stroke/fill på SVG-er i Forced Colors-modus (spesielt for Chrome). Bruk når et ikon blir usynlig fordi currentColor ikke tolkes som forventet i høykontrast.",
    arguments: [
      {
        name: "$stroke",
        type:
          "\"Canvas\" | \"CanvasText\" | \"LinkText\" | \"GrayText\" | \"Highlight\" | \"HighlightText\" | \"ButtonFace\" | \"ButtonText\"",
        description: "Systemfarge som brukes for stroke i Forced Colors-modus.",
      },
      {
        name: "$fill",
        type:
          "\"Canvas\" | \"CanvasText\" | \"LinkText\" | \"GrayText\" | \"Highlight\" | \"HighlightText\" | \"ButtonFace\" | \"ButtonText\" | null",
        optional: true,
        defaultValue: "null",
        description: "Systemfarge som brukes for fill (valgfri).",
      },
    ],
    properties: [
      {
        name: "@media screen and (forced-colors: active)",
        description: "Setter forced-colors fallbacks inne i riktig media query.",
      },
      {
        name: "stroke / fill",
        description: "Setter stroke/fill på gjeldende selector, og på svg/path children.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.icon {
    color: var(--jkl-color-text-default);
}

// Sikrer at SVG-ikonet får lesbar farge i forced-colors
.icon {
    @include jkl.forced-colors-svg-fallback("ButtonText");
}`,
  },
];
