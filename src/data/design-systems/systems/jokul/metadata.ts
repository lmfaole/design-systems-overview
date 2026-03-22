import type { DesignSystem } from "../../types";

export const jokulMetadata = {
    slug: "jokul",
    name: "Jøkul",
    company: "Fremtind",
    description: "Fremtinds designsystem med React-komponenter, formattere, hooks, mixins, tokens og øvrige byggeklosser.",
    docs: "https://jokul.fremtind.no/",
    packageName: "@fremtind/jokul",
    openSource: true,
    externalLinks: {
        frontPage: "https://jokul.fremtind.no/",
        changelog: "https://github.com/fremtind/jokul/releases",
        about: "https://github.com/fremtind/jokul",
    },
} satisfies Pick<
    DesignSystem,
    "slug" | "name" | "company" | "description" | "docs" | "packageName" | "openSource" | "externalLinks"
>;
