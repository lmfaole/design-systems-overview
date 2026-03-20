import type { Metadata } from "next";
import { searchDsDocuments, type DsSearchDocument, type DsSearchDocumentKind } from "@/app/ds/_data/search";
import { PageHeader } from "@/app/ds/_shared/components/PageHeader";
import { createPageMetadata } from "@/app/_shared/seo";

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
    const pageResults = results.filter((doc) => doc.kind === "page");
    const componentResults = results.filter((doc) => doc.kind === "component");
    const patternResults = results.filter((doc) => doc.kind === "pattern");
    const tokenResults = results.filter((doc) => doc.kind === "token");
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

            <p>
                Søket dekker lokal `/ds`-dokumentasjon akkurat nå. Vil du bla? Gå til{" "}
                <a href="/ds">designsystemoversikten</a>.
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
            )}
        </main>
    );
}

function SearchSection({
    title,
    items,
}: {
    title: string;
    items: DsSearchDocument[];
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
