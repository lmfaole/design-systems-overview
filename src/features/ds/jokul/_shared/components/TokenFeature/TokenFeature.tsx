import React from "react";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import "./token-feature.scss";

interface TokenFeaturePost {
    id: number;
    title: string;
    href: string;
    illustration?: React.ReactNode;
}

interface TokenFeatureProps {
    post: TokenFeaturePost;
    staticIllustration?: boolean;
}

/** Illustrated card linking to a token documentation article. */
export function TokenFeature({ post, staticIllustration = false }: TokenFeatureProps) {
    return (
        <Card
            as="a"
            href={post.href}
            clickable
            aria-label={post.title}
        >
            <div className="token-feature" data-static-illustration={staticIllustration || undefined}>
                {post.illustration && (
                    <div className="background" aria-hidden="true">
                        {post.illustration}
                    </div>
                )}
                <Flex className="content" alignItems="center" justifyContent="center">
                    <strong className="title">{post.title}</strong>
                </Flex>
            </div>
        </Card>
    );
}
