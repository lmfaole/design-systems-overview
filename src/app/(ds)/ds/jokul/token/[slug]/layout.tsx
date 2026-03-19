export const runtime = "edge";

import type { Metadata } from "next";
import { Flex } from "@fremtind/jokul/flex";
import { getTokenPost } from "@/app/ds/jokul/_token/data";
import { ResourceSection } from "@/app/ds/jokul/_shared/components/ResourceList/ResourceSection";
import { createPageMetadata } from "@/app/_shared/seo";

type Awaitable<T> = T | Promise<T>;

export async function generateMetadata({ params }: { params: Awaitable<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getTokenPost(resolvedParams.slug);

    if (!post) {
        return createPageMetadata({
            title: "Fant ikke token-artikkel",
            description: "Token-artikkelen du prøvde å åpne finnes ikke i Jøkul-dokumentasjonen.",
            path: `/ds/jokul/token/${resolvedParams.slug}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: `${post.title} i Jøkul`,
        description: post.excerpt,
        path: `/ds/jokul/token/${resolvedParams.slug}`,
        type: "article",
    });
}

export default async function TokenPostLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Awaitable<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const post = getTokenPost(resolvedParams.slug);

    return (
        <Flex className="page" direction="column" gap="xl">
            {children}
            {post?.resources && post.resources.length > 0 && (
                <div className="post-prose post-prose--pattern">
                    <ResourceSection
                        items={post.resources.map((resource) => ({
                            title: resource.title,
                            href: resource.url,
                            publisher: resource.publisher,
                            relevance: resource.relevance,
                            description: resource.description,
                        }))}
                    />
                </div>
            )}
        </Flex>
    );
}
