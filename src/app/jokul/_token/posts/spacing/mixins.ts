import type { ScssMixin } from "../types";

export const spacingMixins: ScssMixin[] = [
  {
    name: "spacing",
    description:
      "Setter margin basert på Jøkuls spacing-skala. Du kan angi ett, to eller tre steg adskilt med '/' for responsiv spacing (liten / medium / stor skjerm). Valgfri $position-parameter begrenser marginen til én side.",
    arguments: [
      {
        name: "$steps",
        type: "string",
        description:
          "Spacing-steg (ett, to eller tre) adskilt med '/'. Eksempel: \"16/24/40\".",
      },
      {
        name: "$position",
        type: "\"top\" | \"right\" | \"bottom\" | \"left\" | null",
        optional: true,
        defaultValue: "null",
        description:
          "Begrenser margin til en side (f.eks. kun margin-top). Når null settes alle sider via margin.",
      },
    ],
    properties: [
      {
        name: "margin / margin-*",
        description:
          "Setter margin basert på Jøkuls spacing-skala, responsivt over breakpoints.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.section {
    // 40px på mobil, 64px fra medium skjerm og opp
    @include jkl.spacing("40/64");
}

.card + .card {
    // Kun margin-top, tre steg
    @include jkl.spacing("16/24/40", "top");
}`,
  },
  {
    name: "data-size-variables",
    description:
      "Wrapper for å definere CSS-variabler som varierer med [data-size]. Bruk for å tilby en kompakt/standard romlighet uten å duplisere selectors.",
    arguments: [
      {
        name: "$size",
        type: "string | null",
        optional: true,
        defaultValue: "null",
        description:
          "Hvis satt, bruker mixinen kun den spesifikke [data-size=\"...\"]-varianten. Hvis null, gjelder den for :root og [data-size].",
      },
      {
        name: "@content",
        type: "block",
        description: "CSS-variabler (og ev. andre deklarasjoner) for valgt size.",
      },
    ],
    properties: [
      {
        name: ":root, [data-size]",
        description:
          "Wrapper innholdet slik at variabler kan styres via data-size (f.eks. compact/comfortable).",
      },
      {
        name: "[data-size=\"<size>\"]",
        description: "Når $size er satt, wrapper den kun for den størrelsen.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

@include jkl.data-size-variables {
    --my-component-padding: var(--jkl-spacing-m);
}

@include jkl.data-size-variables("compact") {
    --my-component-padding: var(--jkl-spacing-s);
}

.my-component {
    padding: var(--my-component-padding);
}`,
  },
];
