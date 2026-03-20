import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "string", required: true, source: "react", status: "stable", description: 'Material Symbol-navn, f.eks. "arrow_forward".' },
        { name: "bold", type: "boolean", required: false, source: "react", status: "stable", description: "Tykkere strekbredde." },
        { name: "filled", type: "boolean", required: false, source: "custom", status: "stable", description: "Fylt variant av ikonet." },
        { name: "as", type: '"div" | "span"', required: false, source: "custom", status: "stable", default: '"span"', description: "HTML-element ikonet rendres som." },
        { name: "variant", type: '"small" | "medium" | "inherit"', required: false, source: "custom", status: "deprecated", statusDescription: "Størrelsen settes nå automatisk etter fontstørrelse. Fjern denne propen.", description: "Størrelsesvarianten til ikonet." },
    ];
