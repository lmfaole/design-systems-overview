import type { DesignSystemLocalDocs } from "../../../types";

export const jokulLocalOverview = {
    title: "Jøkul",
    description: "Pilot for lokal Jøkul-dokumentasjon med egne ruter for installasjon, komponenter og tokens.",
    intro: [
        "Denne første Jøkul-snutten dokumenterer nå flere komponentoppslag og én token-gruppe. Målet er å teste rutemodellen og datastrukturen før flere seksjoner bygges ut.",
        "Oppsettet skiller mellom installasjonsguider, seksjonsoversikter og detaljerte asset-sider. Det gjør det mulig å skalere uten at alt havner i én gigantisk komponent- eller datafil.",
    ],
} satisfies DesignSystemLocalDocs["overview"];
