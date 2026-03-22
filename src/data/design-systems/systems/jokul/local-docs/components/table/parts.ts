import type { DesignSystemComponentPart } from "../../../../../types";

export const tableParts: DesignSystemComponentPart[] = [
    {
        name: "Table root",
        selector: ".jkl-table",
        description: "Rotelementet som samler tabellens layout, breddevalg og responsiv listevisning.",
        required: true,
    },
    {
        name: "Caption",
        selector: "caption",
        description: "Navngir datasettet semantisk. Kan skjules visuelt med `jkl-table-caption--sr-only`.",
        required: true,
        parentPartName: "Table root",
    },
    {
        name: "Head section",
        selector: ".jkl-table-head",
        description: "Omslutter header-raden og kan gjøres sticky for lange tabeller.",
        required: true,
        parentPartName: "Table root",
    },
    {
        name: "Header cell",
        selector: ".jkl-table-header",
        description: "Kolonne- eller radheader med align- og sticky-relatert oppførsel.",
        required: true,
        repeats: true,
        parentPartName: "Head section",
    },
    {
        name: "Body row",
        selector: ".jkl-table-row",
        description: "Gjentas for hver datarad og bærer hover-, klikk- og ekspanderingsstiler.",
        required: true,
        repeats: true,
        parentPartName: "Table root",
    },
    {
        name: "Data cell",
        selector: ".jkl-table-cell",
        description: "Vanlige dataceller. Når tabellen kan brytes ned til listevisning må de også ha `data-th`.",
        required: true,
        repeats: true,
        parentPartName: "Body row",
    },
];
