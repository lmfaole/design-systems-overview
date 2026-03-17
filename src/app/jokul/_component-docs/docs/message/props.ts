import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "variant", type: '"info" | "success" | "warning" | "error"', required: false, source: "custom", status: "stable", default: '"info"', description: "info: nøytral informasjon eller tips. success: bekreftelse på at noe gikk bra. warning: viktig informasjon brukeren bør lese. error: noe gikk galt og brukeren må gjøre noe." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Meldingsteksten." },
        { name: "title", type: "string", required: false, source: "custom", status: "stable", description: "Valgfri overskrift i meldingen." },
        { name: "fullWidth", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Strekker meldingen til full bredde." },
        { name: "dismissed", type: "boolean", required: false, source: "custom", status: "stable", description: "Kontrollert tilstand for om meldingen er lukket." },
        { name: "dismissAction", type: "{ handleDismiss: () => void; buttonTitle?: string }", required: false, source: "custom", status: "stable", description: "Viser en lukkeknapp. handleDismiss kalles når brukeren klikker." },
    ];
