import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Label-tekst." },
        { name: "name", type: "string", required: true, source: "native", status: "stable", description: "Skjemafeltets navn." },
        { name: "value", type: "string", required: true, source: "native", status: "stable", description: "Verdien som sendes ved innsending." },
        { name: "checked", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Kontrollert avkrysset-tilstand." },
        { name: "defaultChecked", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Initiell avkrysset-tilstand for ukontrollert bruk." },
        { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", required: false, source: "react", status: "stable", description: "Kalles ved endring." },
        { name: "invalid", type: "boolean", required: false, source: "react", status: "stable", default: "false", description: "Markerer feltet som ugyldig." },
        { name: "indeterminate", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser delvis-valgt tilstand." },
    ];
