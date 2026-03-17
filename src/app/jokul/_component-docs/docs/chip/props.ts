import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Chip-teksten." },
        { name: "variant", type: '"input" | "filter"', required: true, source: "react", status: "stable", description: "Visuell variant og funksjon." },
        { name: "selected", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Valgt tilstand, kun for filter-variant." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer chipen." },
        { name: "onClick", type: "React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']", required: false, source: "react", status: "stable", description: "Klikk-handler." },
    ];
