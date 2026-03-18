import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "placement", type: '"top" | "top-start" | "top-end" | "left" | "right"', required: false, source: "custom", status: "stable", default: '"top"', description: "Posisjon for tooltip." },
        { name: "triggerOn", type: '"hover" | "click"', required: false, source: "custom", status: "stable", default: '"hover"', description: "Utløsende hendelse." },
        { name: "delay", type: "number", required: false, source: "custom", status: "stable", description: "Forsinkelse i ms før visning." },
    ];
