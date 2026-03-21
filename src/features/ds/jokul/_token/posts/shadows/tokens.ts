export interface ShadowToken {
  variable: string;
  value: string;
  usage: string;
  status: "stable" | "deprecated";
}

export const shadowTokens: ShadowToken[] = [
  {
    variable: "$shadow-navigation",
    value: "0 ru.rem(4px) ru.rem(15px) rgb(37 42 49 / 10%)",
    usage: "Skygge for flater som er klikkbare og leder brukeren videre til et nytt sted.",
    status: "stable",
  },
  {
    variable: "$shadow-navigation--hover",
    value: "0 ru.rem(6px) ru.rem(25px) rgb(37 42 49 / 12%)",
    usage: "Hover-variant av navigasjonsskyggen for tydeligere løft når pekeren er over elementet.",
    status: "stable",
  },
  {
    variable: "$shadow-task-card",
    value: "0 ru.rem(4px) ru.rem(12px) rgb(37 42 49 / 3%)",
    usage: "Skygge for handlingskort som påvirker innholdet på samme side.",
    status: "stable",
  },
  {
    variable: "$drop-shadow--small",
    value: "0 ru.rem(4px) ru.rem(8px) rgb(0 0 0 / 8%)",
    usage: "Eldre liten drop-shadow. Beholdes kun for bakoverkompatibilitet.",
    status: "deprecated",
  },
  {
    variable: "$drop-shadow--medium",
    value: "ru.rem(4px) ru.rem(4px) ru.rem(8px) rgb(0 0 0 / 8%)",
    usage: "Eldre medium drop-shadow. Beholdes kun for bakoverkompatibilitet.",
    status: "deprecated",
  },
  {
    variable: "$drop-shadow--large",
    value: "ru.rem(4px) ru.rem(6px) ru.rem(16px) rgb(0 0 0 / 15%)",
    usage: "Eldre stor drop-shadow. Beholdes kun for bakoverkompatibilitet.",
    status: "deprecated",
  },
];
