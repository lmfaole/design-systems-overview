import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Innholdet i meldingen." },
        { name: "variant", type: '"info" | "success" | "warning" | "error"', required: false, source: "custom", status: "stable", default: '"info"', description: "Visuell og semantisk variant." },
        { name: "dismissed", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Skjuler meldingen når true." },
        { name: "dismissAction", type: "{ handleDismiss: () => void; buttonTitle?: string }", required: false, source: "custom", status: "stable", description: "Viser en lukkeknapp. handleDismiss kalles når brukeren klikker." },
        { name: "maxContentWidth", type: "string", required: false, source: "custom", status: "stable", description: "Maksimal bredde på innholdet — nyttig når SystemMessage strekker seg over hele sidebredden." },
        { name: "paddingLeft", type: "string", required: false, source: "custom", status: "stable", description: "Overstyr venstre padding på innholdet." },
        { name: "role", type: "string", required: false, source: "aria", status: "stable", description: "ARIA-rolle, f.eks. 'alert' for kritiske meldinger som vises dynamisk." },
        { name: "id", type: "string", required: false, source: "native", status: "stable", description: "HTML id-attributt." },
        { name: "className", type: "string", required: false, source: "react", status: "stable", description: "Ekstra CSS-klasser." },
    ];
