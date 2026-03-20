import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "aria-valuenow", type: "number", required: true, source: "aria", status: "stable", description: "Gjeldende fremgangsverdi." },
        { name: "aria-valuemin", type: "number", required: false, source: "aria", status: "stable", default: "0", description: "Minimumsverdi." },
        { name: "aria-valuemax", type: "number", required: false, source: "aria", status: "stable", default: "100", description: "Maksimumsverdi." },
        { name: "title", type: "string", required: false, source: "custom", status: "stable", default: '"Fremdrift"', description: "Synlig tittel over fremdriftslinjen." },
        { name: "aria-valuetext", type: "string", required: false, source: "aria", status: "stable", description: "Menneskelig lesbar verdi for skjermlesere." },
    ];
