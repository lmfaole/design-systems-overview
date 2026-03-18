import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "caption", type: "React.ReactNode", required: true, source: "custom", status: "stable", description: "Tabellbeskrivelse — pass TableCaption med srOnly for å skjule den visuelt." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "TableHead og TableBody." },
        { name: "collapseToList", type: "boolean", required: false, source: "react", status: "stable", default: "false", description: "Kollapser til liste på mobil." },
        { name: "fullWidth", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Strekker tabellen til full bredde." },
    ];
