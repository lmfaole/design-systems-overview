import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Lenketekst." },
        { name: "href", type: "string", required: false, source: "native", status: "stable", description: "Destinasjon." },
        { name: "active", type: "boolean", required: false, source: "react", status: "stable", default: "false", description: "Markerer som aktiv gjeldende side." },
        { name: "back", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser tilbake-pil." },
    ];
