export interface SpacingToken {
  name: string;
  token: string;
  px: string;
  usage: string;
}

export interface UnitToken {
  token: string;
  multiplier: string;
  px: string;
  rem: string;
}

export const spacingTokens: SpacingToken[] = [
  { name: "xxs", token: "--jkl-spacing-xxs", px: "4px",   usage: "Intern padding i kompakte komponenter som Tags" },
  { name: "xs",  token: "--jkl-spacing-xs",  px: "8px",   usage: "Gap mellom tett grupperte elementer, f.eks. radio-knapper i en liste" },
  { name: "s",   token: "--jkl-spacing-s",   px: "16px",  usage: "Padding i kompakte komponenter som knapper og skjemafelter" },
  { name: "m",   token: "--jkl-spacing-m",   px: "24px",  usage: "Standardavstand — basislinje for padding, gap og margin" },
  { name: "l",   token: "--jkl-spacing-l",   px: "40px",  usage: "Mellom kortlister, skjemafelt-grupper og under overskrifter" },
  { name: "xl",  token: "--jkl-spacing-xl",  px: "64px",  usage: "Mellom semantiske seksjoner på en side" },
  { name: "2xl", token: "--jkl-spacing-2xl", px: "104px", usage: "Mellom tematisk atskilte deler av en side, f.eks. hero og innholdsseksjon" },
];

export const unitTokens: UnitToken[] = [
  { token: "--jkl-unit-0",   multiplier: "0×",    px: "0px",   rem: "0rem" },
  { token: "--jkl-unit-02",  multiplier: "0.25×", px: "2px",   rem: "0.125rem" },
  { token: "--jkl-unit-05",  multiplier: "0.5×",  px: "4px",   rem: "0.25rem" },
  { token: "--jkl-unit-10",  multiplier: "1×",    px: "8px",   rem: "0.5rem" },
  { token: "--jkl-unit-15",  multiplier: "1.5×",  px: "12px",  rem: "0.75rem" },
  { token: "--jkl-unit-20",  multiplier: "2×",    px: "16px",  rem: "1rem" },
  { token: "--jkl-unit-25",  multiplier: "2.5×",  px: "20px",  rem: "1.25rem" },
  { token: "--jkl-unit-30",  multiplier: "3×",    px: "24px",  rem: "1.5rem" },
  { token: "--jkl-unit-35",  multiplier: "3.5×",  px: "28px",  rem: "1.75rem" },
  { token: "--jkl-unit-40",  multiplier: "4×",    px: "32px",  rem: "2rem" },
  { token: "--jkl-unit-50",  multiplier: "5×",    px: "40px",  rem: "2.5rem" },
  { token: "--jkl-unit-60",  multiplier: "6×",    px: "48px",  rem: "3rem" },
  { token: "--jkl-unit-70",  multiplier: "7×",    px: "56px",  rem: "3.5rem" },
  { token: "--jkl-unit-80",  multiplier: "8×",    px: "64px",  rem: "4rem" },
  { token: "--jkl-unit-90",  multiplier: "9×",    px: "72px",  rem: "4.5rem" },
  { token: "--jkl-unit-100", multiplier: "10×",   px: "80px",  rem: "5rem" },
  { token: "--jkl-unit-130", multiplier: "13×",   px: "104px", rem: "6.5rem" },
  { token: "--jkl-unit-210", multiplier: "21×",   px: "168px", rem: "10.5rem" },
];
