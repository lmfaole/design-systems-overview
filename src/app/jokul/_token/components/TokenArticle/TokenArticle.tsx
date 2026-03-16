import React from "react";
import {Flex} from "@fremtind/jokul/flex";
import {DataTable} from "@fremtind/jokul/table";
import {PageHero} from "@/shared/components/PageHero/PageHero";
import {Article, ArticleToc} from "@/shared/components/Article";
import {ScssMixinSection} from "@/app/jokul/_token/components/ScssMixinSection";
import {Section} from "@/app/jokul/_token/components/Section";
import type {ScssMixin, TokenTable} from "@/app/jokul/_token/posts/types";

interface TokenArticleProps {
    title: string;
    excerpt: string;
    illustration: React.ReactNode;
    tokenOverview?: TokenTable[];
    scssSection?: ScssMixin[];
    meta?: React.ReactNode;
}

export function TokenArticle({
                                 title,
                                 excerpt,
                                 meta,
                                 illustration,
                                 tokenOverview,
                                 scssSection,
                             }: TokenArticleProps) {
    return (
        <Article>
            <PageHero title={title} background={illustration} description={excerpt} />

            <ArticleToc />

            {meta && <div className="token-article__meta">{meta}</div>}

            <Flex className="post-prose" direction="column" gap="xl">
                {tokenOverview && (
                    <Section title="Tokens">
                        <Flex direction="column" gap="xl">
                            {tokenOverview.map((table) => (
                                <Flex key={table.caption} direction="column" gap="m">
                                    {tokenOverview.length > 1 && <h3>{table.heading ?? table.caption}</h3>}
                                    {table.description && <p>{table.description}</p>}
                                    <DataTable
                                        caption={table.caption}
                                        columns={table.columns}
                                        rows={table.rows}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </Section>
                )}

                {scssSection && scssSection.length > 0 && (
                    <Section title="SCSS-mixins">
                        <ScssMixinSection mixins={scssSection}/>
                    </Section>
                )}
            </Flex>
        </Article>
    );
}
