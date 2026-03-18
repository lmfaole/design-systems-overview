import type React from "react";
import type { PropStatus } from "@/app/ds/jokul/_component-docs/data";

export const COLUMNS = ["Navn", "Type", "Påkrevd", "Standard", "Status", "Beskrivelse"];

export const STATUS_LABEL: Record<PropStatus, string> = {
    stable: "stable",
    deprecated: "deprecated",
    experimental: "beta",
};

export const STATUS_COLOR: Record<PropStatus, string> = {
    stable: "var(--jkl-color-text-subdued)",
    deprecated: "var(--jkl-color-text-negative)",
    experimental: "var(--jkl-color-text-warning)",
};

// We want code-styled values without forcing the component font stack.
export const inlineCodeStyle: React.CSSProperties = { fontFamily: "inherit", fontSize: "inherit" };

