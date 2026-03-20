import { patternPosts, getPatternHref } from "@/app/ds/monster/data";
import type { PatternCategory } from "@/app/ds/monster/types";
import type { DsSearchDocument } from "./types";

const CATEGORY_LABELS: Record<PatternCategory, string> = {
    handlinger: "Handlinger",
    navigasjon: "Navigasjon",
    tilbakemelding: "Tilbakemelding",
    struktur: "Struktur",
};

export function getPatternSearchDocuments(): DsSearchDocument[] {
    return patternPosts.map((post) => ({
        id: `pattern-${post.id}`,
        designSystemId: "patterns",
        designSystemName: "Mønstre",
        kind: "pattern",
        title: post.title,
        description: post.goals,
        keywords: [
            CATEGORY_LABELS[post.category],
            ...(post.components ?? []),
        ],
        href: getPatternHref(post),
        meta: `Mønster · ${CATEGORY_LABELS[post.category]}`,
    }));
}
