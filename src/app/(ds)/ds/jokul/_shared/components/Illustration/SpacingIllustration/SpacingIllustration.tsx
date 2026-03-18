import type React from "react";
import "./spacing-illustration.scss";

// 3×2 grid — each item moves outward from center via --sp-sx/--sp-sy
const ITEMS = [
    { sx: -1, sy: -1 }, // top-left
    { sx:  0, sy: -1 }, // top-center
    { sx:  1, sy: -1 }, // top-right
    { sx: -1, sy:  1 }, // bottom-left
    { sx:  0, sy:  1 }, // bottom-center
    { sx:  1, sy:  1 }, // bottom-right
] as const;

export function SpacingIllustration() {
    return (
        <div className="fi fi--spacing" aria-hidden="true">
            <div className="fi__sp-grid">
                {ITEMS.map(({ sx, sy }, i) => (
                    <div
                        key={i}
                        className="fi__sp-item"
                        style={{ "--sp-sx": sx, "--sp-sy": sy } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}
