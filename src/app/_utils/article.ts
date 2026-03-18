/**
 * Shared article utilities.
 * Used by both BlogArticle and TokenArticle to extract and
 * inject ids into h2 headings for TableOfContents linking.
 */
import React from "react";
import { slugify } from "@/app/_utils/format";

export function extractH2s(node: React.ReactNode): string[] {
    const headings: string[] = [];
    React.Children.forEach(node, (child) => {
        if (!React.isValidElement(child)) return;
        const el = child as React.ReactElement<{ children?: React.ReactNode }>;
        if (el.type === "h2") {
            const text = typeof el.props.children === "string" ? el.props.children : "";
            if (text) headings.push(text);
        } else if (el.props?.children) {
            headings.push(...extractH2s(el.props.children));
        }
    });
    return headings;
}

export function injectH2Ids(node: React.ReactNode): React.ReactNode {
    return React.Children.map(node, (child) => {
        if (!React.isValidElement(child)) return child;
        const el = child as React.ReactElement<{ children?: React.ReactNode; id?: string }>;
        if (el.type === "h2" && typeof el.props.children === "string") {
            return React.cloneElement(el, { id: slugify(el.props.children) });
        }
        if (el.props?.children) {
            return React.cloneElement(el, { children: injectH2Ids(el.props.children) } as Partial<typeof el.props>);
        }
        return child;
    });
}
