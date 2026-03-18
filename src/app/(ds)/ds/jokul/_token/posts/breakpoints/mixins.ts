import type { ScssMixin } from "../types";

export const breakpointMixins: ScssMixin[] = [
  {
    name: "small-device",
    description:
      "CSS som kun gjelder for små skjermer (0–679px). Bruk for mobiltilpasninger og forenklede layouter.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde på små skjermer.",
      },
    ],
    properties: [
      {
        name: "@media screen and (max-width: 679px)",
        description: "Wrapper innholdet i riktig media query for små skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.sidebar {
    display: block;

    @include jkl.small-device {
        display: none;
    }
}`,
  },
  {
    name: "medium-device",
    description:
      "CSS som kun gjelder for mellomstore skjermer (680–1199px). Bruk for nettbrett-tilpasninger.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde på mellomstore skjermer.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: 680px) and (max-width: 1199px)",
        description:
          "Wrapper innholdet i riktig media query for mellomstore skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.grid {
    grid-template-columns: 1fr;

    @include jkl.medium-device {
        grid-template-columns: repeat(2, 1fr);
    }
}`,
  },
  {
    name: "from-medium-device",
    description:
      "CSS som gjelder fra 680px og oppover (medium + large + xl). Den vanligste breakpoint-mixinen i Jøkul — brukes til å progressivt forbedre layouten.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som skal gjelde fra og med medium skjermstørrelse.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: 680px)",
        description:
          "Wrapper innholdet i riktig media query for medium og større skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--jkl-spacing-m);

    @include jkl.from-medium-device {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--jkl-spacing-l);
    }
}`,
  },
  {
    name: "large-device",
    description:
      "CSS som kun gjelder for store skjermer (1200–1599px). Bruk når du trenger eksakt kontroll over desktop-versjonen uten å påvirke xl.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde på store skjermer.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: 1200px) and (max-width: 1599px)",
        description: "Wrapper innholdet i riktig media query for store skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.page-layout {
    @include jkl.large-device {
        grid-template-columns: 280px 1fr;
    }
}`,
  },
  {
    name: "from-large-device",
    description:
      "CSS som gjelder fra 1200px og oppover (large + xl). Ideell for desktop-spesifikke layouts som skal gjelde på alle store skjermer.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som skal gjelde fra og med store skjermer.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: 1200px)",
        description:
          "Wrapper innholdet i riktig media query for large og større skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.page-layout {
    @include jkl.from-large-device {
        grid-template-columns: 280px 1fr 240px;
        max-width: 1440px;
        margin-inline: auto;
    }
}`,
  },
  {
    name: "xl-device",
    description:
      "CSS som gjelder fra 1600px og oppover. Bruk sparsomt — vurder heller en maks-bredde-begrensning i stedet for en ny layout-tier.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description: "CSS som skal gjelde fra og med xl-skjermer.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: 1600px)",
        description: "Wrapper innholdet i riktig media query for xl-skjermer.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.content-area {
    max-width: 1440px;

    @include jkl.xl-device {
        max-width: 1920px;
    }
}`,
  },
  {
    name: "screen-from",
    description:
      "Generisk min-width media query. Bruk de navngitte mixin-ene (from-medium-device osv.) når mulig — reserver screen-from for spesielle tilfeller.",
    arguments: [
      {
        name: "$min",
        type: "length",
        description: "Minste bredde (inkludert) der innholdet skal gjelde.",
      },
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde fra og med $min.",
      },
    ],
    properties: [
      {
        name: "@media screen and (min-width: $min)",
        description: "Wrapper innholdet i en generisk min-width media query.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.component {
    @include jkl.screen-from(900px) {
        display: grid;
    }
}`,
  },
  {
    name: "screen-to",
    description:
      "Generisk max-width media query (eksklusiv — maks er $max - 1px). Bruk small-device der det passer.",
    arguments: [
      {
        name: "$max",
        type: "length",
        description: "Maks bredde (eksklusiv, siden maks er $max - 1px).",
      },
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde opp til (men ikke inkludert) $max.",
      },
    ],
    properties: [
      {
        name: "@media screen and (max-width: $max - 1px)",
        description: "Wrapper innholdet i en generisk max-width media query.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.banner {
    @include jkl.screen-to(400px) {
        font-size: var(--jkl-font-size-3);
    }
}`,
  },
  {
    name: "screen-between",
    description:
      "Generisk min/max media query. Maksverdien er eksklusiv ($max - 1px). Bruk kun når et navngitt breakpoint ikke dekker behovet.",
    arguments: [
      {
        name: "$min",
        type: "length",
        description: "Minste bredde (inkludert) der innholdet skal gjelde.",
      },
      {
        name: "$max",
        type: "length",
        description: "Maks bredde (eksklusiv, siden maks er $max - 1px).",
      },
      {
        name: "@content",
        type: "block",
        description: "CSS som kun skal gjelde mellom $min og $max.",
      },
    ],
    properties: [
      {
        name:
          "@media screen and (min-width: $min) and (max-width: $max - 1px)",
        description: "Wrapper innholdet i en generisk min/max media query.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.tooltip {
    @include jkl.screen-between(400px, 680px) {
        position: static;
    }
}`,
  },
];
