import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Overskrift for lenkegruppens seksjon." },
        { name: "hideLabel", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Skjuler overskriften visuelt." },
        { name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "LinkList.Link-elementer." },
    ];
