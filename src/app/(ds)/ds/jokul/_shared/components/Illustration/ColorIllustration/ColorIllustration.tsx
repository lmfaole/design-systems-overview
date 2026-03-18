import type React from "react";
import "./color-illustration.scss";

// Six brand palette stops — same grid layout as SpacingIllustration
const SWATCHES = [
    "--jkl-color-brand-snohvit",
    "--jkl-color-brand-sand",
    "--jkl-color-brand-varde",
    "--jkl-color-brand-svaberg",
    "--jkl-color-brand-stein",
    "--jkl-color-brand-skifer",
] as const;

export function ColorIllustration() {
    return (
        <div className="fi fi--colors" aria-hidden="true">
            <div className="fi__cl-grid">
                {SWATCHES.map((token, i) => (
                    <div
                        key={i}
                        className="fi__cl-swatch"
                        style={{
                            "--cl-i": i,
                            "--cl-bg": `var(${token})`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}

