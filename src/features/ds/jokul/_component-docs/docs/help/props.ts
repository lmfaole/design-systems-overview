import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "buttonText",
            type: "string",
            required: true,
            source: "custom",
            status: "stable",
            description: "Tilgjengelig label for ?-knappen (leses av skjermlesere).",
        },
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Innholdet som vises i popoveret.",
        },
        {
            name: "position",
            type: '"top" | "bottom" | "left" | "right"',
            required: false,
            source: "custom",
            status: "stable",
            default: '"top"',
            description: "Hvilken side popoveret åpner på.",
        },
        {
            name: "iconPosition",
            type: '"left" | "right"',
            required: false,
            source: "custom",
            status: "deprecated",
            statusDescription: "Teksten vises ikke lenger, så posisjon er ikke lenger relevant.",
            description: "Plasseringen av ikonet.",
        },
        {
            name: "showButtonText",
            type: "boolean",
            required: false,
            source: "custom",
            status: "deprecated",
            statusDescription: "Dersom du vil vise tekst knyttet til hjelpeteksten, bruk heller Button.",
            description: "Viste tekst ved siden av ?-knappen.",
        },
    ];
