import type {PropDef} from "../types";

export const props: PropDef[] = [
    {
        name: "aboutPage",
        type: "string",
        required: true,
        source: "custom",
        status: "stable",
        description: "Lenke til siden som forklarer hvilke informasjonskapsler løsningen bruker og hvorfor.",
    },
    {
        name: "blocking",
        type: "boolean",
        required: false,
        source: "custom",
        status: "stable",
        default: "false",
        description: "Gjør dialogen blokkerende ved å bruke alertdialog i stedet for vanlig dialog.",
    },
    {
        name: "onAccept",
        type: "(consent: Consent) => void",
        required: false,
        source: "custom",
        status: "stable",
        description: "Kalles etter at brukeren har godtatt eller avslått valgfri sporing, med det lagrede samtykket.",
    },
];
