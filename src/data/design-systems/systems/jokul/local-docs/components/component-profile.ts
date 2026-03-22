import type {
    DesignSystemComponentProfile,
    DesignSystemComponentPropDocumentationEntry,
} from "../../../../types";

interface CreateJokulComponentProfileOptions {
    styleImports: string[];
    propDocumentation: DesignSystemComponentProfile["propDocumentation"];
    keyboardSupport: string;
    semantics: string[];
    manualChecks: string[];
    performanceNotes: string[];
    iconContract?: {
        usage: DesignSystemComponentProfile["iconContract"]["usage"];
        importPath?: string | false;
        styleImport?: string | false;
        fontStyleImport?: string | false;
        notes: string[];
    };
    clientRuntime?: DesignSystemComponentProfile["clientRuntime"];
    hydration?: DesignSystemComponentProfile["hydration"];
    automatedChecks?: string[];
}

const JOKUL_CORE_STYLE_IMPORT = "@fremtind/jokul/styles/core/core.css";
const JOKUL_ICON_STYLE_IMPORT = "@fremtind/jokul/styles/components/icon/icon.min.css";
const JOKUL_WEBFONTS_STYLE_IMPORT = "@fremtind/jokul/styles/fonts/webfonts.min.css";
const JOKUL_ICON_IMPORT_PATH = "@fremtind/jokul/icon";

const DEFAULT_AUTOMATED_CHECKS = [
    "Dokssiden inngår i prosjektets route smoke og a11y-kjøring.",
    "Forhåndsvisningen rendres server-side uten Astro islands eller klienthydrering.",
];

const DEFAULT_PROP_DOCUMENTATION_NOTES = [
    "Dekningen følger offentlige props som kommer fra Jøkul-pakken og dens egne basetyper, men ikke generiske DOM-props fra React.",
];

export function createJokulComponentPropDocumentation(
    entries: DesignSystemComponentPropDocumentationEntry[],
    notes: string[] = [],
): DesignSystemComponentProfile["propDocumentation"] {
    return {
        coverage: "complete",
        scope: "package-public-props",
        notes: [
            ...DEFAULT_PROP_DOCUMENTATION_NOTES,
            ...notes,
        ],
        entries: entries.map((entry) => ({
            ...entry,
            documentedProps: [...entry.documentedProps],
        })),
    };
}

export function createJokulComponentProfile({
    styleImports,
    propDocumentation,
    keyboardSupport,
    semantics,
    manualChecks,
    performanceNotes,
    iconContract = {
        usage: "none",
        notes: [],
    },
    clientRuntime = "none",
    hydration = "none",
    automatedChecks = DEFAULT_AUTOMATED_CHECKS,
}: CreateJokulComponentProfileOptions): DesignSystemComponentProfile {
    const resolvedIconContract = iconContract.usage === "none"
        ? {
            usage: "none" as const,
            notes: [...iconContract.notes],
        }
        : {
            usage: iconContract.usage,
            importPath: iconContract.importPath === false
                ? undefined
                : iconContract.importPath ?? JOKUL_ICON_IMPORT_PATH,
            styleImport: iconContract.styleImport === false
                ? undefined
                : iconContract.styleImport ?? JOKUL_ICON_STYLE_IMPORT,
            fontStyleImport: iconContract.fontStyleImport === false
                ? undefined
                : iconContract.fontStyleImport ?? JOKUL_WEBFONTS_STYLE_IMPORT,
            notes: [...iconContract.notes],
        };

    return {
        styleImports: [...new Set([
            JOKUL_CORE_STYLE_IMPORT,
            ...styleImports,
            ...(resolvedIconContract.usage === "none"
                ? []
                : [
                    resolvedIconContract.styleImport,
                    resolvedIconContract.fontStyleImport,
                ].filter((value): value is string => Boolean(value))),
        ])],
        clientRuntime,
        hydration,
        iconContract: resolvedIconContract,
        propDocumentation: {
            ...propDocumentation,
            notes: [...propDocumentation.notes],
            entries: propDocumentation.entries.map((entry) => ({
                ...entry,
                documentedProps: [...entry.documentedProps],
            })),
        },
        keyboardSupport,
        semantics,
        automatedChecks,
        manualChecks,
        performanceNotes,
    };
}
