import { Fragment, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RESOURCE_PUBLISHERS, RESOURCE_PUBLISHER_TYPE_LABELS } from "@/components/ds/resource-list/types";
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
    descriptionHtml?: string;
}

export interface SerializedTokenPost {
    title: string;
    excerpt: string;
    illustrationHtml?: string;
    tokenOverview: SerializedTokenTable[];
    scssSection: NonNullable<TokenPost["scssSection"]>;
    resources: SerializedTokenResource[];
}

function renderRichContent(content: ReactNode): string {
    return renderToStaticMarkup(<Fragment>{content}</Fragment>);
}

function renderOptionalRichContent(content?: ReactNode): string | undefined {
    if (!content) {
        return undefined;
    }

    const html = renderRichContent(content);
    return html.length > 0 ? html : undefined;
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
            descriptionHtml: renderOptionalRichContent(item.description),
        };
    });
}

export function serializeTokenPost(post: TokenPost): SerializedTokenPost {
    return {
        title: post.title,
        excerpt: post.excerpt,
        illustrationHtml: renderOptionalRichContent(post.illustration),
        tokenOverview: (post.tokenOverview ?? []).map((table) => ({
            heading: table.heading,
            description: table.description,
            caption: table.caption,
            columns: table.columns,
            rows: table.rows.map((row) => row.map((cell) => renderRichContent(cell))),
        })),
        scssSection: post.scssSection ?? [],
        resources: serializeTokenResources(post.resources),
    };
}
