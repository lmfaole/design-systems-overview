import type {
    PatternExample,
    PatternAvoidExample,
    PatternExampleVariant,
} from "@/features/ds/monster/types";

export function getHtmlVariants(example: PatternExample | PatternAvoidExample): PatternExampleVariant[] {
    if ("variants" in example && example.variants) {
        return example.variants.filter((variant) => variant.kind === "html");
    }

    return [];
}
