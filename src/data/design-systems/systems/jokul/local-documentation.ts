import type { DesignSystem } from "../../types";

export const jokulLocalDocumentation = {
    status: "documented",
    basePath: "/ds/jokul",
    installPath: "/ds/jokul/installasjon",
    roadmap: [
        "Utvid komponentseksjonen med flere faktiske Jøkul-komponenter og fullere API-tabeller.",
        "Legg til formattere, hooks og mixins som egne lokale seksjoner med samme routemodell.",
        "Bygg ut flere token-grupper slik at mønsterartiklene kan lenke til dem direkte.",
    ],
} satisfies NonNullable<DesignSystem["localDocumentation"]>;
