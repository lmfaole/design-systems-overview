import type { PatternImplementation, PatternPost } from "@/features/ds/monster/types";

/**
 * Pattern content that is independent of the implementation variants shown on the page.
 */
export type PatternPostContent = Omit<PatternPost, "implementation">;

/**
 * Assemble a full pattern post from shared content and its implementation variants.
 */
export function createPatternPost(
    content: PatternPostContent,
    implementation: PatternImplementation[],
): PatternPost {
    return {
        ...content,
        implementation,
    };
}
