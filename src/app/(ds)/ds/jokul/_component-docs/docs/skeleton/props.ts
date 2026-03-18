import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "textDescription", type: "string", required: true, source: "aria", status: "stable", description: "Tilgjengelig beskrivelse for skjermlesere. Plasseres på SkeletonAnimation-wrapperen." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Skeleton-komponenter som skal animeres." },
        { name: "style", type: "React.CSSProperties", required: false, source: "react", status: "stable", description: "Inline stilsetting for SkeletonAnimation-wrapperen." },
    ];
