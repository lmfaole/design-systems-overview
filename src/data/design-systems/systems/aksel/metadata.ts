import type { DesignSystem } from "../../types";

export const akselMetadata = {
    slug: "aksel",
    name: "Aksel",
    company: "Nav",
    description: "Navs designsystem for digitale tjenester, med komponenter, ikoner og et tydelig React- og CSS-spor.",
    docs: "https://aksel.nav.no/",
    packageName: "@navikt/ds-react",
    openSource: true,
    externalLinks: {
        frontPage: "https://aksel.nav.no/grunnleggende",
        changelog: "https://aksel.nav.no/grunnleggende/endringslogg",
        about: "https://aksel.nav.no/grunnleggende/introduksjon/hvordan-bruke-aksel/",
    },
} satisfies Pick<
    DesignSystem,
    "slug" | "name" | "company" | "description" | "docs" | "packageName" | "openSource" | "externalLinks"
>;
