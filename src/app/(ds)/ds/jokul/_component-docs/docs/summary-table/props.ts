import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "header", type: "[string, string]", required: true, source: "custom", status: "stable", description: "Tuppel med to kolonneoverskrifter." },
        { name: "body", type: "React.ReactNode", required: true, source: "custom", status: "stable", description: "SummaryTableRow-elementer." },
        { name: "caption", type: "string", required: false, source: "custom", status: "stable", description: "Tilgjengelig tabellbeskrivelse." },
        { name: "footer", type: "React.ReactNode", required: false, source: "custom", status: "stable", description: "Bunntekst i tabellen." },
    ];
