import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "legend", type: "string", required: true, source: "custom", status: "stable", description: "Tilgjengelig gruppenavn." },
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "SegmentedControlButton-elementer." },
        { name: "description", type: "string", required: false, source: "custom", status: "stable", description: "Forklarende tekst under legend." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst som vises under valgene." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding som erstatter hjelpetekst." },
        { name: "tooltip", type: "React.ReactNode", required: false, source: "custom", status: "stable", description: "Tilgjengelig tooltip knyttet til legend." },
    ];
