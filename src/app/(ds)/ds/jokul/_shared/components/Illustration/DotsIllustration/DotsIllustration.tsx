import type React from "react";
import "./dots-illustration.scss";

const DOTS = Array.from({ length: 120 }, (_, i) => i);

export function DotsIllustration() {
    return (
        <div className="fi fi--dots" aria-hidden="true">
            {DOTS.map((i) => (
                <div
                    key={i}
                    className="fi__dot"
                    style={{ "--dot-i": i } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
