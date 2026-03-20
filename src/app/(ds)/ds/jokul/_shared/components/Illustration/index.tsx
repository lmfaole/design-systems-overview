import {
    BorderRadiusIllustration as SharedBorderRadiusIllustration,
    BreakpointsIllustration as SharedBreakpointsIllustration,
    ColorIllustration as SharedColorIllustration,
    DotsIllustration as SharedDotsIllustration,
    MotionIllustration as SharedMotionIllustration,
    SpacingIllustration as SharedSpacingIllustration,
    TypographyIllustration as SharedTypographyIllustration,
    type IllustrationSurfaceTokens,
    type TypographyIllustrationRow,
} from "@/app/ds/_shared/illustrations";

const jokulSurfaceTokens: IllustrationSurfaceTokens = {
    backgroundLow: "var(--jkl-color-background-container-low)",
    backgroundHigh: "var(--jkl-color-background-container-high)",
    border: "var(--jkl-color-border-separator)",
    borderSubdued: "var(--jkl-color-border-subdued)",
    radius: "var(--jkl-border-radius-medium)",
    pageBackground: "var(--jkl-color-background-page)",
    textColor: "var(--jkl-color-text-default)",
    easing: "var(--jkl-motion-easing-entrance)",
};

const jokulSwatches = [
    "var(--jkl-color-brand-snohvit)",
    "var(--jkl-color-brand-sand)",
    "var(--jkl-color-brand-varde)",
    "var(--jkl-color-brand-svaberg)",
    "var(--jkl-color-brand-stein)",
    "var(--jkl-color-brand-skifer)",
];

const jokulAccents = [
    "var(--jkl-color-background-alert-info)",
    "var(--jkl-color-background-alert-success)",
    "var(--jkl-color-background-alert-warning)",
    "var(--jkl-color-background-alert-error)",
];

const jokulRadii = [
    "var(--jkl-border-radius-none)",
    "var(--jkl-border-radius-xs)",
    "var(--jkl-border-radius-s)",
    "var(--jkl-border-radius-m)",
    "var(--jkl-border-radius-l)",
    "var(--jkl-border-radius-full)",
];

const jokulTypographyRows: TypographyIllustrationRow[] = [
    {
        size: "min(2.4cqi, 0.95rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 40,
        delay: -3,
        content: "caption · micro · detail · label · small · footnote · ".repeat(8),
    },
    {
        size: "min(2.9cqi, 1.05rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 55,
        delay: -10,
        content: "font-size-1 · font-size-2 · font-size-3 · font-size-4 · font-size-5 · ".repeat(8),
    },
    {
        size: "min(3.4cqi, 1.2rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 65,
        delay: -20,
        content: "font-weight · line-height · tracking · leading · spacing · ".repeat(8),
    },
    {
        size: "min(3.8cqi, 1.35rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 80,
        delay: -28,
        content: "body · paragraph · tekst · lesbart · flytende · naturlig · ".repeat(8),
    },
    {
        size: "min(4.3cqi, 1.55rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 70,
        delay: -15,
        content: "semi-bold · medium · light · regular · condensed · extended · ".repeat(8),
    },
    {
        size: "min(4.8cqi, 1.75rem)",
        weight: "normal",
        lineHeight: "tight",
        duration: 100,
        delay: -38,
        content: "overskrift · tittel · seksjon · artikkel · ingress · ".repeat(8),
    },
    {
        size: "min(5.3cqi, 2rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 130,
        delay: -50,
        content: "fremtind grotesk · typografisk hierarki · ".repeat(8),
    },
    {
        size: "min(5.8cqi, 2.25rem)",
        weight: "normal",
        lineHeight: "flush",
        duration: 170,
        delay: -65,
        content: "heading · display · hero · banner · ".repeat(8),
    },
    {
        size: "min(6.4cqi, 2.5rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 190,
        delay: -75,
        content: "font-size-6 · font-size-7 · font-size-8 · font-size-9 · ".repeat(8),
    },
    {
        size: "min(7cqi, 2.8rem)",
        weight: "bold",
        lineHeight: "flush",
        duration: 240,
        delay: -95,
        content: "typografi · grotesk · display · fremtind · ".repeat(8),
    },
];

export function TypographyIllustration() {
    return (
        <SharedTypographyIllustration
            {...jokulSurfaceTokens}
            accents={jokulAccents}
            rows={jokulTypographyRows}
            fontFamily="Fremtind Grotesk, sans-serif"
            fontWeightNormal="var(--jkl-typography-font-weight-normal)"
            fontWeightBold="var(--jkl-typography-font-weight-bold)"
            lineHeightFlush="var(--jkl-line-height-flush)"
            lineHeightTight="var(--jkl-line-height-tight)"
            lineHeightRelaxed="var(--jkl-line-height-relaxed)"
        />
    );
}

export function ColorIllustration() {
    return <SharedColorIllustration {...jokulSurfaceTokens} swatches={jokulSwatches} />;
}

export function SpacingIllustration() {
    return <SharedSpacingIllustration {...jokulSurfaceTokens} />;
}

export function MotionIllustration() {
    return <SharedMotionIllustration {...jokulSurfaceTokens} />;
}

export function BreakpointsIllustration() {
    return <SharedBreakpointsIllustration {...jokulSurfaceTokens} />;
}

export function DotsIllustration() {
    return (
        <SharedDotsIllustration
            dotColor="var(--jkl-color-border-separator)"
            dotSubduedColor="var(--jkl-color-border-subdued)"
        />
    );
}

export function BorderRadiusIllustration() {
    return (
        <SharedBorderRadiusIllustration
            {...jokulSurfaceTokens}
            radii={jokulRadii}
            accents={jokulAccents}
        />
    );
}
