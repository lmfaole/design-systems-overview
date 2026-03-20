"use client";

import { useEffect, useState } from "react";

export function InlineStatusExample() {
    return (
        <div role="status" aria-live="polite">
            Laster inn innhold...
        </div>
    );
}

export function SkeletonExample() {
    return (
        <div aria-busy="true" aria-live="polite">
            <div style={{ background: "#e5e7eb", height: 12, width: 160, marginBottom: 8 }} />
            <div style={{ background: "#e5e7eb", height: 12, width: 220, marginBottom: 8 }} />
            <div style={{ background: "#e5e7eb", height: 12, width: 180 }} />
            <span className="monster-sr-only">Laster inn innhold</span>
        </div>
    );
}

export function BlockingExample() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(id);
    }, []);

    return (
        <div aria-live="polite" aria-busy={loading}>
            {loading ? (
                <div role="status">Laster data...</div>
            ) : (
                <div>Innholdet er klart.</div>
            )}
        </div>
    );
}

export function SpinnerOnlyExample() {
    return (
        <div
            aria-hidden="true"
            style={{
                width: 24,
                height: 24,
                borderRadius: "9999px",
                border: "3px solid #cbd5f5",
                borderTopColor: "#1f2937",
            }}
        />
    );
}
