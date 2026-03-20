import type React from "react";
import { Link } from "@fremtind/jokul/link";
import { ListItem, UnorderedList } from "@fremtind/jokul/list";
import {
    RESOURCE_PUBLISHERS,
    RESOURCE_PUBLISHER_TYPE_LABELS,
    type ResourcePublisher,
    type ResourceRelevance,
} from "./types";

export interface ResourceListItem {
    title: string;
    href: string;
    publisher?: ResourcePublisher;
    relevance?: ResourceRelevance;
    description?: React.ReactNode;
}

interface ResourceListProps {
    items: ResourceListItem[];
}

export function ResourceList({ items }: ResourceListProps) {
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
        <UnorderedList>
            {sortedItems.map((item) => {
                const publisher = item.publisher ? RESOURCE_PUBLISHERS[item.publisher] : null;
                const typeLabel = publisher ? RESOURCE_PUBLISHER_TYPE_LABELS[publisher.type] : null;
                const meta =
                    publisher && typeLabel
                        ? `${publisher.title} · ${typeLabel}`
                        : null;

                return (
                    <ListItem key={item.href}>
                        <div>
                            <Link href={item.href} external>
                                {item.title}
                            </Link>
                            {(meta || item.description) && (
                                <p className="muted">
                                    <small>
                                        {meta}
                                        {meta && item.description ? " · " : ""}
                                        {item.description ?? ""}
                                    </small>
                                </p>
                            )}
                        </div>
                    </ListItem>
                );
            })}
        </UnorderedList>
    );
}
