import type React from "react";
import "./breakpoints-illustration.scss";

/*
 * Each bar represents a breakpoint step — wider = larger viewport.
 * Bars fade in staggered top-to-bottom.
 */
const STEPS = [
    { w: 30,  delay: 0   },  // xs / mobile
    { w: 55,  delay: -3  },  // sm / small tablet
    { w: 78,  delay: -6  },  // md / tablet
    { w: 105, delay: -9  },  // lg / desktop — overflows
] as const;

export function BreakpointsIllustration() {
    return (
        <div className="fi fi--breakpoints" aria-hidden="true">
            <div className="fi__bp-stack">
                {STEPS.map(({ w, delay }, i) => (
                    <div
                        key={i}
                        className="fi__bp-bar"
                        style={{
                            "--bp-w":     `${w}cqi`,
                            "--bp-delay": `${delay}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}
