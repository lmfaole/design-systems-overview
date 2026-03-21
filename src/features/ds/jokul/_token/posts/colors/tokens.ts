export interface PrimitiveColorToken {
    token: string;
    name: string;
}

export interface SemanticColorToken {
    token: string;
    description: string;
}

export interface WcagRequirement {
    type: string;
    minimum: string;
    tool: string;
}

export const primitiveColorTokens: PrimitiveColorToken[] = [
    {token: "--jkl-color-brand-snohvit", name: "Snøhvit"},
    {token: "--jkl-color-brand-hvit", name: "Hvit"},
    {token: "--jkl-color-brand-sand", name: "Sand"},
    {token: "--jkl-color-brand-varde", name: "Varde"},
    {token: "--jkl-color-brand-svaberg", name: "Svaberg"},
    {token: "--jkl-color-brand-stein", name: "Stein"},
    {token: "--jkl-color-brand-skifer", name: "Skifer"},
    {token: "--jkl-color-brand-fjellgra", name: "Fjellgrå"},
    {token: "--jkl-color-brand-granitt", name: "Granitt"},
    {token: "--jkl-color-brand-svart", name: "Svart"},
    {token: "--jkl-color-brand-dis", name: "Dis"},
];

export const backgroundTokens: SemanticColorToken[] = [
    {token: "--jkl-color-background-page", description: "Sidens hovedbakgrunn"},
    {token: "--jkl-color-background-container", description: "Hevet overflate — kort og paneler"},
    {token: "--jkl-color-background-container-low", description: "Svakt hevet overflate — lavere kontrast mot siden"},
    {token: "--jkl-color-background-container-high", description: "Sterkere fremheving"},
    {
        token: "--jkl-color-background-container-inverted",
        description: "Invertert overflate — footer, hero, kontrastfelt"
    },
    {token: "--jkl-color-background-input-base", description: "Skjemafelt normaltilstand"},
    {token: "--jkl-color-background-interactive", description: "Interaktive elementer (knapper, chips) normaltilstand"},
];

export const textTokens: SemanticColorToken[] = [
    {token: "--jkl-color-text-default", description: "Primær tekst — overskrifter og brødtekst"},
    {
        token: "--jkl-color-text-subdued",
        description: "Sekundær tekst — hjelpetekst, metadata. Garantert ≥ 4.5:1 WCAG AA"
    },
    {token: "--jkl-color-text-interactive", description: "Lenker og interaktive inline-elementer"},
    {token: "--jkl-color-text-inverted", description: "Tekst på invertert bakgrunn"},
    {token: "--jkl-color-text-on-action", description: "Tekst oppå handlingsfarger (f.eks. i primary-knapper)"},
];

export const borderTokens: SemanticColorToken[] = [
    {token: "--jkl-color-border-separator", description: "Standard skillelinje og kortkant"},
    {token: "--jkl-color-border-strong", description: "Fremhevet kantlinje for aktive elementer"},
    {token: "--jkl-color-border-input", description: "Kantlinje på skjemainputfelter"},
    {token: "--jkl-color-border-input-focus", description: "Fokusring — brukes automatisk av alle Jøkul-komponenter"},
    {token: "--jkl-color-border-error", description: "Feilmarkering på skjemafelter"},
];

export interface FeedbackSurfaceToken {
    token: string;
    variant: "success" | "warning" | "error" | "info";
}

export const feedbackSurfaceTokens: FeedbackSurfaceToken[] = [
    {token: "--jkl-color-background-surface-succes", variant: "success"},
    {token: "--jkl-color-background-surface-warning", variant: "warning"},
    {token: "--jkl-color-background-surface-error", variant: "error"},
    {token: "--jkl-color-background-surface-info", variant: "info"},
];

export const wcagRequirements: WcagRequirement[] = [
    {type: "Normal tekst (under 18pt / 14pt bold)", minimum: "4,5:1", tool: "WebAIM Contrast Checker"},
    {type: "Stor tekst (18pt+ / 14pt+ bold)", minimum: "3:1", tool: "WebAIM Contrast Checker"},
    {type: "UI-komponenter og grafiske elementer", minimum: "3:1 mot tilstøtende farge", tool: "Stark (Figma-plugin)"},
];
