import { Flex } from "@fremtind/jokul/flex";
import { PageHero } from "@/shared/components/PageHero/PageHero";
import { NotFound } from "@/shared/components/NotFound";
import { getPatternPost } from "@/app/jokul/_pattern/data";
import type { PatternPost } from "@/app/jokul/_pattern/data";
import { getComponentDoc } from "@/app/jokul/_component-docs/data";
import { RelatedComponentsTable } from "@/app/jokul/_component-docs/components/RelatedComponentsTable";
import type { RelatedComponentDoc } from "@/shared/components/RelatedComponentCard";
import { DotsIllustration } from "@/shared/components/Illustration";
import { Article, ArticleToc } from "@/shared/components/Article";
import { Grid } from "@/shared/components/Grid";
import { ListItem, UnorderedList } from "@fremtind/jokul/list";
import { Link } from "@fremtind/jokul/link";
import { ExampleCard } from "./ExampleCard";
import { ResourceSection } from "@/shared/components/ResourceList/ResourceSection";

export const runtime = "edge";

type Awaitable<T> = T | Promise<T>;

interface PatternPageProps {
    params: Awaitable<{ id: string }>;
    searchParams?: Awaitable<{ id?: string }>;
}

export default async function PatternPage({ params, searchParams }: PatternPageProps) {
    // Next can provide `params`/`searchParams` as Promises (sync dynamic APIs).
    const resolvedParams = await params;
    const resolvedSearchParams = await Promise.resolve(searchParams);

    // Also try `searchParams.id` since some runtimes may mirror dynamic params into the query string.
    const candidates = [resolvedParams.id, resolvedSearchParams?.id].filter(Boolean) as string[];
    const post = candidates.map((id) => getPatternPost(id)).find(Boolean);

    if (!post) {
        return (
            <NotFound
                message="Fant ikke mønsteret"
                backHref="/jokul/monster"
                backLabel="Tilbake til alle mønstre"
            />
        );
    }

    const usedComponents: Array<{ doc: RelatedComponentDoc; description: string }> = (post.components ?? []).flatMap((id) => {
        const doc = getComponentDoc(id);
        return doc ? [{ doc: { id: doc.id, name: doc.name, preview: doc.preview }, description: doc.description.short }] : [];
    });

    const background = <DotsIllustration />;

    return (
        <Flex as="main" direction="column" gap="xl">
            <PageHero title={post.title} description={post.goals} background={background} size="compact" />

            <div className="pattern-page__content">
                <Flex direction="column" gap="xl">
                    <Article className="post-prose post-prose--pattern">
                        <ArticleToc />
                        {post.examples.length > 0 && <ExamplesSection examples={post.examples} />}
                        {post.avoid.length > 0 && <AvoidSection avoid={post.avoid} />}
                        <AccessibilitySection accessibility={post.accessibility} />
                        <ResourceSection
                            items={post.resources.map((resource) => ({
                                title: resource.title,
                                href: resource.href,
                                publisher: resource.publisher,
                                relevance: resource.relevance,
                                description: resource.description,
                            }))}
                        />
                    </Article>

                    {usedComponents.length > 0 && (
                        <Flex as="section" direction="column" gap="m">
                            <h2>Komponenter</h2>
                            <RelatedComponentsTable items={usedComponents} />
                        </Flex>
                    )}
                </Flex>
            </div>
        </Flex>
    );
}

function ExamplesSection({ examples }: { examples: PatternPost["examples"] }) {
    const columns = Math.min(4, Math.max(1, examples.length)) as 1 | 2 | 3 | 4;

    return (
        <section aria-labelledby="eksempler">
            <Flex direction="column" gap="m">
                <h2 id="eksempler">Eksempler</h2>
                <Grid columns={columns} gap="m">
                    {examples.map((example) => (
                        <ExampleCard
                            key={example.title}
                            title={example.title}
                            description={example.description}
                            code={example.code}
                        >
                            <example.Example />
                        </ExampleCard>
                    ))}
                </Grid>
            </Flex>
        </section>
    );
}

function AvoidSection({ avoid }: { avoid: PatternPost["avoid"] }) {
    const columns = Math.min(4, Math.max(1, avoid.length)) as 1 | 2 | 3 | 4;

    return (
        <section aria-labelledby="fallgruver">
            <Flex direction="column" gap="m">
                <h2 id="fallgruver">Hva du bør unngå</h2>
                <Grid columns={columns} gap="m">
                    {avoid.map((example) => (
                        <ExampleCard
                            key={example.title}
                            title={example.title}
                            description={example.description}
                            code={example.code}
                        >
                            <example.Example />
                        </ExampleCard>
                    ))}
                </Grid>
            </Flex>
        </section>
    );
}

function AccessibilitySection({ accessibility }: { accessibility: PatternPost["accessibility"] }) {
    const wcagSorted = [...accessibility.wcag].sort((a, b) => compareWcagIds(a.id, b.id));

    return (
        <section aria-labelledby="tilgjengelighet">
            <div className="pattern-prose__text">
                <Flex direction="column" gap="l">
                    <h2 id="tilgjengelighet">Tilgjengelighet</h2>
                    <h3>{accessibility.title}</h3>
                    <p>{accessibility.description}</p>

                    {accessibility.ariaRoles.length > 0 && (
                        <Flex direction="column" gap="s">
                            <h4>ARIA</h4>
                            <UnorderedList>
                                {accessibility.ariaRoles.map((item, i) => (
                                    <ListItem key={i}>{item}</ListItem>
                                ))}
                            </UnorderedList>
                        </Flex>
                    )}

                    {wcagSorted.length > 0 && (
                        <Flex direction="column" gap="s">
                            <h4>WCAG</h4>
                            <UnorderedList>
                                {wcagSorted.map((rule) => {
                                    return (
                                        <ListItem key={rule.id}>
                                            <Flex direction="column" gap="xs">
                                                {rule.url ? (
                                                    <Link href={rule.url} external>
                                                        {rule.id} {rule.title} (Nivå {rule.level})
                                                    </Link>
                                                ) : (
                                                    <span>
                                                        {rule.id} {rule.title} (Nivå {rule.level})
                                                    </span>
                                                )}
                                                <small className="muted">{rule.relevance}</small>
                                            </Flex>
                                        </ListItem>
                                    );
                                })}
                            </UnorderedList>
                        </Flex>
                    )}

                    <Flex direction="column" gap="s">
                        <h4>Slik unngår du det</h4>
                        <UnorderedList>
                            {accessibility.avoid.map((item, i) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>

                    {accessibility.testing && accessibility.testing.length > 0 && (
                        <Flex direction="column" gap="s">
                            <h4>Testing</h4>
                            <UnorderedList>
                                {accessibility.testing.map((item, i) => (
                                    <ListItem key={i}>{item}</ListItem>
                                ))}
                            </UnorderedList>
                        </Flex>
                    )}
                </Flex>
            </div>
        </section>
    );
}

function compareWcagIds(a: string, b: string) {
    const aParts = a.split(".").map((p) => Number.parseInt(p, 10));
    const bParts = b.split(".").map((p) => Number.parseInt(p, 10));
    const len = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < len; i++) {
        const av = aParts[i] ?? -1;
        const bv = bParts[i] ?? -1;
        if (av !== bv) return av - bv;
    }

    return 0;
}
