"use client";

import { TokenArticle } from "@/app/ds/jokul/_token/components/TokenArticle";
import { NotFound } from "@/app/ds/jokul/_shared/components/NotFound";
import { getTokenPost } from "@/app/ds/jokul/_token/data";
import "./token-article.scss";

export function TokenPostPageClient({ slug }: { slug: string }) {
    const post = getTokenPost(slug);

    if (!post) {
        return (
            <NotFound
                message="Fant ikke innlegget"
                backHref="/ds/jokul/token"
                backLabel="Tilbake til grunnleggende konsepter"
            />
        );
    }

    return (
        <TokenArticle
            title={post.title}
            excerpt={post.excerpt}
            illustration={post.illustration}
            tokenOverview={post.tokenOverview}
            scssSection={post.scssSection}
        />
    );
}
