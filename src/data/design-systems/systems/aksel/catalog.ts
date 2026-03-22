import type { DesignSystemCatalogSection } from "../../types";

export const akselCatalog: DesignSystemCatalogSection[] = [
    {
        slug: "komponenter",
        kind: "component",
        title: "Komponenter",
        description: "Lokal dokumentasjon for React-komponenter, API-overflater og anbefalt bruk.",
        status: "planned",
        localPath: "/ds/aksel/komponenter",
        packageNames: [
            "@navikt/ds-react",
        ],
        examples: [
            "Knapp",
            "Alert",
            "Modal",
        ],
    },
    {
        slug: "hooks",
        kind: "hook",
        title: "Hooks",
        description: "Hooks skal dokumenteres som egne assets, ikke gjemmes inne i komponentartikler.",
        status: "planned",
        localPath: "/ds/aksel/hooks",
        packageNames: [
            "@navikt/ds-react",
        ],
    },
    {
        slug: "designtokens",
        kind: "token",
        title: "Designtokens",
        description: "Farger, spacing og andre grunnleggende verdier må kunne slås opp uten å gå via komponentdocs.",
        status: "planned",
        localPath: "/ds/aksel/tokens",
        packageNames: [
            "@navikt/ds-css",
        ],
    },
    {
        slug: "ikoner",
        kind: "icon",
        title: "Ikoner",
        description: "Ikonbiblioteket trenger egne oppslagssider, installasjon og brukseksempler.",
        status: "planned",
        localPath: "/ds/aksel/ikoner",
        packageNames: [
            "@navikt/aksel-icons",
        ],
    },
    {
        slug: "tema-og-stiler",
        kind: "theme",
        title: "Tema og styling",
        description: "Grunnstyles, CSS-variabler og globale avhengigheter må dokumenteres separat fra komponenter.",
        status: "planned",
        localPath: "/ds/aksel/styling",
        packageNames: [
            "@navikt/ds-css",
        ],
    },
    {
        slug: "tooling",
        kind: "tooling",
        title: "Tooling",
        description: "Installasjon, oppgradering og repo-oppsett bør være egne dokumentasjonssider som kan gjenbrukes på tvers av prosjekter.",
        status: "planned",
        localPath: "/ds/aksel/tooling",
    },
];
