import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "legend", type: "string", required: true, source: "custom", status: "stable", description: "Overskrift for gruppen (på RadioButtonGroup)." },
        { name: "name", type: "string", required: false, source: "native", status: "stable", description: "Skjemafeltets navn." },
        { name: "value", type: "string", required: false, source: "native", status: "stable", description: "Valgt verdi." },
        { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", required: false, source: "react", status: "stable", description: "Kalles ved valg." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst for gruppen." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding." },
        { name: "inline", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser radioknappene på én linje." },
        { name: "label", type: "React.ReactNode", required: false, source: "custom", status: "deprecated", statusDescription: "Bruk children i stedet.", description: "Label for en enkelt radioknapp (gammel API)." },
    ];
