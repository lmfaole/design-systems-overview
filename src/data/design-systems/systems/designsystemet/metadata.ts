import type { DesignSystem } from "../../types";

export const designsystemetMetadata = {
    slug: "designsystemet",
    name: "Designsystemet",
    company: "Digdir",
    description: "Digdirs designsystem for offentlige tjenester.",
    docs: "https://designsystemet.digdir.no/",
    packageName: "@digdir/designsystemet-web",
    openSource: true,
    externalLinks: {
        frontPage: "https://designsystemet.no/",
        changelog: "https://designsystemet.no/no/components/changelog/",
        about: "https://designsystemet.no/no/fundamentals/introduction/about-the-design-system/",
    },
} satisfies Pick<
    DesignSystem,
    "slug" | "name" | "company" | "description" | "docs" | "packageName" | "openSource" | "externalLinks"
>;
