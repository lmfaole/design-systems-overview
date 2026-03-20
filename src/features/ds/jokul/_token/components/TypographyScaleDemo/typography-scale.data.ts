// ─── Types ───────────────────────────────────────────────────────────────────

export interface ScaleStep {
    token: string;
    label: string;
    sample: string;
}

export interface TextStyle {
    name: string;
    sizeToken: string;
    lineHeightToken: string;
    weightToken: string;
    sample: string;
}

export interface WeightStep {
    token: string;
    label: string;
    sample: string;
}

export interface LineHeightStep {
    token: string;
    label: string;
    description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const fontSizeSteps: ScaleStep[] = [
    { token: "--jkl-font-size-10", label: "font-size-10", sample: "Aa" },
    { token: "--jkl-font-size-9",  label: "font-size-9",  sample: "Aa" },
    { token: "--jkl-font-size-8",  label: "font-size-8",  sample: "Aa" },
    { token: "--jkl-font-size-7",  label: "font-size-7",  sample: "Aa" },
    { token: "--jkl-font-size-6",  label: "font-size-6",  sample: "Aa" },
    { token: "--jkl-font-size-5",  label: "font-size-5",  sample: "Aa" },
    { token: "--jkl-font-size-4",  label: "font-size-4",  sample: "Aa" },
    { token: "--jkl-font-size-3",  label: "font-size-3",  sample: "Aa" },
    { token: "--jkl-font-size-2",  label: "font-size-2",  sample: "Aa" },
    { token: "--jkl-font-size-1",  label: "font-size-1",  sample: "Aa" },
];

export const namedStyles: TextStyle[] = [
    { name: "title",            sizeToken: "--jkl-font-size-8", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Fremtind Grotesk" },
    { name: "title-small",      sizeToken: "--jkl-font-size-7", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Fremtind Grotesk" },
    { name: "heading-1",        sizeToken: "--jkl-font-size-8", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Stor overskrift" },
    { name: "heading-2",        sizeToken: "--jkl-font-size-7", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Seksjonstittel" },
    { name: "heading-3",        sizeToken: "--jkl-font-size-6", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-bold",   sample: "Underoverskrift" },
    { name: "heading-4",        sizeToken: "--jkl-font-size-5", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-bold",   sample: "Kort- og paneloverskrift" },
    { name: "heading-5",        sizeToken: "--jkl-font-size-4", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-bold",   sample: "Liten overskrift" },
    { name: "paragraph-large",  sizeToken: "--jkl-font-size-5", lineHeightToken: "--jkl-line-height-relaxed", weightToken: "--jkl-typography-font-weight-normal", sample: "Innledende avsnitt og fremhevet brødtekst" },
    { name: "paragraph-medium", sizeToken: "--jkl-font-size-3", lineHeightToken: "--jkl-line-height-relaxed", weightToken: "--jkl-typography-font-weight-normal", sample: "Standard brødtekst — brukes for all løpende tekst i applikasjoner" },
    { name: "paragraph-small",  sizeToken: "--jkl-font-size-2", lineHeightToken: "--jkl-line-height-relaxed", weightToken: "--jkl-typography-font-weight-normal", sample: "Hjelpetekst, fotnoter og sekundær informasjon under skjemafelt" },
    { name: "text-large",       sizeToken: "--jkl-font-size-5", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Kompakt UI-tekst i stor størrelse" },
    { name: "text-medium",      sizeToken: "--jkl-font-size-3", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Standard UI-tekst — knapper, labels, menyvalg" },
    { name: "text-small",       sizeToken: "--jkl-font-size-2", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Kompakt UI-tekst — badges, timestamps, metadata" },
    { name: "text-micro",       sizeToken: "--jkl-font-size-1", lineHeightToken: "--jkl-line-height-tight",   weightToken: "--jkl-typography-font-weight-normal", sample: "Lovpålagt tekst og juridiske merknader" },
];

export const weightSteps: WeightStep[] = [
    { token: "--jkl-typography-font-weight-normal", label: "Normal · 400", sample: "Fremtind Grotesk — normal vekt" },
    { token: "--jkl-typography-font-weight-bold",   label: "Bold · 700",   sample: "Fremtind Grotesk — fet vekt" },
];

export const lineHeightSteps: LineHeightStep[] = [
    { token: "--jkl-line-height-flush",   label: "line-height-flush · 1",     description: "Displaytekst og store overskrifter" },
    { token: "--jkl-line-height-tight",   label: "line-height-tight · 1.3",   description: "UI-tekst, labels og kompakte elementer" },
    { token: "--jkl-line-height-relaxed", label: "line-height-relaxed · 1.6", description: "Løpende brødtekst for god lesekomfort" },
];

export const LINE_HEIGHT_SAMPLE =
    "Jøkul er Fremtinds designsystem. Det gir alle team et felles visuelt språk og gjør det enklere å bygge tilgjengelige produkter.";
