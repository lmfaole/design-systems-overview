import {
    namedStyles as namedTypographyStyles
} from "@/features/ds/jokul/_token/components/TypographyScaleDemo/typography-scale.data";
import {type DocumentedPublicToken, formatPublicTokenPath, getPublicTokenValue,} from "../_shared/public-tokens";

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
} from "@/features/ds/jokul/_token/components/TypographyScaleDemo/typography-scale.data";

export type {
    ScaleStep,
    TextStyle,
    WeightStep,
    LineHeightStep,
} from "@/features/ds/jokul/_token/components/TypographyScaleDemo/typography-scale.data";

// ─── Font size reference table ────────────────────────────────────────────────

export interface FontSizeReference {
    token: string;
    value: string;
    role: string;
    usage: string;
}

export const fontSizeReference: FontSizeReference[] = [
    {
        token: "--jkl-font-size-1",
        value: "0.75rem / 12px",
        role: "text-micro",
        usage: "Lovpålagt tekst, juridiske merknader"
    },
    {
        token: "--jkl-font-size-2",
        value: "0.875rem / 14px",
        role: "paragraph-small, text-small",
        usage: "Hjelpetekst under skjemafelt, badges, timestamps"
    },
    {
        token: "--jkl-font-size-3",
        value: "1rem / 16px",
        role: "paragraph-medium, text-medium",
        usage: "Standard brødtekst og UI-tekst — knapper, labels, menyvalg"
    },
    {
        token: "--jkl-font-size-4",
        value: "1.125rem / 18px",
        role: "heading-5",
        usage: "Liten overskrift i kort og sekundære paneler"
    },
    {
        token: "--jkl-font-size-5",
        value: "1.25rem / 20px",
        role: "heading-4, paragraph-large, text-large",
        usage: "Kort- og paneloverskrifter, innledende avsnitt"
    },
    {
        token: "--jkl-font-size-6",
        value: "1.5rem / 24px",
        role: "heading-3",
        usage: "Underoverskrifter i skjemagrupper og sidekolonner"
    },
    {
        token: "--jkl-font-size-7",
        value: "1.75rem / 28px",
        role: "heading-2, title-small",
        usage: "Seksjonstittel og sidehode i applikasjoner"
    },
    {
        token: "--jkl-font-size-8",
        value: "2rem / 32px",
        role: "heading-1, title",
        usage: "Primær sidetittel — én per side"
    },
    {
        token: "--jkl-font-size-9",
        value: "2.5rem / 40px",
        role: "—",
        usage: "Stor displaytekst for kampanje- og onboardingsider"
    },
    {
        token: "--jkl-font-size-10",
        value: "3rem / 48px",
        role: "—",
        usage: "Maksimal displaystørrelse — bruk med varsomhet"
    },
];

// ─── Line height reference ────────────────────────────────────────────────────

export interface LineHeightReference {
    token: string;
    value: string;
    usage: string;
}

export const lineHeightReference: LineHeightReference[] = [
    {
        token: "--jkl-line-height-flush",
        value: "1",
        usage: "Displaytekst og store overskrifter der tett luft er ønskelig"
    },
    {token: "--jkl-line-height-tight", value: "1.3", usage: "UI-tekst, labels, knapper og kompakte elementer"},
    {token: "--jkl-line-height-relaxed", value: "1.6", usage: "Løpende brødtekst for god lesekomfort"},
];

// ─── Font weight reference ────────────────────────────────────────────────────

export interface FontWeightReference {
    token: string;
    value: string;
    usage: string;
}

export const fontWeightReference: FontWeightReference[] = [
    {
        token: "--jkl-typography-font-weight-normal",
        value: "400",
        usage: "All brødtekst, UI-tekst og overskrifter opp til heading-3"
    },
    {token: "--jkl-typography-font-weight-bold", value: "700", usage: "heading-3 til heading-5 og fremhevede labels"},
];

export interface ExportedTypographyValueToken extends DocumentedPublicToken {
    path: string;
    value: string;
    usage: string;
    aliasPath?: string;
}

export interface ExportedTypographyStyleToken extends DocumentedPublicToken {
    name: string;
    path: string;
    aliasPath?: string;
    small: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
    };
    base: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
    };
    usage: string;
}

function createTypographyValueToken(
    path: string,
    usage: string,
    aliasPath?: string,
): ExportedTypographyValueToken {
    return {
        path,
        value: getPublicTokenValue(path),
        usage,
        aliasPath,
        exportPaths: aliasPath ? [path, aliasPath] : [path],
    };
}

const stylePathByName: Record<string, string> = {
    title: "title",
    "title-small": "titleSmall",
    "heading-1": "heading_1",
    "heading-2": "heading_2",
    "heading-3": "heading_3",
    "heading-4": "heading_4",
    "heading-5": "heading_5",
    "paragraph-large": "paragraphLarge",
    "paragraph-medium": "paragraphMedium",
    "paragraph-small": "paragraphSmall",
    "text-large": "textLarge",
    "text-medium": "textMedium",
    "text-small": "textSmall",
    "text-micro": "textMicro",
    body: "body",
    small: "small",
};

const legacyStylePathByName: Partial<Record<string, string>> = {
    title: "typography.title",
    "title-small": "typography.titleSmall",
    "heading-1": "typography.heading_1",
    "heading-2": "typography.heading_2",
    "heading-3": "typography.heading_3",
    "heading-4": "typography.heading_4",
    "heading-5": "typography.heading_5",
    body: "typography.body",
    small: "typography.small",
};

function createExportedTypographyStyleToken(name: string, usage: string): ExportedTypographyStyleToken {
    const segment = stylePathByName[name];

    if (!segment) {
        throw new Error(`Missing typography style mapping for "${name}"`);
    }

    const path = `typography.style.${segment}`;
    const aliasPath = legacyStylePathByName[name];
    const leafPaths = (basePath: string) =>
        ["small", "base"].flatMap((size) =>
            ["fontSize", "lineHeight", "fontWeight"].map((property) => `${basePath}.${size}.${property}`),
        );

    return {
        name,
        path,
        aliasPath,
        small: {
            fontSize: getPublicTokenValue(`${path}.small.fontSize`),
            lineHeight: getPublicTokenValue(`${path}.small.lineHeight`),
            fontWeight: getPublicTokenValue(`${path}.small.fontWeight`),
        },
        base: {
            fontSize: getPublicTokenValue(`${path}.base.fontSize`),
            lineHeight: getPublicTokenValue(`${path}.base.lineHeight`),
            fontWeight: getPublicTokenValue(`${path}.base.fontWeight`),
        },
        usage,
        exportPaths: aliasPath ? [...leafPaths(path), ...leafPaths(aliasPath)] : leafPaths(path),
    };
}

export const exportedFontSizeTokens: ExportedTypographyValueToken[] = [
    createTypographyValueToken("typography.font.size.1", "Micro-tekst og juridiske merknader."),
    createTypographyValueToken("typography.font.size.2", "Kompakt tekst og hjelpetekst."),
    createTypographyValueToken("typography.font.size.3", "Standard brødtekst og UI-tekst."),
    createTypographyValueToken("typography.font.size.4", "Små overskrifter."),
    createTypographyValueToken("typography.font.size.5", "Innledende tekst og kompakte overskrifter."),
    createTypographyValueToken("typography.font.size.6", "Underoverskrifter."),
    createTypographyValueToken("typography.font.size.7", "Seksjonstitler."),
    createTypographyValueToken("typography.font.size.8", "Primær sidetittel."),
    createTypographyValueToken("typography.font.size.9", "Stor displaytekst."),
    createTypographyValueToken("typography.font.size.10", "Maksimal displaystørrelse."),
    createTypographyValueToken("typography.font.size.16", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.18", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.20", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.21", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.23", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.25", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.26", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.28", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.30", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.36", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.44", "Underliggende absolutt størrelse brukt i typografiskalaen."),
    createTypographyValueToken("typography.font.size.56", "Underliggende absolutt størrelse brukt i typografiskalaen."),
];

export const exportedLineHeightStepTokens: ExportedTypographyValueToken[] = [
    createTypographyValueToken("typography.line.height.24", "Kompakte linjer i små tekstrader."),
    createTypographyValueToken("typography.line.height.28", "Stram, men lesbar linjehøyde."),
    createTypographyValueToken("typography.line.height.32", "Mellomstor linjehøyde i overskrifter."),
    createTypographyValueToken("typography.line.height.36", "Romsligere linjehøyde i større overskrifter."),
    createTypographyValueToken("typography.line.height.40", "Stor linjehøyde for displaytekst."),
    createTypographyValueToken("typography.line.height.44", "Stor linjehøyde for ekstra tydelige overskrifter."),
    createTypographyValueToken("typography.line.height.52", "Ekstra romslig displaylinjehøyde."),
    createTypographyValueToken("typography.line.height.64", "Maksimal linjehøyde i skalaen."),
];

export const exportedSemanticLineHeightTokens: ExportedTypographyValueToken[] = [
    createTypographyValueToken("typography.line.height.flush", "Displaytekst og store overskrifter der linjene skal sitte tett."),
    createTypographyValueToken("typography.line.height.tight", "UI-tekst, labels og kompakte tekstelementer."),
    createTypographyValueToken("typography.line.height.relaxed", "Løpende brødtekst med høy lesekomfort."),
];

export const exportedFontWeightTokens: ExportedTypographyValueToken[] = [
    createTypographyValueToken(
        "typography.weight.normal",
        "Normal tekstvekt i typografisystemet.",
        "typography.font.weight.normal",
    ),
    createTypographyValueToken(
        "typography.weight.bold",
        "Fet tekstvekt for overskrifter og tydelig fremheving.",
        "typography.font.weight.bold",
    ),
];

export const exportedIconWeightTokens: ExportedTypographyValueToken[] = [
    createTypographyValueToken("icon.weight.normal", "Standard ikonvekt."),
    createTypographyValueToken("icon.weight.bold", "Tyngre ikonvekt for sterkere uttrykk."),
];

export const exportedTypographyStyleTokens: ExportedTypographyStyleToken[] = namedTypographyStyles.map(
    ({name, sample}) => createExportedTypographyStyleToken(name, sample),
).concat([
    createExportedTypographyStyleToken("body", "Stor brødtekst i Jøkul."),
    createExportedTypographyStyleToken("small", "Kompakt løpende tekst i Jøkul."),
]);

export function formatPublicTypographyTokenPath(path: string): string {
    return formatPublicTokenPath(path);
}
