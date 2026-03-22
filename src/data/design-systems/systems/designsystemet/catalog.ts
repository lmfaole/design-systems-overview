import type { DesignSystemCatalogSection } from "../../types";

export const designsystemetCatalog: DesignSystemCatalogSection[] = [
    {
        slug: "komponenter",
        kind: "component",
        title: "Komponenter",
        description: "Komponentkatalogen er aktuell for lokal dokumentasjon, men er foreløpig ekstern.",
        status: "external",
        externalPath: "https://designsystemet.no/no/components/",
        packageNames: [
            "@digdir/designsystemet-web",
        ],
    },
    {
        slug: "designtokens",
        kind: "token",
        title: "Designtokens",
        description: "Farger, spacing og visuelle grunnverdier bør få egne lokale oppslag hvis systemet tas inn i repoet.",
        status: "external",
        externalPath: "https://designsystemet.no/no/foundations/",
    },
    {
        slug: "tooling",
        kind: "tooling",
        title: "Tooling",
        description: "Installering og oppsett er foreløpig kun dokumentert eksternt.",
        status: "external",
        externalPath: "https://designsystemet.no/no/getting-started/",
    },
];
