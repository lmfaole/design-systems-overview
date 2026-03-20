import type {Metadata} from "next";
import {Card} from "@fremtind/jokul/card";
import {type DsSearchResult, searchDsDocuments} from "@/app/ds/_data/search";
import {Grid} from "@/app/ds/_shared/components/Grid";
import {PageHeader} from "@/app/ds/_shared/components/PageHeader";
import {SearchResultCard} from "@/app/ds/_shared/components/cards/SearchResultCard";
import {createPageMetadata} from "@/app/_shared/seo";

export const runtime = "edge";

type SearchParams = {
    q?: string;
};

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
            ? `Søkeresultater for “${query}” i sider, komponenter, mønstre og designtokens i /ds.`
            : "Søk etter sider, komponenter, mønstre og designtokens i /ds.",
        path: query ? `/ds/sok?q=${encodeURIComponent(query)}` : "/ds/sok",
        noIndex: true,
    });
}

export default async function SearchPage({
                                             searchParams,
                                         }: {
    searchParams?: Promise<SearchParams> | SearchParams;
}) {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";
    const hasQuery = query.length > 0;
    const results = hasQuery ? searchDsDocuments(query) : [];
    const bestMatches = results.slice(0, 3);
    const pageResults = results.filter((result) => result.doc.kind === "page");
    const componentResults = results.filter((result) => result.doc.kind === "component");
    const patternResults = results.filter((result) => result.doc.kind === "pattern");
    const tokenResults = results.filter((result) => result.doc.kind === "token");
    const totalResults = results.length;

    return (
        <main className="page" data-ua-only>
            <PageHeader
                title="Søk"
                description="Finn sider, komponenter, mønstre og tokens i den lokale `/ds`-dokumentasjonen."
            />

            <form role="search" action="/ds/sok" method="get">
                <label htmlFor="search-input">Søk i dokumentasjonen</label>
                <input
                    id="search-input"
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Komponent, token eller side…"
                />
                <button type="submit">Søk</button>
            </form>

            {!hasQuery ? (
                <p>Skriv inn et søk for å se resultater.</p>
            ) : (
                totalResults === 0 ? (
                    <EmptySearchState query={query}/>
                ) : (
                    <>
                        <p>{totalResults} treff totalt.</p>

                        <div>
                            <h2>Beste treff</h2>
                            {bestMatches.length > 0 && (
                                <SearchSection
                                    title={`Beste treff (${bestMatches.length})`}
                                    items={bestMatches}
                                />
                            )}

                            <h2>Alt annet</h2>
                            <SearchSection
                                title={`Sider (${pageResults.length})`}
                                items={pageResults}
                            />
                            <SearchSection
                                title={`Komponenter (${componentResults.length})`}
                                items={componentResults}
                            />
                            <SearchSection
                                title={`Mønstre (${patternResults.length})`}
                                items={patternResults}
                            />
                            <SearchSection
                                title={`Tokens (${tokenResults.length})`}
                                items={tokenResults}
                            />
                        </div>
                    </>
                )
            )}
        </main>
    );
}

function EmptySearchState({query}: { query: string }) {
    return (
        <Card padding="l">
            <h2>Ingen treff for “{query}”</h2>
            <p>Prøv et kortere søk, et komponentnavn eller et mer generelt begrep.</p>
            <p>Du kan også gå direkte til:</p>
            <ul>
                <li><a href="/ds/jokul/component">Alle Jøkul-komponenter</a></li>
                <li><a href="/ds/jokul/token">Alle Jøkul-tokens</a></li>
                <li><a href="/ds/monster">Alle mønstre</a></li>
            </ul>
        </Card>
    );
}

function SearchSection({
                           title,
                           items,
                       }: {
    title: string;
    items: DsSearchResult[];
}) {
    if (!items.length) {
        return null;
    }
    return (
        <section>
            <h3>{title}</h3>
            <Grid as="ul" columns={3} className="bare-list">
                {items.map((item) => (
                    <SearchResultCard key={item.doc.id} result={item}/>
                ))}
            </Grid>
        </section>
    );
}
