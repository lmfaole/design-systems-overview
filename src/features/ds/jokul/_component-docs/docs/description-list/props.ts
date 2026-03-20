import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "DescriptionTerm og DescriptionDetail-elementer." },
        { name: "separators", type: "boolean", required: false, source: "react", status: "stable", default: "false", description: "Viser skillelinjer mellom par." },
        { name: "alignment", type: '"horizontal" | "vertical" | "justified"', required: false, source: "custom", status: "stable", default: '"vertical"', description: "Layoutretning for nøkkel-verdi-par." },
    ];
