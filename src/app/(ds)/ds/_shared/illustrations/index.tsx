import type React from "react";
import "./illustrations.scss";

type IllustrationVars = React.CSSProperties;

export interface IllustrationSurfaceTokens {
    backgroundLow?: string;
    backgroundHigh?: string;
    border?: string;
    borderSubdued?: string;
    radius?: string;
    pageBackground?: string;
    textColor?: string;
    easing?: string;
}

export interface ColorIllustrationProps extends IllustrationSurfaceTokens {
    swatches: string[];
}

export interface SpacingIllustrationProps extends IllustrationSurfaceTokens {}

export interface MotionIllustrationProps extends IllustrationSurfaceTokens {}

export interface BreakpointsIllustrationProps extends IllustrationSurfaceTokens {}

export interface DotsIllustrationProps {
    dotColor?: string;
    dotSubduedColor?: string;
}

export interface BorderRadiusIllustrationProps extends IllustrationSurfaceTokens {
    radii: string[];
    accents: string[];
}

export interface TypographyIllustrationRow {
    size: string;
    weight: "normal" | "bold";
    lineHeight: "flush" | "tight" | "relaxed";
    duration: number;
    delay: number;
    content: string;
}

export interface TypographyIllustrationProps extends IllustrationSurfaceTokens {
    fontFamily: string;
    fontWeightNormal: string;
    fontWeightBold: string;
    lineHeightFlush: string;
    lineHeightTight: string;
    lineHeightRelaxed: string;
    accents?: string[];
    rows?: TypographyIllustrationRow[];
}

const DEFAULT_EASING = "cubic-bezier(0.2, 0, 0, 1)";
const DEFAULT_SURFACE_LOW = "canvas";
const DEFAULT_SURFACE_HIGH = "color-mix(in srgb, canvas 92%, black 8%)";
const DEFAULT_BORDER = "color-mix(in srgb, currentColor 14%, transparent)";
const DEFAULT_BORDER_SUBDUED = "color-mix(in srgb, currentColor 10%, transparent)";
const DEFAULT_RADIUS = "0.75rem";
const DEFAULT_PAGE_BACKGROUND = "canvas";
const DEFAULT_TEXT = "currentColor";
const DEFAULT_ACCENTS = [
    "#8fd2ff",
    "#99d9b6",
    "#ffd36b",
    "#ff9d8f",
] as const;
const DEFAULT_COLOR_SWATCHES = [
    "#e8ecef",
    "#d8e4dd",
    "#c4d4f2",
    "#f5d5b8",
    "#d0c4dd",
    "#b8c3d1",
] as const;
const DEFAULT_RADII = [
    "0",
    "0.125rem",
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "999px",
] as const;
const DEFAULT_TYPography_ROWS: TypographyIllustrationRow[] = [
    {
        size: "min(2.4cqi, 0.95rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 40,
        delay: -3,
        content: "caption micro detail label small footnote ".repeat(8),
    },
    {
        size: "min(2.9cqi, 1.05rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 55,
        delay: -10,
        content: "type scale hierarchy rhythm reading body copy ".repeat(8),
    },
    {
        size: "min(3.4cqi, 1.2rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 65,
        delay: -20,
        content: "font weight line height spacing measure contrast ".repeat(8),
    },
    {
        size: "min(3.8cqi, 1.35rem)",
        weight: "normal",
        lineHeight: "relaxed",
        duration: 80,
        delay: -28,
        content: "body paragraph text readable clear consistent flow ".repeat(8),
    },
    {
        size: "min(4.3cqi, 1.55rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 70,
        delay: -15,
        content: "bold medium regular emphasis hierarchy scale display ".repeat(8),
    },
    {
        size: "min(4.8cqi, 1.75rem)",
        weight: "normal",
        lineHeight: "tight",
        duration: 100,
        delay: -38,
        content: "heading section article intro navigation display ".repeat(8),
    },
    {
        size: "min(5.3cqi, 2rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 130,
        delay: -50,
        content: "design system typography tokens foundations patterns ".repeat(8),
    },
    {
        size: "min(5.8cqi, 2.25rem)",
        weight: "normal",
        lineHeight: "flush",
        duration: 170,
        delay: -65,
        content: "headline display banner hero title message ".repeat(8),
    },
    {
        size: "min(6.4cqi, 2.5rem)",
        weight: "bold",
        lineHeight: "tight",
        duration: 190,
        delay: -75,
        content: "font size token responsive scale measure hierarchy ".repeat(8),
    },
    {
        size: "min(7cqi, 2.8rem)",
        weight: "bold",
        lineHeight: "flush",
        duration: 240,
        delay: -95,
        content: "typography system display readable expressive ".repeat(8),
    },
];

function getSurfaceVars(tokens: IllustrationSurfaceTokens = {}): IllustrationVars {
    return {
        "--fi-bg-low": tokens.backgroundLow ?? DEFAULT_SURFACE_LOW,
        "--fi-bg-high": tokens.backgroundHigh ?? DEFAULT_SURFACE_HIGH,
        "--fi-border": tokens.border ?? DEFAULT_BORDER,
        "--fi-border-subdued": tokens.borderSubdued ?? tokens.border ?? DEFAULT_BORDER_SUBDUED,
        "--fi-radius": tokens.radius ?? DEFAULT_RADIUS,
        "--fi-page-bg": tokens.pageBackground ?? DEFAULT_PAGE_BACKGROUND,
        "--fi-text": tokens.textColor ?? DEFAULT_TEXT,
        "--fi-ease": tokens.easing ?? DEFAULT_EASING,
    } as IllustrationVars;
}

function getLineHeightValue(row: TypographyIllustrationRow, props: TypographyIllustrationProps) {
    switch (row.lineHeight) {
        case "flush":
            return props.lineHeightFlush;
        case "tight":
            return props.lineHeightTight;
        default:
            return props.lineHeightRelaxed;
    }
}

const SPACING_ITEMS = [
    { sx: -1, sy: -1 },
    { sx: 0, sy: -1 },
    { sx: 1, sy: -1 },
    { sx: -1, sy: 1 },
    { sx: 0, sy: 1 },
    { sx: 1, sy: 1 },
] as const;

const BREAKPOINT_STEPS = [
    { width: 30, delay: 0 },
    { width: 55, delay: -3 },
    { width: 78, delay: -6 },
    { width: 105, delay: -9 },
] as const;

const TYPOGRAPHY_ACCENTS = DEFAULT_ACCENTS;
const DOTS = Array.from({ length: 120 }, (_, i) => i);
const MOTION_CARDS = Array.from({ length: 18 }, (_, i) => i);

export function ColorIllustration({ swatches, ...tokens }: ColorIllustrationProps) {
    const palette = swatches.length > 0 ? swatches : Array.from(DEFAULT_COLOR_SWATCHES);

    return (
        <div className="fi fi--colors" style={getSurfaceVars(tokens)} aria-hidden="true">
            <div className="fi__cl-grid">
                {palette.map((swatch, index) => (
                    <div
                        key={`${swatch}-${index}`}
                        className="fi__cl-swatch"
                        style={{
                            "--cl-i": index,
                            "--cl-bg": swatch,
                        } as IllustrationVars}
                    />
                ))}
            </div>
        </div>
    );
}

export function SpacingIllustration(tokens: SpacingIllustrationProps) {
    return (
        <div className="fi fi--spacing" style={getSurfaceVars(tokens)} aria-hidden="true">
            <div className="fi__sp-grid">
                {SPACING_ITEMS.map(({ sx, sy }, index) => (
                    <div
                        key={index}
                        className="fi__sp-item"
                        style={{
                            "--sp-sx": sx,
                            "--sp-sy": sy,
                        } as IllustrationVars}
                    />
                ))}
            </div>
        </div>
    );
}

export function MotionIllustration(tokens: MotionIllustrationProps) {
    return (
        <div className="fi fi--motion" style={getSurfaceVars(tokens)} aria-hidden="true">
            <div className="fi__mo-grid">
                {MOTION_CARDS.map((index) => (
                    <div
                        key={index}
                        className="fi__mo-card"
                        style={{ "--mo-i": index } as IllustrationVars}
                    />
                ))}
            </div>
        </div>
    );
}

export function BreakpointsIllustration(tokens: BreakpointsIllustrationProps) {
    return (
        <div className="fi fi--breakpoints" style={getSurfaceVars(tokens)} aria-hidden="true">
            <div className="fi__bp-stack">
                {BREAKPOINT_STEPS.map(({ width, delay }, index) => (
                    <div
                        key={index}
                        className="fi__bp-bar"
                        style={{
                            "--bp-w": `${width}cqi`,
                            "--bp-delay": `${delay}s`,
                        } as IllustrationVars}
                    />
                ))}
            </div>
        </div>
    );
}

export function DotsIllustration({ dotColor, dotSubduedColor }: DotsIllustrationProps) {
    return (
        <div
            className="fi fi--dots"
            style={{
                "--fi-dot-color": dotColor ?? DEFAULT_BORDER,
                "--fi-dot-subdued": dotSubduedColor ?? DEFAULT_BORDER_SUBDUED,
            } as IllustrationVars}
            aria-hidden="true"
        >
            {DOTS.map((index) => (
                <div
                    key={index}
                    className="fi__dot"
                    style={{ "--dot-i": index } as IllustrationVars}
                />
            ))}
        </div>
    );
}

export function BorderRadiusIllustration({
    radii,
    accents,
    ...tokens
}: BorderRadiusIllustrationProps) {
    const radiusScale = radii.length > 0 ? radii : Array.from(DEFAULT_RADII);
    const accentPalette = accents.length > 0 ? accents : Array.from(DEFAULT_ACCENTS);

    return (
        <div className="fi fi--border-radius" style={getSurfaceVars(tokens)} aria-hidden="true">
            <div className="fi__br-grid">
                {radiusScale.map((radius, index) => (
                    <div
                        key={`${radius}-${index}`}
                        className="fi__br-shape"
                        style={{
                            "--br-radius": radius,
                            "--br-delay": `${index * -1.5}s`,
                            "--br-accent": accentPalette[index % accentPalette.length],
                        } as IllustrationVars}
                    />
                ))}
            </div>
        </div>
    );
}

export function TypographyIllustration(props: TypographyIllustrationProps) {
    const rows = props.rows ?? DEFAULT_TYPography_ROWS;
    const accents = props.accents && props.accents.length > 0 ? props.accents : Array.from(TYPOGRAPHY_ACCENTS);

    return (
        <div className="fi fi--typography" style={getSurfaceVars(props)} aria-hidden="true">
            {rows.map((row, index) => (
                <div
                    key={`${row.content.slice(0, 16)}-${index}`}
                    className="fi__ty-row"
                    style={{
                        "--ty-accent": accents[index % accents.length],
                    } as IllustrationVars}
                >
                    <div
                        className="fi__ty-inner"
                        style={{
                            "--fi-font-family": props.fontFamily,
                            "--ty-size": row.size,
                            "--ty-weight":
                                row.weight === "bold"
                                    ? props.fontWeightBold
                                    : props.fontWeightNormal,
                            "--ty-lh": getLineHeightValue(row, props),
                            "--ty-dur": `${row.duration}s`,
                            "--ty-delay": `${row.delay}s`,
                        } as IllustrationVars}
                    >
                        <span>{row.content}</span>
                        <span>{row.content}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
