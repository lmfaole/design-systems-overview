import type { DesignSystemComponentPart } from "../../../../../types";

export const skeletonLoaderParts: DesignSystemComponentPart[] = [
    {
        name: "Animation wrapper",
        selector: ".jkl-skeleton-animation",
        description: "Omslutter en enkelt plassholder og tegner sweep-animasjonen over innholdet.",
        required: true,
        repeats: true,
    },
    {
        name: "Element placeholder",
        selector: ".jkl-skeleton-element",
        description: "Selve flaten som representerer det fremtidige innholdet. Kan gjøres rund med circle-modifier.",
        required: true,
        repeats: true,
        parentPartName: "Animation wrapper",
    },
    {
        name: "Input container",
        selector: ".jkl-skeleton-input",
        description: "Ferdig struktur for feltgrupper med label, input og eventuelle checkbox-rader.",
        required: false,
    },
    {
        name: "Checkbox row",
        selector: ".jkl-skeleton-input__checkbox",
        description: "Brukes når input-skjelettet også skal vise en tilhørende checkbox-rad.",
        required: false,
        repeats: true,
        parentPartName: "Input container",
    },
    {
        name: "Table container",
        selector: ".jkl-skeleton-table",
        description: "Ferdig struktur for tabeller der kolonner og rytme er kjent før dataene kommer.",
        required: false,
    },
    {
        name: "Table header",
        selector: ".jkl-skeleton-table__header",
        description: "Header-rad for tabellskjelett som viser forventet kolonneoppdeling.",
        required: false,
        parentPartName: "Table container",
    },
    {
        name: "Table row",
        selector: ".jkl-skeleton-table__row",
        description: "Gjentas for hver forventede datarad i tabellskjelettet.",
        required: false,
        repeats: true,
        parentPartName: "Table container",
    },
];
