"use client";

export const runtime = "edge";

import { Flex } from "@fremtind/jokul/flex";
import { getTokenPost } from "@/app/jokul/_token/data";
import { ResourceSection } from "@/shared/components/ResourceList/ResourceSection";
import { useParams } from "next/navigation";

export default function TokenPostLayout({children}: { children: React.ReactNode }) {
    const {slug} = useParams<{ slug: string }>();
    const post = getTokenPost(slug);

    return (
        <Flex direction="column" gap="xl">
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
