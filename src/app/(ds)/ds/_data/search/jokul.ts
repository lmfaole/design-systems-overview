import { componentDocs } from "@/app/ds/_data/jokul-component-docs";
import { tokenPosts, getTokenSlug } from "@/app/ds/_data/jokul-tokens";
import type { DsSearchDocument } from "./types";

export function getJokulSearchDocuments(): DsSearchDocument[] {
    const componentDocuments: DsSearchDocument[] = componentDocs.map((doc) => ({
        id: `component-${doc.id}`,
        designSystemId: "jokul",
        designSystemName: "Jøkul",
        kind: "component",
        title: doc.name,
        description: doc.description.short,
        keywords: [
            doc.id,
            doc.package,
            doc.category,
            doc.description.long,
            ...doc.props.map((prop) => prop.name),
            ...(doc.relationships?.alternatives?.map((item) => item.id) ?? []),
            ...(doc.relationships?.related?.map((item) => item.id) ?? []),
            ...(doc.relationships?.requires?.map((item) => item.id) ?? []),
            ...(doc.relationships?.subcomponents?.map((item) => item.id) ?? []),
        ],
        href: `/ds/jokul/component/${doc.id}`,
        meta: `Jøkul · Komponent · ${doc.category}`,
    }));

    const tokenDocuments: DsSearchDocument[] = tokenPosts.map((post) => ({
        id: `token-${post.id}`,
        designSystemId: "jokul",
        designSystemName: "Jøkul",
        kind: "token",
        title: post.title,
        description: post.excerpt,
        keywords: [
            ...(post.relatedComponents ?? []),
            ...(post.tokenOverview?.flatMap((table) => [
                table.heading ?? "",
                table.description ?? "",
                table.caption,
                ...table.columns,
            ]) ?? []),
            ...(post.scssSection?.map((section) => section.name) ?? []),
        ],
        href: `/ds/jokul/token/${getTokenSlug(post)}`,
        meta: "Jøkul · Designtoken",
    }));

    return [...componentDocuments, ...tokenDocuments];
}
