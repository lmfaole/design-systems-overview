import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Lenketekst." },
        { name: "href", type: "string", required: true, source: "native", status: "stable", description: "URL-en lenken peker til." },
        { name: "external", type: "boolean", required: false, source: "react", status: "stable", default: "false", description: "Åpner i ny fane med ikon." },
    ];
