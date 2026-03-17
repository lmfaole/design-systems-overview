import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Label-teksten. Beskriv tilstanden som er på, f.eks. «Mørkt tema» eller «Varsler aktivert».",
        },
        {
            name: "aria-pressed",
            type: "boolean",
            required: false,
            source: "aria",
            status: "stable",
            default: "false",
            description: "Setter starttilstanden for på/av. Hvis du oppdaterer verdien utenfra, synkroniseres bryteren med den.",
        },
        {
            name: "onChange",
            type: "ToggleChangeHandler<HTMLButtonElement>",
            required: false,
            source: "react",
            status: "stable",
            description: "Kalles umiddelbart når brukeren veksler bryteren. Gir både event og ny tilstand.",
        },
        {
            name: "disabled",
            type: "boolean",
            required: false,
            source: "native",
            status: "stable",
            default: "false",
            description: "Deaktiverer bryteren. Forklar alltid for brukeren hvorfor den er deaktivert.",
        },
        {
            name: "title",
            type: "string",
            required: false,
            source: "native",
            status: "stable",
            description: "Tilleggsbeskrivelse som vises som native tooltip ved hover.",
        },
        {
            name: "className",
            type: "string",
            required: false,
            source: "react",
            status: "stable",
            description: "Egendefinerte CSS-klasser.",
        },
    ];
