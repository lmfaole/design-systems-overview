export interface BreakpointToken {
  /** SCSS variable name */
  variable: string;
  /** px value */
  value: string;
  /** Named range that starts at this breakpoint */
  range: string;
  /** Typical device type */
  devices: string;
}

export interface BreakpointRange {
  name: string;
  min: string;
  max: string;
  mixin: string;
  usage: string;
}

export const breakpointTokens: BreakpointToken[] = [
  {
    variable: "$breakpoint--medium",
    value: "680px",
    range: "medium og større",
    devices: "Nettbrett i stående modus, mellomstore nettlesere",
  },
  {
    variable: "$breakpoint--large",
    value: "1200px",
    range: "large og større",
    devices: "Desktop, bærbare og stasjonære datamaskiner",
  },
  {
    variable: "$breakpoint--xl",
    value: "1600px",
    range: "xl",
    devices: "Ekstra brede desktopskjermer og TV",
  },
];

export const breakpointRanges: BreakpointRange[] = [
  {
    name: "small",
    min: "0px",
    max: "679px",
    mixin: "small-device",
    usage: "Mobil og kompakte flater — én kolonne, forenklet navigasjon",
  },
  {
    name: "medium",
    min: "680px",
    max: "1199px",
    mixin: "medium-device",
    usage: "Nettbrett og brede mobilvisninger — to kolonner, utvidet innhold",
  },
  {
    name: "large",
    min: "1200px",
    max: "1599px",
    mixin: "large-device",
    usage: "Desktop — full layout, sidepaneler og komplekse grids",
  },
  {
    name: "xl",
    min: "1600px",
    max: "∞",
    mixin: "xl-device",
    usage: "Ekstra bredt — bruk sparsomt, vurder maks-bredde-begrensning",
  },
];
