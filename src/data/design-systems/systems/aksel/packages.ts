import type { DesignSystem } from "../../types";

export const akselPackages = [
    {
        name: "@navikt/ds-react",
        description: "React-komponenter og hooks.",
    },
    {
        name: "@navikt/ds-css",
        description: "Globale styles og tokens.",
    },
    {
        name: "@navikt/aksel-icons",
        description: "Ikonpakken til Aksel.",
    },
] satisfies DesignSystem["packages"];
