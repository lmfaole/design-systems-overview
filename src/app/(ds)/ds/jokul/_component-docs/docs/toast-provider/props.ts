import type { PropDef } from "../types";

export const props: PropDef[] = [
    {
        name: "placement",
        type: '"center" | "left"',
        required: false,
        source: "custom",
        status: "stable",
        default: '"center"',
        description: "Plassering av toast-containeren pa skjermen.",
    },
    {
        name: "maxVisibleToasts",
        type: "number",
        required: false,
        source: "custom",
        status: "stable",
        description: "Maksimalt antall toasts som kan vises samtidig.",
    },
];

