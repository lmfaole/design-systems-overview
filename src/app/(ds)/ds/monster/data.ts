import type { PatternPost } from "./types";
import loadingStates from "./posts/loading-states";

export const patternPosts: PatternPost[] = [loadingStates];

export function getPatternPost(id: string | number): PatternPost | undefined {
    const raw = decodeURIComponent(String(id)).split(/[?#]/)[0];
    const match = raw.match(/^\d+$/);
    if (!match) {
        return undefined;
    }

    const numericId = Number(match[0]);
    return patternPosts.find((p) => p.id === numericId);
}

export function getPatternHref(post: Pick<PatternPost, "id">): string {
    return `/ds/monster/${post.id}`;
}

export type { PatternPost };
export type {
    PatternCategory,
    PatternExample,
    PatternAvoidExample,
    PatternExampleVariant,
    PatternExampleVariantKind,
    PatternAccessibility,
    PatternDoAndDonts,
    PatternResource,
} from "./types";
