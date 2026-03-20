import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Etikettteksten. Hold den kort — maks 3–4 ord." },
        { name: "variant", type: '"neutral" | "info" | "success" | "warning" | "error"', required: false, source: "react", status: "stable", default: '"neutral"', description: "Fargevarianten." },
    ];
