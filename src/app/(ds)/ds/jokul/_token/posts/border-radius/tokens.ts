export interface BorderRadiusToken {
  name: string;
  token: string;
  value: string;
  rem: string;
  usage: string;
}

export const borderRadiusTokens: BorderRadiusToken[] = [
  {
    name: "none",
    token: "--jkl-border-radius-none",
    value: "0px",
    rem: "0",
    usage: "Ingen avrunding. Brukes for skarpe rektangler, tabeller og kanter der form betyr noe.",
  },
  {
    name: "xs",
    token: "--jkl-border-radius-xs",
    value: "4px",
    rem: "0.25rem",
    usage: "Svak avrunding. Brukes på chips, tags og kompakte elementer.",
  },
  {
    name: "s",
    token: "--jkl-border-radius-s",
    value: "8px",
    rem: "0.5rem",
    usage: "Standard avrunding. Brukes på input-felt, knapper og de fleste interaktive komponenter.",
  },
  {
    name: "m",
    token: "--jkl-border-radius-m",
    value: "12px",
    rem: "0.75rem",
    usage: "Moderat avrunding. Brukes på kort, popover og paneler.",
  },
  {
    name: "l",
    token: "--jkl-border-radius-l",
    value: "16px",
    rem: "1rem",
    usage: "Tydelig avrunding. Brukes på større flater som modaler og hero-kort.",
  },
  {
    name: "full",
    token: "--jkl-border-radius-full",
    value: "9999px",
    rem: "9999px",
    usage: "Pille-form. Brukes for å gjøre et element helt rundt — f.eks. badges og avatar-containere.",
  },
];
