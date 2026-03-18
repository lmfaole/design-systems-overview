import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Tittel i panelet." },
        { name: "description", type: "React.ReactNode", required: false, source: "custom", status: "stable", description: "Beskrivende innhold under tittelen." },
        { name: "amount", type: "string", required: false, source: "custom", status: "stable", description: "Viser pris til høyre i panelet." },
        { name: "name", type: "string", required: true, source: "native", status: "stable", description: "Skjemafeltets navn." },
        { name: "value", type: "string", required: true, source: "native", status: "stable", description: "Verdien ved innsending." },
        { name: "checked", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Kontrollert tilstand." },
        { name: "defaultChecked", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Starttilstand for ukontrollert bruk." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer avkrysningsboksen." },
        { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", required: false, source: "react", status: "stable", description: "Kalles ved endring." },
        { name: "children", type: "React.ReactNode", required: false, source: "react", status: "deprecated", statusDescription: "Bruk description i stedet.", description: "Innhold i panelet (gammel API)." },
    ];
