import type { PropDef } from "../types";

export const props: PropDef[] = [
    { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Ikonet som vises i knappen." },
    { name: "aria-label", type: "string", required: true, source: "aria", status: "stable", description: "Tilgjengelig navn for knappen." },
    { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", required: false, source: "react", status: "stable", description: "Klikk-handler." },
    { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer knappen." },
    { name: "type", type: '"button" | "submit" | "reset"', required: false, source: "native", status: "stable", default: '"button"', description: "HTML-type-attributtet." },
];
