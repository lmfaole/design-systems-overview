import {
    BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM,
    type PatternImplementation,
    type PatternImplementationComponentReference,
} from "@/data/mønster/types";
import { renderPatternExamples, type PatternExampleDefinition } from "./examples";

interface PatternImplementationDefinition {
    designSystem: string;
    title: string;
    descriptionHtml: string;
    liveExamples?: PatternExampleDefinition[];
    components?: PatternImplementationComponentReference[];
}

type VanillaPatternImplementationDefinition = Omit<
    PatternImplementationDefinition,
    "designSystem"
>;

/**
 * Build one implementation variant from example definitions and component
 * references without mixing rendering concerns into the post files.
 */
export function createPatternImplementation({
    liveExamples = [],
    components = [],
    ...implementation
}: PatternImplementationDefinition): PatternImplementation {
    return {
        ...implementation,
        liveExamples: renderPatternExamples(liveExamples),
        components,
    };
}

/**
 * Build the required baseline implementation that every pattern starts with.
 */
export function createVanillaImplementation(
    implementation: VanillaPatternImplementationDefinition,
): PatternImplementation {
    return createPatternImplementation({
        ...implementation,
        designSystem: BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM,
    });
}
