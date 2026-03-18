import type { PropDef } from "../types";

export const props: PropDef[] = [
    {
        name: "errors",
        type: "(string | undefined)[]",
        required: true,
        source: "custom",
        status: "stable",
        description: "Feilmeldinger som skal vises som en liste i oppsummeringen.",
    },
    {
        name: "isSubmitted",
        type: "boolean",
        required: true,
        source: "custom",
        status: "stable",
        description: "Om brukeren har forsokt a sende inn skjemaet (styrer synlighet).",
    },
    {
        name: "isValid",
        type: "boolean",
        required: true,
        source: "custom",
        status: "stable",
        description: "Om skjemaet er gyldig. Vises nar isSubmitted er true og isValid er false.",
    },
    {
        name: "messageProps",
        type: "Partial<MessageProps>",
        required: false,
        source: "custom",
        status: "stable",
        default: '{ title: "Feil og mangler i skjemaet" }',
        description: "Props som sendes videre til underliggende Message (f.eks. title, fullWidth, dismissAction). variant og children styres av FormErrorMessage.",
    },
    {
        name: "id",
        type: "string",
        required: false,
        source: "native",
        status: "stable",
        description: "ID pa wrapper-elementet.",
    },
    {
        name: "className",
        type: "string",
        required: false,
        source: "native",
        status: "stable",
        description: "Ekstra CSS-klasser pa wrapper-elementet.",
    },
];
