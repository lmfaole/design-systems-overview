import React from "react";
import { TableOfContents } from "@fremtind/jokul/table-of-contents";

interface ArticleTocProps {
    children: React.ReactNode;
    label?: string;
}

export function ArticleToc({ children, label = "Innhold" }: ArticleTocProps) {
    return (
        <div className="article-toc">
            <TableOfContents label={label}>{children}</TableOfContents>
        </div>
    );
}

