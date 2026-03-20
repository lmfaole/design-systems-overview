
import { useEffect, useMemo, useState } from "react";
import { Card } from "@fremtind/jokul/card";
import { searchDsDocuments, type DsSearchResult } from "@/data/ds/search";
import { Grid } from "@/components/ds/Grid";
import { PageHeader } from "@/components/ds/PageHeader";
import { SearchResultCard } from "@/components/ds/cards/SearchResultCard";

type SearchParams = {
    q: string;
};

function getQueryFromLocation() {
    if (typeof window === "undefined") return "";

    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q")?.trim() ?? "";
}

export function SearchPageClient() {
    const [searchParams, setSearchParams] = useState<SearchParams>({ q: "" });

    useEffect(() => {
        setSearchParams({ q: getQueryFromLocation() });
    }, []);

    const query = searchParams.q;
    const hasQuery = query.length > 0;
    const results = useMemo(() => (hasQuery ? searchDsDocuments(query) : []), [hasQuery, query]);
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
            ) : totalResults === 0 ? (
                <EmptySearchState query={query} />
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
                        <SearchSection title={`Sider (${pageResults.length})`} items={pageResults} />
                        <SearchSection title={`Komponenter (${componentResults.length})`} items={componentResults} />
                        <SearchSection title={`Mønstre (${patternResults.length})`} items={patternResults} />
                        <SearchSection title={`Tokens (${tokenResults.length})`} items={tokenResults} />
                    </div>
                </>
            )}
        </main>
    );
}

function EmptySearchState({ query }: { query: string }) {
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
                    <SearchResultCard key={item.doc.id} result={item} />
                ))}
            </Grid>
        </section>
    );
}
