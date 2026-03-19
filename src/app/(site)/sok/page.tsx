import type { Metadata } from "next";
import { componentDocs } from "@/app/ds/jokul/_component-docs/data";
import { tokenPosts, getTokenSlug } from "@/app/ds/jokul/_token/data";
import { patternPosts, getPatternHref } from "@/app/monster/data";
import type { PatternCategory } from "@/app/monster/types";
import { createPageMetadata } from "@/app/_shared/seo";

export const runtime = "edge";

type SearchParams = {
    q?: string;
};

const CATEGORY_LABELS: Record<PatternCategory, string> = {
    handlinger: "Handlinger",
    navigasjon: "Navigasjon",
    tilbakemelding: "Tilbakemelding",
    struktur: "Struktur",
};

function normalize(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export async function generateMetadata({
    searchParams,
}: {
    searchParams?: Promise<SearchParams> | SearchParams;
}): Promise<Metadata> {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";

    return createPageMetadata({
        title: query ? `Søk etter “${query}”` : "Søk",
        description: query
            ? `Søkeresultater for “${query}” i Jøkul-komponenter, designtokens og UI-mønstre.`
            : "Søk etter komponenter, designtokens og UI-mønstre i læringsressursen.",
        path: query ? `/sok?q=${encodeURIComponent(query)}` : "/sok",
        noIndex: true,
    });
}

export default function SearchPage({ searchParams }: { searchParams?: SearchParams }) {
    const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
    const normalizedQuery = normalize(query);
    const hasQuery = normalizedQuery.length > 0;

    const matches = (value: string) => normalize(value).includes(normalizedQuery);

    const componentResults = hasQuery
        ? componentDocs
            .filter((doc) => doc.showOnOverview !== false)
            .filter((doc) => {
                return (
                    matches(doc.name) ||
                    matches(doc.description.short) ||
                    matches(doc.description.long) ||
                    matches(doc.id) ||
                    matches(doc.package)
                );
            })
            .map((doc) => ({
                id: doc.id,
                title: doc.name,
                description: doc.description.short,
                meta: `Jøkul · ${doc.category}`,
                href: `/ds/jokul/component/${doc.id}`,
            }))
        : [];

    const patternResults = hasQuery
        ? patternPosts
            .filter((post) => {
                const categoryLabel = CATEGORY_LABELS[post.category];
                return matches(post.title) || matches(post.goals) || matches(categoryLabel);
            })
            .map((post) => ({
                id: post.id,
                title: post.title,
                description: post.goals,
                meta: `Jøkul · ${CATEGORY_LABELS[post.category]}`,
                href: getPatternHref(post),
            }))
        : [];

    const tokenResults = hasQuery
        ? tokenPosts
            .filter((post) => matches(post.title) || matches(post.excerpt))
            .map((post) => ({
                id: post.id,
                title: post.title,
                description: post.excerpt,
                meta: "Jøkul · Designtoken",
                href: `/ds/jokul/token/${getTokenSlug(post)}`,
            }))
        : [];

    const totalResults =
        componentResults.length + patternResults.length + tokenResults.length;

    return (
        <main className="page" data-ua-only>
            <header>
                <h1>Søk</h1>
                <p>Finn komponenter, mønstre og tokens i designsystemene.</p>
            </header>

            <form role="search" action="/sok" method="get">
                <label htmlFor="search-input">Søk i Jøkul</label>
                <input
                    id="search-input"
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Komponent, token eller mønster…"
                />
                <button type="submit">Søk</button>
            </form>

            <p>
                Søket dekker Jøkul akkurat nå. Vil du bla? Gå til{" "}
                <a href="/ds/jokul">Jøkul-forsiden</a>.
            </p>

            {!hasQuery ? (
                <p>Skriv inn et søk for å se resultater.</p>
            ) : (
                <>
                    <p>
                        {totalResults === 0
                            ? "Ingen treff."
                            : `${totalResults} treff totalt.`}
                    </p>

                    <div>
                        <SearchSection
                            title={`Komponenter · Jøkul (${componentResults.length})`}
                            items={componentResults}
                        />
                        <SearchSection
                            title={`Mønstre · Jøkul (${patternResults.length})`}
                            items={patternResults}
                        />
                        <SearchSection
                            title={`Tokens · Jøkul (${tokenResults.length})`}
                            items={tokenResults}
                        />
                    </div>
                </>
            )}
        </main>
    );
}

function SearchSection({
    title,
    items,
}: {
    title: string;
    items: Array<{ id: number | string; title: string; description: string; meta: string; href: string }>;
}) {
    return (
        <section>
            <h2>{title}</h2>
            {items.length === 0 ? (
                <p>Ingen treff i denne kategorien.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <a href={item.href}>{item.title}</a>
                            <p>{item.description}</p>
                            <small>{item.meta}</small>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
