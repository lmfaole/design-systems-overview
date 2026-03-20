import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "defaultTab", type: "number", required: false, source: "custom", status: "stable", default: "0", description: "Initialt aktiv fane (indeks)." },
        { name: "onChange", type: "(index: number) => void", required: false, source: "react", status: "stable", description: "Kalles ved faneskift." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "TabList og TabPanel-elementer." },
    ];
