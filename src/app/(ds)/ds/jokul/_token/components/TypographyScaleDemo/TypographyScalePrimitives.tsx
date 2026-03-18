import type { ReactNode } from "react";
import type { ScaleStep, TextStyle, WeightStep, LineHeightStep } from "./typography-scale.data";

// ─── TokenChip ───────────────────────────────────────────────────────────────
// A small inline pill displaying a CSS custom property name.

interface TokenChipProps { token: string }

export function TokenChip({ token }: TokenChipProps) {
    return <code className="ty-scale-demo__chip">{token}</code>;
}

// ─── Section ─────────────────────────────────────────────────────────────────
// Consistent section wrapper with heading + optional description.

interface SectionProps {
    heading: string;
    description?: ReactNode;
    children: ReactNode;
}

export function Section({ heading, description, children }: SectionProps) {
    return (
        <section className="ty-scale-demo__section">
            <h3 className="ty-scale-demo__section-heading">{heading}</h3>
            {description && <p className="ty-scale-demo__section-desc">{description}</p>}
            {children}
        </section>
    );
}

// ─── FontSizeRow ──────────────────────────────────────────────────────────────
// One row in the font-size staircase.

export function FontSizeRow({ token, label, sample }: ScaleStep) {
    return (
        <div className="ty-scale-demo__row">
            <span
                className="ty-scale-demo__sample"
                style={{ fontSize: `var(${token})`, lineHeight: "var(--jkl-line-height-tight)" }}
            >
                {sample}
            </span>
            <span className="ty-scale-demo__row-meta">
                <code className="ty-scale-demo__token">{token}</code>
                <span className="ty-scale-demo__label">{label}</span>
            </span>
        </div>
    );
}

// ─── NamedStyleRow ────────────────────────────────────────────────────────────
// One row in the named text-styles table: live sample on the left, token chips on the right.

export function NamedStyleRow({ name, sizeToken, lineHeightToken, weightToken, sample }: TextStyle) {
    return (
        <div className="ty-scale-demo__style-row">
            <p
                className="ty-scale-demo__style-sample"
                style={{
                    fontSize: `var(${sizeToken})`,
                    lineHeight: `var(${lineHeightToken})`,
                    fontWeight: `var(${weightToken})`,
                }}
            >
                {sample}
            </p>
            <div className="ty-scale-demo__style-meta">
                <code className="ty-scale-demo__style-name">{name}</code>
                <div className="ty-scale-demo__style-tokens">
                    <TokenChip token={sizeToken} />
                    <TokenChip token={lineHeightToken} />
                    <TokenChip token={weightToken} />
                </div>
            </div>
        </div>
    );
}

// ─── WeightRow ────────────────────────────────────────────────────────────────
// One row in the font-weight comparison.

export function WeightRow({ token, label, sample }: WeightStep) {
    return (
        <div className="ty-scale-demo__weight-row">
            <span
                className="ty-scale-demo__weight-sample"
                style={{ fontWeight: `var(${token})` }}
            >
                {sample}
            </span>
            <span className="ty-scale-demo__row-meta">
                <code className="ty-scale-demo__token">{token}</code>
                <span className="ty-scale-demo__label">{label}</span>
            </span>
        </div>
    );
}

// ─── LineHeightCard ───────────────────────────────────────────────────────────
// A card showing a paragraph rendered at a specific line-height token.

interface LineHeightCardProps extends LineHeightStep { sampleText: string }

export function LineHeightCard({ token, label, description, sampleText }: LineHeightCardProps) {
    return (
        <div className="ty-scale-demo__lh-card">
            <p className="ty-scale-demo__lh-sample" style={{ lineHeight: `var(${token})` }}>
                {sampleText}
            </p>
            <code className="ty-scale-demo__token">{token}</code>
            <span className="ty-scale-demo__label">{label}</span>
            <span className="ty-scale-demo__label">{description}</span>
        </div>
    );
}
