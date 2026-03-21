import type { DesignSystem } from "@/data/design-systems";

export type DesignSystemExternalLinksLinks = DesignSystem["externalLinks"];

export const DESIGN_SYSTEM_EXTERNAL_LINK_LABELS = [
    { key: "frontPage", label: "Forside" },
    { key: "changelog", label: "Endringslogg" },
    { key: "about", label: "Om" },
] as const;
