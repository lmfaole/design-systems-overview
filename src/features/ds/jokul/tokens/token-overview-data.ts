import type { TokenIllustrationSlug } from "@/features/ds/jokul/_shared/components/TokenIllustration/shared";

export interface TokenOverviewEntry {
    id: number;
    title: string;
    href: string;
    illustrationSlug: TokenIllustrationSlug;
}

export const tokenOverviewEntries: TokenOverviewEntry[] = [
    {
        id: 13,
        title: "Animasjon",
        href: "/ds/jokul/token/animasjon",
        illustrationSlug: "animasjon",
    },
    {
        id: 14,
        title: "Breakpoints",
        href: "/ds/jokul/token/breakpoints",
        illustrationSlug: "breakpoints",
    },
    {
        id: 11,
        title: "Farger",
        href: "/ds/jokul/token/farger",
        illustrationSlug: "farger",
    },
    {
        id: 20,
        title: "Kantradiuser",
        href: "/ds/jokul/token/kantradiuser",
        illustrationSlug: "kantradiuser",
    },
    {
        id: 21,
        title: "Skygger",
        href: "/ds/jokul/token/skygger",
        illustrationSlug: "skygger",
    },
    {
        id: 12,
        title: "Spacing",
        href: "/ds/jokul/token/spacing",
        illustrationSlug: "spacing",
    },
    {
        id: 10,
        title: "Typografi",
        href: "/ds/jokul/token/typografi",
        illustrationSlug: "typografi",
    },
];

export const visibleTokenCount = tokenOverviewEntries.length;
