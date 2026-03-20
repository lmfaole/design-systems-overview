import {
    BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM,
    PATTERN_CATEGORY_LABELS,
    type PatternPost,
} from "@/features/ds/monster/types";
import loadingStates from "@/features/ds/monster/posts/loading-states";

function validatePatternPost(post: PatternPost): PatternPost {
    const firstImplementation = post.implementation[0];

    if (!firstImplementation) {
        throw new Error(`Pattern "${post.title}" is missing implementation guidance.`);
    }

    if (firstImplementation.designSystem !== BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM) {
        throw new Error(
            `Pattern "${post.title}" must start with "${BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM}" as its first implementation.`,
        );
    }

    return post;
}

export const patternPosts: PatternPost[] = [loadingStates].map(validatePatternPost);

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

/**
 * Lightweight summary used when other parts of the site need to link back to
 * pattern pages that mention a specific component or doc page.
 */
export interface PatternComponentBacklink {
    /**
     * Pattern page URL.
     */
    href: string;
    /**
     * Pattern title shown in backlink lists.
     */
    title: string;
    /**
     * Short summary used to explain why the pattern is relevant.
     */
    description: string;
    /**
     * Human-readable category label shown alongside the backlink.
     */
    categoryLabel: string;
    /**
     * Matching implementation variants that reference the component doc page.
     */
    implementationTitles: string[];
}

function normalizeReferencePath(href: string): string | undefined {
    try {
        const url = new URL(href, "https://monster.local");
        const pathname = url.pathname.replace(/\/+$/, "");
        return pathname || "/";
    } catch {
        return undefined;
    }
}

export function getPatternBacklinksForComponentHref(
    componentHref: string,
): PatternComponentBacklink[] {
    const normalizedComponentHref = normalizeReferencePath(componentHref);

    if (!normalizedComponentHref) {
        return [];
    }

    return patternPosts
        .flatMap((post) => {
            const implementationTitles = Array.from(
                new Set(
                    post.implementation
                        .filter((implementation) =>
                            implementation.components.some(
                                (component) =>
                                    normalizeReferencePath(component.href) === normalizedComponentHref,
                            ),
                        )
                        .map((implementation) => implementation.title),
                ),
            );

            if (implementationTitles.length === 0) {
                return [];
            }

            return [
                {
                    href: getPatternHref(post),
                    title: post.title,
                    description: post.description,
                    categoryLabel: PATTERN_CATEGORY_LABELS[post.category],
                    implementationTitles,
                },
            ];
        })
        .sort((a, b) => a.title.localeCompare(b.title, "nb"));
}

export { BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM };
export type { PatternPost };
export type {
    PatternCategory,
    PatternAccessibilityConcern,
    PatternDoAndDonts,
    PatternDoAndDontsItem,
    PatternFurtherReadingItem,
    PatternIllustration,
    PatternImplementation,
    PatternImplementationComponentReference,
    PatternImplementationGuideStep,
} from "@/features/ds/monster/types";
