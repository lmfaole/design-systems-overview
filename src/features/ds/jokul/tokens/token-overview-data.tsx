import type React from "react";
import { TokenCardIllustration } from "@/features/ds/jokul/_shared/components/TokenIllustration/TokenIllustration";

export interface TokenOverviewEntry {
    id: number;
    title: string;
    href: string;
    illustration: React.ReactNode;
}

export const tokenOverviewEntries: TokenOverviewEntry[] = [
    {
        id: 13,
        title: "Animasjon",
        href: "/ds/jokul/token/animasjon",
        illustration: <TokenCardIllustration slug="animasjon" />,
    },
    {
        id: 14,
        title: "Breakpoints",
        href: "/ds/jokul/token/breakpoints",
        illustration: <TokenCardIllustration slug="breakpoints" />,
    },
    {
        id: 11,
        title: "Farger",
        href: "/ds/jokul/token/farger",
        illustration: <TokenCardIllustration slug="farger" />,
    },
    {
        id: 20,
        title: "Kantradiuser",
        href: "/ds/jokul/token/kantradiuser",
        illustration: <TokenCardIllustration slug="kantradiuser" />,
    },
    {
        id: 21,
        title: "Skygger",
        href: "/ds/jokul/token/skygger",
        illustration: <TokenCardIllustration slug="skygger" />,
    },
    {
        id: 12,
        title: "Spacing",
        href: "/ds/jokul/token/spacing",
        illustration: <TokenCardIllustration slug="spacing" />,
    },
    {
        id: 10,
        title: "Typografi",
        href: "/ds/jokul/token/typografi",
        illustration: <TokenCardIllustration slug="typografi" />,
    },
];

export const visibleTokenCount = tokenOverviewEntries.length;
