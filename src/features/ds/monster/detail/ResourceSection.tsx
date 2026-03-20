import type { PatternPost } from "@/data/monster/patterns";
import {
    RESOURCE_PUBLISHERS,
    RESOURCE_PUBLISHER_TYPE_LABELS,
} from "@/components/ds/resource-list/types";

interface ResourceSectionProps {
    items: PatternPost["resources"];
}

export function ResourceSection({ items }: ResourceSectionProps) {
    if (items.length === 0) return null;

    const shouldSortByRelevance = items.some((item) => typeof item.relevance === "number");
    const sortedItems = shouldSortByRelevance
        ? [...items].sort((a, b) => {
            const aRel = a.relevance ?? 0;
            const bRel = b.relevance ?? 0;
            if (bRel !== aRel) return bRel - aRel;
            return a.title.localeCompare(b.title);
        })
        : items;

    return (
        <section className="monster-section" aria-labelledby="videre-lesning">
            <h2 id="videre-lesning">Videre lesning</h2>
            <ul className="monster-link-list">
                {sortedItems.map((item) => {
                    const publisher = item.publisher ? RESOURCE_PUBLISHERS[item.publisher] : null;
                    const typeLabel = publisher
                        ? RESOURCE_PUBLISHER_TYPE_LABELS[publisher.type]
                        : null;
                    const meta = publisher && typeLabel ? `${publisher.title} · ${typeLabel}` : null;

                    return (
                        <li key={item.href}>
                            <a href={item.href}>{item.title}</a>
                            {(meta || item.description) && (
                                <p className="monster-inline-meta">
                                    {meta}
                                    {meta && item.description ? " · " : ""}
                                    {item.description ?? ""}
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
