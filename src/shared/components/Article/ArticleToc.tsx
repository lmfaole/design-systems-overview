"use client";
import { useEffect, useRef, useState } from "react";
import { TableOfContents } from "@fremtind/jokul/table-of-contents";

type TocItem = { id: string; label: string };

export function ArticleToc() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<TocItem[]>([]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const article = root.closest("article") ?? document;
        const collect = () => {
            const headings = Array.from(article.querySelectorAll<HTMLElement>("h2[id]"));
            const collected = headings
                .map((heading) => {
                    const id = heading.id;
                    const label = heading.textContent?.trim() ?? "";
                    if (!id || !label) return null;
                    return { id, label };
                })
                .filter((item): item is TocItem => Boolean(item));
            setItems(collected);
        };

        collect();
        const observer = new MutationObserver(() => collect());
        observer.observe(article, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="article-toc" ref={rootRef}>
            {items.length > 0 && (
                <TableOfContents label="Innhold">
                    {items.map((item) => (
                        <TableOfContents.Link key={item.id} href={`#${item.id}`}>
                            {item.label}
                        </TableOfContents.Link>
                    ))}
                </TableOfContents>
            )}
        </div>
    );
}
