import type { DesignSystem } from "../../types";

export const akselLocalDocumentation = {
    status: "planned",
    basePath: "/ds/aksel",
    installPath: "/ds/aksel/installasjon",
    roadmap: [
        "Start med installasjon og pakkeoppsett.",
        "Dokumenter komponenter, hooks og ikoner som separate seksjoner.",
        "Legg tokens og styling i egne oppslagssider i stedet for å skjule dem i komponentartikler.",
    ],
} satisfies NonNullable<DesignSystem["localDocumentation"]>;
