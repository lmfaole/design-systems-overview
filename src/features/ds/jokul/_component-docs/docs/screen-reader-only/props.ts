import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Innholdet som skjules visuelt.",
        },
        {
            name: "showOnFocus",
            type: "boolean",
            required: false,
            source: "react",
            status: "stable",
            default: "false",
            description: "Gjør innholdet synlig når det er fokusert (brukes til skip-links).",
        },
    ];
