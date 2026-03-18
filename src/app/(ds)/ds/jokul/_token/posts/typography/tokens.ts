/**
 * Typography token data for the typography token post.
 *
 * The core scale data (fontSizeSteps, namedStyles, weightSteps, lineHeightSteps)
 * lives in the TypographyScaleDemo component and is re-exported here so the
 * token post can source data from a single location.
 */
export {
  fontSizeSteps,
  namedStyles,
  weightSteps,
  lineHeightSteps,
} from "@/app/ds/jokul/_token/components/TypographyScaleDemo/typography-scale.data";

export type {
  ScaleStep,
  TextStyle,
  WeightStep,
  LineHeightStep,
} from "@/app/ds/jokul/_token/components/TypographyScaleDemo/typography-scale.data";

// ─── Font size reference table ────────────────────────────────────────────────

export interface FontSizeReference {
  token: string;
  value: string;
  role: string;
  usage: string;
}

export const fontSizeReference: FontSizeReference[] = [
  { token: "--jkl-font-size-1",  value: "0.75rem / 12px",  role: "text-micro",                               usage: "Lovpålagt tekst, juridiske merknader" },
  { token: "--jkl-font-size-2",  value: "0.875rem / 14px", role: "paragraph-small, text-small",              usage: "Hjelpetekst under skjemafelt, badges, timestamps" },
  { token: "--jkl-font-size-3",  value: "1rem / 16px",     role: "paragraph-medium, text-medium",            usage: "Standard brødtekst og UI-tekst — knapper, labels, menyvalg" },
  { token: "--jkl-font-size-4",  value: "1.125rem / 18px", role: "heading-5",                                usage: "Liten overskrift i kort og sekundære paneler" },
  { token: "--jkl-font-size-5",  value: "1.25rem / 20px",  role: "heading-4, paragraph-large, text-large",   usage: "Kort- og paneloverskrifter, innledende avsnitt" },
  { token: "--jkl-font-size-6",  value: "1.5rem / 24px",   role: "heading-3",                                usage: "Underoverskrifter i skjemagrupper og sidekolonner" },
  { token: "--jkl-font-size-7",  value: "1.75rem / 28px",  role: "heading-2, title-small",                   usage: "Seksjonstittel og sidehode i applikasjoner" },
  { token: "--jkl-font-size-8",  value: "2rem / 32px",     role: "heading-1, title",                         usage: "Primær sidetittel — én per side" },
  { token: "--jkl-font-size-9",  value: "2.5rem / 40px",   role: "—",                                        usage: "Stor displaytekst for kampanje- og onboardingsider" },
  { token: "--jkl-font-size-10", value: "3rem / 48px",     role: "—",                                        usage: "Maksimal displaystørrelse — bruk med varsomhet" },
];

// ─── Line height reference ────────────────────────────────────────────────────

export interface LineHeightReference {
  token: string;
  value: string;
  usage: string;
}

export const lineHeightReference: LineHeightReference[] = [
  { token: "--jkl-line-height-flush",   value: "1",   usage: "Displaytekst og store overskrifter der tett luft er ønskelig" },
  { token: "--jkl-line-height-tight",   value: "1.3", usage: "UI-tekst, labels, knapper og kompakte elementer" },
  { token: "--jkl-line-height-relaxed", value: "1.6", usage: "Løpende brødtekst for god lesekomfort" },
];

// ─── Font weight reference ────────────────────────────────────────────────────

export interface FontWeightReference {
  token: string;
  value: string;
  usage: string;
}

export const fontWeightReference: FontWeightReference[] = [
  { token: "--jkl-typography-font-weight-normal", value: "400", usage: "All brødtekst, UI-tekst og overskrifter opp til heading-3" },
  { token: "--jkl-typography-font-weight-bold",   value: "700", usage: "heading-3 til heading-5 og fremhevede labels" },
];
