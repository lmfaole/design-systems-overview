import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "React.ReactNode", required: true, source: "custom", status: "stable", description: "Synlig label over tekstfeltet." },
        { name: "labelProps", type: 'Omit<LabelProps, "children">', required: false, source: "custom", status: "stable", description: "Egenskaper for label-elementet. Bruk f.eks. srOnly: true for å skjule labelen visuelt men beholde tilgjengelighet." },
        { name: "supportLabelProps", type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">', required: false, source: "custom", status: "stable", description: "Egenskaper for supportlabelen som vises under feltet." },
        { name: "rows", type: "number", required: false, source: "native", status: "stable", default: "4", description: "Antall synlige linjer." },
        { name: "autoExpand", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Feltet vokser med innholdet." },
        { name: "counter", type: "{ maxLength: number; hideProgress?: boolean }", required: false, source: "custom", status: "stable", description: "Tegngrense med visuell teller." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding." },
    ];
