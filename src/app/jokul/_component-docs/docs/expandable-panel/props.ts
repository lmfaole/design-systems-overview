import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "ExpandablePanel.Header og ExpandablePanel.Content." },
        { name: "variant", type: '"fill" | "stroke"', required: false, source: "react", status: "stable", default: '"fill"', description: "Visuell stil. Merk: Når flere paneler med \"stroke\" står direkte etter hverandre, fjernes toppborder og kun første/siste får avrunding." },
        { name: "open", type: "boolean", required: false, source: "custom", status: "stable", description: "Kontrollert åpen-tilstand." },
        { name: "defaultOpen", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Initialt åpen." },
        { name: "onOpenChange", type: "(open: boolean) => void", required: false, source: "react", status: "stable", description: "Kalles ved åpning/lukking." },
    ];
