import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "from", type: "number", required: true, source: "custom", status: "stable", description: "Antall millisekunder å telle ned fra." },
        { name: "isPaused", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Pause nedtellingen." },
    ];
