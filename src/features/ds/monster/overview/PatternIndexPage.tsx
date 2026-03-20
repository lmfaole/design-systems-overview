import { patternPosts, getPatternHref } from "@/data/monster/patterns";
import { Grid } from "@/components/ds/Grid";
import { PageHeader } from "@/components/ds/PageHeader";
import { PATTERN_CATEGORY_LABELS } from "@/features/ds/monster/types";
import "../detail/monster-detail.scss";

export default function PatternIndexPage() {
    const categories = Array.from(new Set(patternPosts.map((post) => post.category))).sort((a, b) =>
        PATTERN_CATEGORY_LABELS[a].localeCompare(PATTERN_CATEGORY_LABELS[b], "nb"),
    );

    return (
        <>
            <div className="monster-hero">
                <PageHeader
                    title="Mønster"
                    description="Anbefalte løsninger på gjentakende UI-problemer. Bruk disse for å få konsistent, tilgjengelig og forutsigbar oppførsel på tvers av designsystemer."
                />
            </div>

            {categories.map((category) => {
                const posts = patternPosts.filter((post) => post.category === category);

                return (
                    <section key={category} className="monster-section" aria-labelledby={`kategori-${category}`}>
                        <h2 id={`kategori-${category}`}>{PATTERN_CATEGORY_LABELS[category]}</h2>
                        <Grid
                            as="ul"
                            columns={2}
                            gap="var(--site-space-m)"
                            className="bare-list monster-patterns"
                        >
                            {posts.map((post) => {
                                const Illustration = post.illustration.component;

                                return (
                                    <li key={post.id} className="monster-pattern">
                                        <div>
                                            <div
                                                className="monster-pattern-illustration"
                                                role={post.illustration.label ? "img" : undefined}
                                                aria-label={post.illustration.label}
                                                aria-hidden={post.illustration.label ? undefined : true}
                                            >
                                                <Illustration />
                                            </div>
                                            <h3>
                                                <a href={getPatternHref(post)}>{post.title}</a>
                                            </h3>
                                            <p>{post.description}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </Grid>
                    </section>
                );
            })}
        </>
    );
}
