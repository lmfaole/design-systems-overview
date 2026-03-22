import type { DesignSystemInstallGuide } from "../../types";

export const designsystemetInstallGuides: DesignSystemInstallGuide[] = [
    {
        slug: "pakker-og-oppsett",
        title: "Installer pakker og grunnoppsett",
        description: "Foreløpig bare som plan for senere lokal dokumentasjon.",
        status: "external",
        packages: [
            "@digdir/designsystemet-web",
        ],
        externalPath: "https://designsystemet.no/no/getting-started/",
        steps: [
            {
                title: "Følg offisiell oppstart",
                description: "Bruk den offisielle oppstartsveien til Digdir til vi har egne lokale sider.",
            },
        ],
    },
];
