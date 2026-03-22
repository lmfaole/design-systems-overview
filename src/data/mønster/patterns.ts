import { slugify } from "@/lib/format";

export interface PatternSummary {
    slug?: string;
    title: string;
    description: string;
    keywords: string[];
    relatedAssetHrefs: Array<`/ds/${string}`>;
}

export interface PatternComponentBacklink {
    href: `/ds/mønster/${string}`;
    title: string;
    description: string;
}

export const patternPosts: PatternSummary[] = [];

export function getPatternSlug(post: Pick<PatternSummary, "title"> & { slug?: string }): string {
    return post.slug ?? slugify(post.title);
}

export function getPatternPost(slug: string): PatternSummary | undefined {
    const raw = decodeURIComponent(slug).split(/[?#]/)[0];
    const normalizedSlug = slugify(raw);

    if (!normalizedSlug) {
        return undefined;
    }

    return patternPosts.find((post) => getPatternSlug(post) === normalizedSlug);
}

export function getPatternHref(post: Pick<PatternSummary, "title"> & { slug?: string }): `/ds/mønster/${string}` {
    return `/ds/mønster/${getPatternSlug(post)}`;
}

function normalizeReferencePath(href: string): string | undefined {
    try {
        const url = new URL(href, "https://mønster.local");
        const pathname = url.pathname.replace(/\/+$/, "");
        return pathname || "/";
    } catch {
        return undefined;
    }
}

export function getPatternBacklinksForComponentHref(componentHref: string): PatternComponentBacklink[] {
    const normalizedComponentHref = normalizeReferencePath(componentHref);

    if (!normalizedComponentHref) {
        return [];
    }

    return patternPosts
        .filter((post) =>
            post.relatedAssetHrefs.some((href) => normalizeReferencePath(href) === normalizedComponentHref),
        )
        .map((post) => ({
            href: getPatternHref(post),
            title: post.title,
            description: post.description,
        }))
        .sort((a, b) => a.title.localeCompare(b.title, "nb"));
}
