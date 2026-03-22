import type { DesignSystemInstallGuide } from "../../types";

export const akselInstallGuides: DesignSystemInstallGuide[] = [
    {
        slug: "react",
        title: "Installer React-pakkene",
        description: "Grunnoppsett for å dokumentere komponenter, hooks og ikoner fra Aksel lokalt.",
        status: "planned",
        packages: [
            "@navikt/ds-css",
            "@navikt/ds-react",
            "@navikt/aksel-icons",
        ],
        localPath: "/ds/aksel/installasjon/react",
        steps: [
            {
                title: "Installer pakkene",
                description: "Legg inn CSS, React-komponentene og ikonpakken i prosjektet.",
                code: "npm install @navikt/ds-css @navikt/ds-react @navikt/aksel-icons",
                language: "sh",
            },
            {
                title: "Last inn globale styles",
                description: "Importer stilpakken tidlig i app-skallet.",
                code: 'import "@navikt/ds-css";',
                language: "ts",
            },
        ],
    },
    {
        slug: "tokens-og-stiler",
        title: "Plan for tokens og stilgrunnlag",
        description: "Egen inngang for hvordan vi dokumenterer farger, spacing og øvrig stilgrunnlag fra Aksel.",
        status: "planned",
        packages: [
            "@navikt/ds-css",
        ],
        localPath: "/ds/aksel/installasjon/tokens-og-stiler",
        steps: [
            {
                title: "Samle design tokens",
                description: "Kartlegg hvilke CSS-variabler og grunnstiler som bør få egne docsider.",
            },
            {
                title: "Definer dokumentasjonsgrenser",
                description: "Skill mellom installasjon, bruksmønstre og rene asset-oppslag.",
            },
        ],
    },
];
