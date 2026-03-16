import type { ScssMixin } from "../types";

export const motionMixins: ScssMixin[] = [
  {
    name: "motion",
    description:
      "Setter transition-timing-function og transition-duration i ett kall. Kombinerer en easing- og en timing-token. Sender du egenskapsnavn som ekstra argumenter settes også transition-property.",
    arguments: [
      {
        name: "$name",
        type: "string",
        optional: true,
        defaultValue: "\"standard\"",
        description: "Navn på easing-kurven (motion easing token).",
      },
      {
        name: "$mode",
        type: "string",
        optional: true,
        defaultValue: "\"productive\"",
        description: "Navn på varighet/timing (motion timing token).",
      },
      {
        name: "$properties...",
        type: "list",
        optional: true,
        description:
          "Valgfri liste med CSS-egenskaper. Når satt, blir transition-property begrenset til disse.",
      },
    ],
    properties: [
      {
        name: "transition-timing-function",
        description: "Settes basert på valgt easing-token.",
      },
      {
        name: "transition-duration",
        description: "Settes basert på valgt timing-token.",
      },
      {
        name: "transition-property",
        description:
          "Settes når du sender med $properties..., ellers lar du den styres separat.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.button {
    @include jkl.motion("standard", "energetic", background-color, transform);
}

// Kun timing og easing — ingen property-begrensning
.panel {
    transition-property: all;
    @include jkl.motion("entrance", "productive");
}`,
  },
  {
    name: "prefers-reduced-motion",
    description:
      "Wrapper-mixin for @media (prefers-reduced-motion: reduce). Bruk den til å fjerne eller forenkle animasjoner for brukere som ber om redusert bevegelse.",
    arguments: [
      {
        name: "@content",
        type: "block",
        description:
          "CSS som kun skal gjelde når brukeren foretrekker redusert bevegelse.",
      },
    ],
    properties: [
      {
        name: "@media screen and (prefers-reduced-motion: reduce)",
        description: "Wrapper innholdet i riktig media query.",
      },
    ],
    example: `@use "@fremtind/jokul/styles/core/jkl" as jkl;

.animated-card {
    animation: slide-in var(--jkl-motion-timing-expressive) var(--jkl-motion-easing-entrance);

    @include jkl.prefers-reduced-motion {
        animation: none;
    }
}`,
  },
];
