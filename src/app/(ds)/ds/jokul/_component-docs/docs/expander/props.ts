import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekst eller innhold i knappen." },
        { name: "open", type: "boolean", required: false, source: "custom", status: "stable", description: "Overstyr visuell åpen-tilstand utenfra." },
        { name: "icon", type: "React.ReactNode", required: false, source: "custom", status: "stable", description: "Egendefinert ikon i stedet for standard chevron." },
        { name: "expandDirection", type: '"up" | "down"', required: false, source: "custom", status: "stable", default: '"down"', description: "Retning chevron peker når panelet er lukket." },
    ];
