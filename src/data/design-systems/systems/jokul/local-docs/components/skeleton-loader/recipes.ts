import type { DesignSystemComponentRecipe } from "../../../../../types";
import {
    renderSkeletonLoaderHtmlCode,
    renderSkeletonLoaderPreviewMarkup,
    type SkeletonLoaderExampleState,
} from "./example";

function createRecipeExample(state: SkeletonLoaderExampleState, note: string) {
    return {
        slug: `${state.pattern}-recipe`,
        previewHtml: renderSkeletonLoaderPreviewMarkup(state),
        codeExamples: [
            {
                label: "HTML",
                language: "html" as const,
                code: renderSkeletonLoaderHtmlCode(state),
            },
            {
                label: "CSS-importer",
                language: "ts" as const,
                code: `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css";`,
            },
        ],
        notes: [note],
    };
}

export const skeletonLoaderRecipes: DesignSystemComponentRecipe[] = [
    {
        slug: "element",
        title: "Element",
        description: "Minste gyldige komposisjon. Bruk denne når du kjenner formen på ett enkelt element, som en avatar eller en kort tekstlinje.",
        requiredPartNames: [
            "Animation wrapper",
            "Element placeholder",
        ],
        example: createRecipeExample(
            {
                pattern: "element",
                compact: false,
                shape: "circle",
            },
            "Circle-varianten passer når sluttresultatet er et rundt element, for eksempel en avatar.",
        ),
    },
    {
        slug: "input",
        title: "Input",
        description: "Ferdig komposisjon for skjemaområder der du vil beholde rytmen mellom label, felt og tilvalg mens innholdet lastes.",
        requiredPartNames: [
            "Input container",
            "Animation wrapper",
            "Element placeholder",
            "Checkbox row",
        ],
        example: createRecipeExample(
            {
                pattern: "input",
                compact: false,
                shape: "rectangle",
            },
            "Input-komposisjonen er nyttig når brukeren venter på at et skjema eller en feltgruppe skal bli klar.",
        ),
    },
    {
        slug: "table",
        title: "Table",
        description: "Brukes når tabellstrukturen er kjent og du vil vise kolonner og radrytme før dataene kommer.",
        requiredPartNames: [
            "Table container",
            "Table header",
            "Table row",
            "Animation wrapper",
            "Element placeholder",
        ],
        example: createRecipeExample(
            {
                pattern: "table",
                compact: true,
                shape: "rectangle",
            },
            "Tabell-komposisjonen bør speile en konkret tabellvisning, ikke brukes som generell sidefyll.",
        ),
    },
];
