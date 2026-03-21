import { RESOURCE_PUBLISHERS, RESOURCE_PUBLISHER_TYPE_LABELS } from "@/components/resource-list-types";
import { renderTokenIllustrationHtml } from "@/features/ds/jokul/_shared/components/TokenIllustration/shared";
import type { TokenPost, TokenResource } from "@/data/jokul/tokens";

interface SerializedTokenTable {
    heading?: string;
    description?: string;
    caption: string;
    columns: string[];
    rows: string[][];
}

interface SerializedTokenResource {
    title: string;
    href: string;
    meta?: string;
    description?: string;
}

export interface SerializedTokenPost {
    title: string;
    excerpt: string;
    illustrationHtml?: string;
    tokenOverview: SerializedTokenTable[];
    scssSection: NonNullable<TokenPost["scssSection"]>;
    resources: SerializedTokenResource[];
}

function serializeTokenResources(resources: TokenResource[] = []): SerializedTokenResource[] {
    const shouldSortByRelevance = resources.some((item) => typeof item.relevance === "number");
    const sortedItems = shouldSortByRelevance
        ? [...resources].sort((a, b) => {
              const aRel = a.relevance ?? 0;
              const bRel = b.relevance ?? 0;
              if (bRel !== aRel) return bRel - aRel;
              return a.title.localeCompare(b.title, "nb");
          })
        : resources;

    return sortedItems.map((item) => {
        const publisher = item.publisher ? RESOURCE_PUBLISHERS[item.publisher] : null;
        const typeLabel = publisher ? RESOURCE_PUBLISHER_TYPE_LABELS[publisher.type] : null;

        return {
            title: item.title,
            href: item.url,
            meta:
                publisher && typeLabel
                    ? `${publisher.title} · ${typeLabel}`
                    : undefined,
            description: item.description,
        };
    });
}

export function serializeTokenPost(post: TokenPost): SerializedTokenPost {
    return {
        title: post.title,
        excerpt: post.excerpt,
        illustrationHtml: post.illustration ? renderTokenIllustrationHtml(post.illustration, "page") : undefined,
        tokenOverview: post.tokenOverview ?? [],
        scssSection: post.scssSection ?? [],
        resources: serializeTokenResources(post.resources),
    };
}
