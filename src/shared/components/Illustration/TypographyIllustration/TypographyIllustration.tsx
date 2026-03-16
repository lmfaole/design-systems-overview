import type React from "react";
import "./typography-illustration.scss";

const BOLD   = "var(--jkl-typography-font-weight-bold)";
const NORMAL = "var(--jkl-typography-font-weight-normal)";
const LH_FLUSH   = "var(--jkl-line-height-flush)";
const LH_TIGHT   = "var(--jkl-line-height-tight)";
const LH_RELAXED = "var(--jkl-line-height-relaxed)";

// Repeat content enough times so one <span> always exceeds the widest container
function rep(s: string, n = 8) { return s.repeat(n); }

const ROWS = [
    // Cap the biggest rows so the hero background shows more lines of text.
    { size: "min(2.4cqi, 0.95rem)", weight: NORMAL, lh: LH_RELAXED, dur: 40,  delay: -3,   content: rep("caption · micro · detail · label · small · footnote · ") },
    { size: "min(2.9cqi, 1.05rem)", weight: NORMAL, lh: LH_RELAXED, dur: 55,  delay: -10,  content: rep("font-size-1 · font-size-2 · font-size-3 · font-size-4 · font-size-5 · ") },
    { size: "min(3.4cqi, 1.2rem)",  weight: BOLD,   lh: LH_TIGHT,   dur: 65,  delay: -20,  content: rep("font-weight · line-height · tracking · leading · spacing · ") },
    { size: "min(3.8cqi, 1.35rem)", weight: NORMAL, lh: LH_RELAXED, dur: 80,  delay: -28,  content: rep("body · paragraph · tekst · lesbart · flytende · naturlig · ") },
    { size: "min(4.3cqi, 1.55rem)", weight: BOLD,   lh: LH_TIGHT,   dur: 70,  delay: -15,  content: rep("semi-bold · medium · light · regular · condensed · extended · ") },
    { size: "min(4.8cqi, 1.75rem)", weight: NORMAL, lh: LH_TIGHT,   dur: 100, delay: -38,  content: rep("overskrift · tittel · seksjon · artikkel · ingress · ") },
    { size: "min(5.3cqi, 2rem)",    weight: BOLD,   lh: LH_TIGHT,   dur: 130, delay: -50,  content: rep("fremtind grotesk · typografisk hierarki · ") },
    { size: "min(5.8cqi, 2.25rem)", weight: NORMAL, lh: LH_FLUSH,   dur: 170, delay: -65,  content: rep("heading · display · hero · banner · ") },
    { size: "min(6.4cqi, 2.5rem)",  weight: BOLD,   lh: LH_TIGHT,   dur: 190, delay: -75,  content: rep("font-size-6 · font-size-7 · font-size-8 · font-size-9 · ") },
    { size: "min(7cqi, 2.8rem)",    weight: BOLD,   lh: LH_FLUSH,   dur: 240, delay: -95,  content: rep("typografi · grotesk · display · fremtind · ") },
] as const;

export function TypographyIllustration() {
    return (
        <div className="fi fi--typography" aria-hidden="true">
            {ROWS.map(({ size, weight, lh, dur, delay, content }, ri) => (
                <div key={ri} className="fi__ty-row">
                    <div
                        className="fi__ty-inner"
                        style={{
                            "--ty-size":   size,
                            "--ty-weight": weight,
                            "--ty-lh":     lh,
                            "--ty-dur":    `${dur}s`,
                            "--ty-delay":  `${delay}s`,
                        } as React.CSSProperties}
                    >
                        <span>{content}</span>
                        <span>{content}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
