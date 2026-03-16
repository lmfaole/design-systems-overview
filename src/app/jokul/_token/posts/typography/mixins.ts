import type { ScssMixin } from "../types";

export const typographyMixins: ScssMixin[] = [
  {
    name: "text-style",
    description:
      "Setter font-size, line-height og font-weight for et navngitt typografisk stil-navn. Dette er den anbefalte måten å anvende Jøkuls typografiskala på i egne komponenter.",
    arguments: [
      {
        name: "$style",
        type:
          "\"title\" | \"title-small\" | \"heading-1\" | \"heading-2\" | \"heading-3\" | \"heading-4\" | \"heading-5\" | \"paragraph-medium\" | \"small\" | ...",
        description: "Navn på typografisk stil fra Jøkul.",
      },
      {
        name: "@content",
        type: "block",
        optional: true,
        description:
          "Valgfri blokk for overrides (f.eks. justere font-weight innen samme text-style).",
      },
    ],
    properties: [
      {
        name: "font-size",
        description: "Settes basert på valgt typografisk stil.",
      },
      {
        name: "line-height",
        description: "Settes basert på valgt typografisk stil.",
      },
      {
        name: "font-weight",
        description: "Settes basert på valgt typografisk stil.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.my-heading {
    @include jkl.text-style("heading-2");
}

// Med override via @content
.my-bold-body {
    @include jkl.text-style("paragraph-medium") {
        font-weight: jkl.$typography-weight-bold;
    }
}`,
  },
  {
    name: "no-grow-bold",
    description:
      "Gjør tekst fet uten at elementet endrer bredde på skjermen. Nyttig for hover- og selected-tilstander der du vil unngå layout-shift.",
    arguments: [],
    properties: [
      {
        name: "font-weight",
        description: "Setter bold uten (vesentlig) endring i bredde.",
      },
      {
        name: "letter-spacing",
        description: "Justeres for å motvirke layout-shift ved fet tekst.",
      },
      {
        name: "--jkl-icon-weight",
        description: "Setter ikon-vekt til bold for konsistent uttrykk.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.nav-item--active {
    @include jkl.no-grow-bold;
}`,
  },
  {
    name: "declare-font-variables",
    description:
      "Deklarer egne font-variabler (font-size/line-height/font-weight) basert på Jøkuls tokens. Passer når du vil gjenbruke samme nivå i flere selectors uten å kopiere var(--jkl-...).",
    arguments: [
      {
        name: "$name",
        type: "string",
        description:
          "Base-navn på variablene. Postfixes med -font-size, -line-height og -font-weight.",
      },
      {
        name: "$level",
        type:
          "\"title\" | \"title-small\" | \"heading-1\" | \"heading-2\" | \"heading-3\" | \"heading-4\" | \"heading-5\" | \"body\" | \"small\"",
        description: "Nivå i fontskalaen variablene skal peke til.",
      },
    ],
    properties: [
      {
        name: "--<name>-font-size",
        description: "Deklarerer CSS-variabel for font-size basert på Jøkul tokens.",
      },
      {
        name: "--<name>-line-height",
        description: "Deklarerer CSS-variabel for line-height basert på Jøkul tokens.",
      },
      {
        name: "--<name>-font-weight",
        description: "Deklarerer CSS-variabel for font-weight basert på Jøkul tokens.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

:root {
    @include jkl.declare-font-variables("my-component-title", "heading-3");
}

.my-component__title {
    @include jkl.use-font-variables("my-component-title");
}`,
  },
  {
    name: "use-font-variables",
    description:
      "Bruk font-variabler du har laget med declare-font-variables. Setter font-size, line-height og font-weight fra CSS-variabler.",
    arguments: [
      {
        name: "$name",
        type: "string",
        description:
          "Base-navn på variablene (samme $name som i declare-font-variables).",
      },
    ],
    properties: [
      {
        name: "font-size",
        description: "Settes fra --<name>-font-size.",
      },
      {
        name: "line-height",
        description: "Settes fra --<name>-line-height.",
      },
      {
        name: "font-weight",
        description: "Settes fra --<name>-font-weight.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.my-component__subtitle {
    @include jkl.use-font-variables("my-component-title");
}`,
  },
  {
    name: "use-font-family",
    description:
      "Setter font-family med korrekte fallback-fonter for Fremtind Grotesk, Fremtind Grotesk Display, Fremtind Grotesk Mono eller Fremtind Material Symbols.",
    arguments: [
      {
        name: "$font",
        type:
          "\"Fremtind Grotesk\" | \"Fremtind Grotesk Display\" | \"Fremtind Grotesk Mono\" | \"Fremtind Material Symbols\"",
        description: "Fontfamilie som skal brukes (med riktige fallbacks).",
      },
    ],
    properties: [
      {
        name: "font-family",
        description: "Settes til valgt fontfamilie med anbefalte fallbacks.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.code-snippet {
    @include jkl.use-font-family("Fremtind Grotesk Mono");
}`,
  },
];
