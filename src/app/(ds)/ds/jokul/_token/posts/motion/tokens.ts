export interface TimingToken {
  token: string;
  value: string;
  usage: string;
}

export interface EasingToken {
  token: string;
  curve: string;
  usage: string;
}

export const timingTokens: TimingToken[] = [
  { token: "--jkl-motion-timing-energetic",  value: "75ms",  usage: "Knappetrykk, hover, checkbox-toggle" },
  { token: "--jkl-motion-timing-snappy",     value: "100ms", usage: "Tooltip, dropdown-åpning, inline-validering" },
  { token: "--jkl-motion-timing-productive", value: "150ms", usage: "Modaler, accordion, side-panels" },
  { token: "--jkl-motion-timing-expressive", value: "250ms", usage: "Hero-animasjoner, onboarding, side-transisjoner" },
  { token: "--jkl-motion-timing-lazy",       value: "400ms", usage: "Store layout-skift — bruk sparsomt" },
];

export const easingTokens: EasingToken[] = [
  { token: "--jkl-motion-easing-standard", curve: "ease-in-out", usage: "Tilstandsbytter uten klar retning (f.eks. toggle)" },
  { token: "--jkl-motion-easing-entrance", curve: "ease-out",    usage: "Noe kommer til syne — modal, notification, kort som glir inn" },
  { token: "--jkl-motion-easing-exit",     curve: "ease-in",     usage: "Noe forlater viewet — lukking av modal, fjerning av varsel" },
  { token: "--jkl-motion-easing-focus",    curve: "bounce-out",  usage: "Focus-ring og elementer som signaliserer at noe nettopp skjedde" },
];
