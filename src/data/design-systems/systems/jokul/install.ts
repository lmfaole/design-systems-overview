import type { DesignSystemInstallGuide } from "../../types";

export const jokulInstallGuides: DesignSystemInstallGuide[] = [
    {
        slug: "react-og-core",
        title: "Installer Jøkul-komponenter og styles",
        description: "Grunnoppsett for Jøkul via monopakka `@fremtind/jokul`.",
        status: "documented",
        packages: [
            "@fremtind/jokul",
        ],
        localPath: "/ds/jokul/installasjon/react-og-core",
        steps: [
            {
                title: "Installer monopakka",
                description: "Komponenter, hooks, utilities og styles leveres nå fra én pakke.",
                code: "npm install @fremtind/jokul",
                language: "sh",
            },
            {
                title: "Importer grunnstiler og komponentstiler",
                description: "Start med core, og legg deretter til styles for komponentene du faktisk bruker.",
                code: `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/button/button.min.css";
import "@fremtind/jokul/styles/components/loader/loader.min.css";`,
                language: "ts",
            },
        ],
    },
    {
        slug: "formattere-hooks-og-mixins",
        title: "Bruk hooks, utilities og styling",
        description: "Jøkul eksponerer hooks, utilities og styling via egne subpaths i samme monopakke.",
        status: "documented",
        packages: [
            "@fremtind/jokul",
        ],
        localPath: "/ds/jokul/installasjon/formattere-hooks-og-mixins",
        steps: [
            {
                title: "Importer hooks og utilities fra riktige stier",
                description: "Hold logikk og styles adskilt ved å bruke de dedikerte subpathene i `@fremtind/jokul`.",
                code: `import { useAnimatedDetails } from "@fremtind/jokul/hooks";
import { unicode } from "@fremtind/jokul/utilities";`,
                language: "ts",
            },
            {
                title: "Bruk styling-hjelperne fra styles/core",
                description: "Mixins og tokens lever under `styles/core` og kan trekkes inn uten å importere alle komponentstilene.",
                code: `@use "@fremtind/jokul/styles/core/jkl";

.stack {
    gap: jkl.$spacing-16;
}`,
                language: "scss",
            },
        ],
    },
];
