import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Overskrift for innholdsfortegnelsen." },
        { name: "children", type: "React.ReactNode", required: false, source: "react", status: "stable", description: "TableOfContents.Link-elementer." },
    ];
