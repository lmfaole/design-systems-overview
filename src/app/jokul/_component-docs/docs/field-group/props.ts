import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "legend", type: "string", required: true, source: "custom", status: "stable", description: "Overskrift for gruppen." },
        { name: "labelProps", type: 'Omit<LabelProps, "children">', required: false, source: "custom", status: "stable", description: "Egenskaper for legend/labelen. Bruk f.eks. srOnly: true for å skjule teksten visuelt men beholde tilgjengelighet." },
        { name: "supportLabelProps", type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">', required: false, source: "custom", status: "stable", description: "Egenskaper for supportlabelen som vises under gruppen." },
        { name: "description", type: "string", required: false, source: "custom", status: "stable", description: "Kort beskrivelse som vises mellom legend og innhold." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Skjemaelementer i gruppen." },
        { name: "errorLabel", type: "string", required: false, source: "react", status: "stable", description: "Feilmelding for hele gruppen." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst for hele gruppen." },
    ];
