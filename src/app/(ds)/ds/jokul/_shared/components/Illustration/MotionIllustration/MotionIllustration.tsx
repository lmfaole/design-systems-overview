import type React from "react";
import "./motion-illustration.scss";

const CARDS = Array.from({ length: 18 }, (_, i) => i);

export function MotionIllustration() {
    return (
        <div className="fi fi--motion" aria-hidden="true">
            <div className="fi__mo-grid">
                {CARDS.map((i) => (
                    <div
                        key={i}
                        className="fi__mo-card"
                        style={{ "--mo-i": i } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}
