"use client";

import { Help } from "@fremtind/jokul/help";
import type { PropDef } from "@/app/jokul/_component-docs/data";
import { STATUS_COLOR, STATUS_LABEL } from "./constants";

export function PropStatusCell({
    status,
    statusDescription,
}: Pick<PropDef, "status" | "statusDescription">) {
    if (status === "stable") return <span style={{ color: "var(--jkl-color-text-subdued)" }}>—</span>;
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--jkl-spacing-2xs)",
                color: STATUS_COLOR[status],
            }}
        >
            {STATUS_LABEL[status]}
            {status !== "deprecated" && statusDescription && (
                <Help buttonText="Hvorfor?">{statusDescription}</Help>
            )}
        </span>
    );
}
