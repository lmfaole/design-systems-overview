import type React from "react";

export interface TokenOverviewEntry {
    id: number;
    title: string;
    href: string;
    illustration: React.ReactNode;
}

interface TokenCardIllustrationProps {
    slug: string;
    label?: string;
    specimenTag?: "span" | "strong";
}

function TokenCardIllustration({
    slug,
    label,
    specimenTag = "span",
}: TokenCardIllustrationProps) {
    const Specimen = specimenTag;

    return (
        <div className="token-mini" data-token-card-illustration={slug}>
            <Specimen className="token-mini__specimen" data-token-card-specimen={slug}>
                {label}
            </Specimen>
        </div>
    );
}

function MotionCardIllustration() {
    return <TokenCardIllustration slug="animasjon" />;
}

function BreakpointsCardIllustration() {
    return <TokenCardIllustration slug="breakpoints" />;
}

function ColorsCardIllustration() {
    return <TokenCardIllustration slug="farger" />;
}

function BorderRadiusCardIllustration() {
    return <TokenCardIllustration slug="kantradiuser" />;
}

function ShadowsCardIllustration() {
    return <TokenCardIllustration slug="skygger" />;
}

function SpacingCardIllustration() {
    return <TokenCardIllustration slug="spacing" />;
}

function TypographyCardIllustration() {
    return <TokenCardIllustration slug="typografi" label="Ag" specimenTag="strong" />;
}

export const tokenOverviewEntries: TokenOverviewEntry[] = [
    {
        id: 13,
        title: "Animasjon",
        href: "/ds/jokul/token/animasjon",
        illustration: <MotionCardIllustration />,
    },
    {
        id: 14,
        title: "Breakpoints",
        href: "/ds/jokul/token/breakpoints",
        illustration: <BreakpointsCardIllustration />,
    },
    {
        id: 11,
        title: "Farger",
        href: "/ds/jokul/token/farger",
        illustration: <ColorsCardIllustration />,
    },
    {
        id: 20,
        title: "Kantradiuser",
        href: "/ds/jokul/token/kantradiuser",
        illustration: <BorderRadiusCardIllustration />,
    },
    {
        id: 21,
        title: "Skygger",
        href: "/ds/jokul/token/skygger",
        illustration: <ShadowsCardIllustration />,
    },
    {
        id: 12,
        title: "Spacing",
        href: "/ds/jokul/token/spacing",
        illustration: <SpacingCardIllustration />,
    },
    {
        id: 10,
        title: "Typografi",
        href: "/ds/jokul/token/typografi",
        illustration: <TypographyCardIllustration />,
    },
];

export const visibleTokenCount = tokenOverviewEntries.length;
