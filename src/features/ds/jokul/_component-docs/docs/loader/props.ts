import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "textDescription", type: "string", required: true, source: "aria", status: "stable", description: "Tilgjengelig beskrivelse for skjermlesere." },
        { name: "variant", type: '"small" | "medium" | "large"', required: false, source: "custom", status: "stable", default: '"medium"', description: "Størrelse på spinner-animasjonen." },
        { name: "delay", type: "number", required: false, source: "custom", status: "stable", default: "0", description: "Forsinkelse i ms før komponenten vises. Unngår flimmer ved raske operasjoner." },
        { name: "inline", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser lasteren som et inline-element, f.eks. inne i tekst." },
    ];
