import { patternPosts, getPatternHref, getPatternSlug } from "@/data/monster/patterns";
import { PATTERN_CATEGORY_LABELS } from "@/features/ds/monster/types";
import type { DsSearchDocument } from "./types";

export function getPatternSearchDocuments(): DsSearchDocument[] {
    return patternPosts.map((post) => ({
        id: `pattern-${getPatternSlug(post)}`,
        designSystemId: "patterns",
        designSystemName: "Mønstre",
        kind: "pattern",
        title: post.title,
        description: post.description,
        keywords: [
            PATTERN_CATEGORY_LABELS[post.category],
            ...post.doAndDonts.dos.map((item) => item.title),
            ...post.doAndDonts.donts.map((item) => item.title),
            ...post.accessibilityConcerns.map((item) => item.title),
            ...post.implementation.map((item) => item.designSystem),
            ...post.implementation.map((item) => item.title),
            ...post.implementation.flatMap((item) => item.components.map((component) => component.title)),
        ],
        href: getPatternHref(post),
        meta: `Mønster · ${PATTERN_CATEGORY_LABELS[post.category]}`,
    }));
}
