import {type DocumentedPublicToken, formatPublicTokenPath, getPublicTokenValue,} from "../_shared/public-tokens";

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

export interface ExportedPrimitiveColorToken extends DocumentedPublicToken {
    path: string;
    label: string;
    value: string;
}

export interface ExportedFunctionalColorToken extends DocumentedPublicToken {
    name: string;
    lightPath: string;
    darkPath: string;
    lightValue: string;
    darkValue: string;
    description: string;
}

export interface ExportedThemedColorToken extends DocumentedPublicToken {
    path: string;
    lightValue: string;
    darkValue: string;
    description: string;
}

function createPrimitiveColorToken(path: string, label: string): ExportedPrimitiveColorToken {
    return {
        path,
        label,
        value: getPublicTokenValue(path),
        exportPaths: [path],
    };
}

function createFunctionalColorToken(
    name: string,
    lightPath: string,
    darkPath: string,
    description: string,
): ExportedFunctionalColorToken {
    return {
        name,
        lightPath,
        darkPath,
        lightValue: getPublicTokenValue(lightPath),
        darkValue: getPublicTokenValue(darkPath),
        description,
        exportPaths: [lightPath, darkPath],
    };
}

function createThemedColorToken(path: string, description: string): ExportedThemedColorToken {
    return {
        path,
        lightValue: getPublicTokenValue(`${path}.light`),
        darkValue: getPublicTokenValue(`${path}.dark`),
        description,
        exportPaths: [`${path}.light`, `${path}.dark`],
    };
}

export const exportedPrimitiveColorTokens: ExportedPrimitiveColorToken[] = [
    createPrimitiveColorToken("color.brand.snohvit", "Snøhvit"),
    createPrimitiveColorToken("color.brand.hvit", "Hvit"),
    createPrimitiveColorToken("color.brand.sand", "Sand"),
    createPrimitiveColorToken("color.brand.varde", "Varde"),
    createPrimitiveColorToken("color.brand.svaberg", "Svaberg"),
    createPrimitiveColorToken("color.brand.stein", "Stein"),
    createPrimitiveColorToken("color.brand.skifer", "Skifer"),
    createPrimitiveColorToken("color.brand.fjellgra", "Fjellgrå"),
    createPrimitiveColorToken("color.brand.granitt", "Granitt"),
    createPrimitiveColorToken("color.brand.svart", "Svart"),
    createPrimitiveColorToken("color.brand.dis", "Dis"),
];

export const exportedFunctionalColorTokens: ExportedFunctionalColorToken[] = [
    createFunctionalColorToken(
        "Info",
        "color.functional.info",
        "color.functional.infoDark",
        "Brukes for informerende tilstander og som grunnfarge for info-relatert feedback.",
    ),
    createFunctionalColorToken(
        "Suksess",
        "color.functional.success",
        "color.functional.successDark",
        "Brukes for vellykkede utfall og positive bekreftelser.",
    ),
    createFunctionalColorToken(
        "Advarsel",
        "color.functional.warning",
        "color.functional.warningDark",
        "Brukes for varsler og tilstander som krever ekstra oppmerksomhet.",
    ),
    createFunctionalColorToken(
        "Feil",
        "color.functional.error",
        "color.functional.errorDark",
        "Brukes for feiltilstander, validering og kritiske avvik.",
    ),
];

export const exportedBackgroundTokens: ExportedThemedColorToken[] = [
    createThemedColorToken("color.background.page", "Sidens hovedbakgrunn."),
    createThemedColorToken("color.background.pageVariant", "Alternativ sidebakgrunn for variasjon mellom flater."),
    createThemedColorToken("color.background.container", "Standard beholderflate for kort og paneler."),
    createThemedColorToken("color.background.containerLow", "Lavt hevet flate med svakere kontrast mot siden."),
    createThemedColorToken("color.background.containerHigh", "Sterkere hevet flate for fremheving."),
    createThemedColorToken("color.background.containerInverted", "Invertert flate for seksjoner med høy kontrast."),
    createThemedColorToken("color.background.containerSubdued", "Dempet containerflate som skiller seg moderat ut."),
    createThemedColorToken("color.background.input.base", "Bakgrunn i skjemafelt i normaltilstand."),
    createThemedColorToken("color.background.input.focus", "Bakgrunn i skjemafelt når feltet har fokus."),
    createThemedColorToken("color.background.action", "Handlingsflate for primære interaktive elementer."),
    createThemedColorToken("color.background.interactive", "Nøytral bakgrunn for interaktive elementer."),
    createThemedColorToken("color.background.interactiveHover", "Hover-flate for interaktive elementer."),
    createThemedColorToken("color.background.interactiveSelected", "Valgt tilstand for interaktive elementer."),
];

export const exportedAlertBackgroundTokens: ExportedThemedColorToken[] = [
    createThemedColorToken("color.background.alert.neutral", "Nøytral bakgrunn for meldinger uten statusbetoning."),
    createThemedColorToken("color.background.alert.info", "Bakgrunn for info-meldinger."),
    createThemedColorToken("color.background.alert.success", "Bakgrunn for suksessmeldinger."),
    createThemedColorToken("color.background.alert.warning", "Bakgrunn for advarsler."),
    createThemedColorToken("color.background.alert.error", "Bakgrunn for feiltilstander."),
];

export const exportedTextTokens: ExportedThemedColorToken[] = [
    createThemedColorToken("color.text.default", "Primær tekstfarge."),
    createThemedColorToken("color.text.subdued", "Dempet tekstfarge for sekundær informasjon."),
    createThemedColorToken("color.text.inverted", "Tekst på inverterte flater."),
    createThemedColorToken("color.text.onAction", "Tekst oppå handlingsflater."),
    createThemedColorToken("color.text.interactive", "Tekstfarge for interaktive tekstlige elementer."),
    createThemedColorToken("color.text.interactiveHover", "Hover-tilstand for interaktiv tekst."),
    createThemedColorToken("color.text.onAlert", "Tekst på statusflater."),
    createThemedColorToken("color.text.onAlertSubdued", "Sekundær tekst på statusflater."),
];

export const exportedBorderTokens: ExportedThemedColorToken[] = [
    createThemedColorToken("color.border.action", "Kantfarge for handlingsflater."),
    createThemedColorToken("color.border.input", "Standard kant på skjemafelt."),
    createThemedColorToken("color.border.inputFocus", "Kantfarge på skjemafelt i fokus."),
    createThemedColorToken("color.border.separator", "Standard skillelinje mellom seksjoner."),
    createThemedColorToken("color.border.separatorStrong", "Sterkere skillelinje for tydelig separasjon."),
    createThemedColorToken("color.border.separatorHover", "Hover-variant for skillelinjer og avgrensning."),
    createThemedColorToken("color.border.subdued", "Dempet kantfarge for sekundære flater."),
];

export function formatPublicColorTokenPath(path: string): string {
    return formatPublicTokenPath(path);
}
