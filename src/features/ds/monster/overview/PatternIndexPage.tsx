import {getPatternHref, getPatternSlug, patternPosts} from "@/data/monster/patterns";
import {Grid} from "@/components/ds/Grid";
import {PageHeader} from "@/components/ds/PageHeader";
import {PATTERN_CATEGORY_LABELS} from "@/features/ds/monster/types";
import "../detail/monster-detail.scss";

export default function PatternIndexPage() {
    const categories = Array.from(new Set(patternPosts.map((post) => post.category))).sort((a, b) =>
        PATTERN_CATEGORY_LABELS[a].localeCompare(PATTERN_CATEGORY_LABELS[b], "nb"),
    );

    return (
        <>
            <section className="monster-hero">
                <PageHeader
                    title="Mønster"
                    description="Anbefalte løsninger på gjentakende UI-problemer. Bruk disse for å få konsistent, tilgjengelig og forutsigbar oppførsel på tvers av designsystemer."
                />
            </section>

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
                                return (
                                    <li key={getPatternSlug(post)} className="monster-pattern">
                                        <a href={getPatternHref(post)} className="monster-pattern-link">
                                            <h3>{post.title}</h3>
                                            <p>{post.description}</p>
                                        </a>
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
