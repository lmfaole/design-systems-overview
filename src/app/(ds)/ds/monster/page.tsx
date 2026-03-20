import type { Metadata } from "next";
import { patternPosts, getPatternHref } from "@/app/ds/monster/data";
import { getComponentDoc } from "@/app/ds/_data/jokul-component-docs";
import { PageHeader } from "@/app/ds/_shared/components/PageHeader";
import type { PatternCategory } from "@/app/ds/monster/types";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "UI-mønstre",
    description: "Anbefalte løsninger på gjentakende UI-problemer med fokus på tilgjengelighet og forutsigbarhet.",
    path: "/ds/monster",
});

const CATEGORY_LABELS: Record<PatternCategory, string> = {
    handlinger: "Handlinger",
    navigasjon: "Navigasjon",
    tilbakemelding: "Tilbakemelding",
    struktur: "Struktur",
};

export default function PatternIndexPage() {
    const categories = Array.from(new Set(patternPosts.map((post) => post.category))).sort((a, b) =>
        CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b], "nb"),
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
                        <h2 id={`kategori-${category}`}>{CATEGORY_LABELS[category]}</h2>
                        <ul className="monster-patterns">
                            {posts.map((post) => {
                                const components = (post.components ?? []).map((id) => {
                                    const doc = getComponentDoc(id);
                                    return {
                                        id,
                                        name: doc?.name ?? id,
                                    };
                                });

                                return (
                                    <li key={post.id} className="monster-pattern">
                                        <div>
                                            <h3>
                                                <a href={getPatternHref(post)}>{post.title}</a>
                                            </h3>
                                            <p>{post.goals}</p>
                                        </div>
                                        {components.length > 0 && (
                                            <ul className="monster-chiplist" aria-label="Komponenter">
                                                {components.map((component) => (
                                                    <li key={component.id}>
                                                        <a href={`/ds/jokul/component/${component.id}`}>
                                                            {component.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </>
    );
}
