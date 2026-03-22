import type { DesignSystemComponentProfile } from "../../../../types";

interface CreateJokulComponentProfileOptions {
    styleImports: string[];
    keyboardSupport: string;
    semantics: string[];
    manualChecks: string[];
    performanceNotes: string[];
    clientRuntime?: DesignSystemComponentProfile["clientRuntime"];
    hydration?: DesignSystemComponentProfile["hydration"];
    automatedChecks?: string[];
}

const JOKUL_CORE_STYLE_IMPORT = "@fremtind/jokul/styles/core/core.min.css";

const DEFAULT_AUTOMATED_CHECKS = [
    "Dokssiden inngår i prosjektets route smoke og a11y-kjøring.",
    "Forhåndsvisningen rendres server-side uten Astro islands eller klienthydrering.",
];

export function createJokulComponentProfile({
    styleImports,
    keyboardSupport,
    semantics,
    manualChecks,
    performanceNotes,
    clientRuntime = "none",
    hydration = "none",
    automatedChecks = DEFAULT_AUTOMATED_CHECKS,
}: CreateJokulComponentProfileOptions): DesignSystemComponentProfile {
    return {
        styleImports: [...new Set([JOKUL_CORE_STYLE_IMPORT, ...styleImports])],
        clientRuntime,
        hydration,
        keyboardSupport,
        semantics,
        automatedChecks,
        manualChecks,
        performanceNotes,
    };
}
