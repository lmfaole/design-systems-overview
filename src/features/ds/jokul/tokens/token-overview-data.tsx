import type React from "react";

export interface TokenOverviewEntry {
    id: number;
    title: string;
    href: string;
    illustration: React.ReactNode;
}

function MotionCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="animasjon">
            <div className="token-mini__motion">
                <span className="token-mini__motion-card" />
                <span className="token-mini__motion-card" />
                <span className="token-mini__motion-card" />
                <span className="token-mini__motion-card" />
                <span className="token-mini__motion-card" />
                <span className="token-mini__motion-card" />
            </div>
        </div>
    );
}

function BreakpointsCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="breakpoints">
            <div className="token-mini__breakpoints">
                <span className="token-mini__breakpoint-bar" data-size="xs" />
                <span className="token-mini__breakpoint-bar" data-size="s" />
                <span className="token-mini__breakpoint-bar" data-size="m" />
                <span className="token-mini__breakpoint-bar" data-size="l" />
            </div>
        </div>
    );
}

function ColorsCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="farger">
            <div className="token-mini__palette">
                <span className="token-mini__swatch" data-swatch="snohvit" />
                <span className="token-mini__swatch" data-swatch="sand" />
                <span className="token-mini__swatch" data-swatch="varde" />
                <span className="token-mini__swatch" data-swatch="svaberg" />
            </div>
        </div>
    );
}

function BorderRadiusCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="kantradiuser">
            <div className="token-mini__radii">
                <span className="token-mini__shape" data-radius="none" />
                <span className="token-mini__shape" data-radius="s" />
                <span className="token-mini__shape" data-radius="m" />
                <span className="token-mini__shape" data-radius="full" />
            </div>
        </div>
    );
}

function ShadowsCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="skygger">
            <div className="token-mini__shadows">
                <span className="token-mini__shadow-surface" data-shadow="navigation" />
                <span className="token-mini__shadow-surface" data-shadow="task" />
                <span className="token-mini__shadow-surface" data-shadow="hover" />
            </div>
        </div>
    );
}

function SpacingCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="spacing">
            <div className="token-mini__spacing">
                <span className="token-mini__spacing-box" data-size="xs" />
                <span className="token-mini__spacing-box" data-size="s" />
                <span className="token-mini__spacing-box" data-size="m" />
                <span className="token-mini__spacing-box" data-size="l" />
            </div>
        </div>
    );
}

function TypographyCardIllustration() {
    return (
        <div className="token-mini" data-token-card-illustration="typografi">
            <div className="token-mini__type">
                <span className="token-mini__type-row" data-size="s">Caption og detalj</span>
                <span className="token-mini__type-row" data-size="m">Brødtekst og rytme</span>
                <span className="token-mini__type-row" data-size="l">Overskrifter</span>
            </div>
        </div>
    );
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
