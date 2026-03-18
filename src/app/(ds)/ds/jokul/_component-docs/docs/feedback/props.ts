import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "type",
            type: '"smiley" | "radio"',
            required: true,
            source: "custom",
            status: "stable",
            description: "Velger mellom smiley-vurdering og radioknapper.",
        },
        {
            name: "label",
            type: "string",
            required: true,
            source: "custom",
            status: "stable",
            description: "Spørsmålet som stilles til brukeren.",
        },
        {
            name: "options",
            type: "Array<{ label: string; value: string | number }>",
            required: true,
            source: "custom",
            status: "stable",
            description: "Alternativer brukeren kan velge. For smiley brukes value: number (1–5).",
        },
        {
            name: "onSubmit",
            type: "({ feedbackValue, intentionalSubmit, message? }: FeedbackSubmitEvent) => void",
            required: true,
            source: "react",
            status: "stable",
            description: "Kalles når brukeren sender inn tilbakemeldingen.",
        },
        {
            name: "addOnQuestion",
            type: "{ label: string }",
            required: false,
            source: "custom",
            status: "stable",
            description: "Oppfølgingsspørsmål med tekstfelt som vises etter valg.",
        },
    ];
