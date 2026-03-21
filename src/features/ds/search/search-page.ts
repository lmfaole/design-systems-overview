import { searchDsDocuments, type DsSearchMatchField, type DsSearchResult } from "@/data/ds/search";

interface SearchPageSection {
    title: string;
    items: DsSearchResult[];
}

export interface SearchPageModel {
    query: string;
    hasQuery: boolean;
    totalResults: number;
    bestMatches: DsSearchResult[];
    sections: SearchPageSection[];
}

const GRID_STYLE = "--ds-grid-col-min: 20rem; --ds-grid-cols: 3;";

export function getSearchQuery(search: string): string {
    return new URLSearchParams(search).get("q")?.trim() ?? "";
}

export function createSearchPageModel(
    query: string,
    search: (query: string) => DsSearchResult[] = searchDsDocuments,
): SearchPageModel {
    const normalizedQuery = query.trim();
    const hasQuery = normalizedQuery.length > 0;
    const results = hasQuery ? search(normalizedQuery) : [];

    return {
        query: normalizedQuery,
        hasQuery,
        totalResults: results.length,
        bestMatches: results.slice(0, 3),
        sections: [
            {
                title: "Mønstre",
                items: results.filter((result) => result.doc.kind === "pattern"),
            },
            {
                title: "Komponenter",
                items: results.filter((result) => result.doc.kind === "component"),
            },
            {
                title: "Formattere",
                items: results.filter((result) => result.doc.kind === "formatter"),
            },
            {
                title: "Tokens",
                items: results.filter((result) => result.doc.kind === "token"),
            },
            {
                title: "Sider",
                items: results.filter((result) => result.doc.kind === "page"),
            },
        ],
    };
}

export function renderSearchContent(model: SearchPageModel): string {
    if (!model.hasQuery) {
        return "<p>Skriv inn et søk for å se resultater.</p>";
    }

    if (model.totalResults === 0) {
        return renderEmptyState(model.query);
    }

    const bestMatches = renderSection(`Beste treff (${model.bestMatches.length})`, model.bestMatches);
    const sections = model.sections
        .map((section) => renderSection(`${section.title} (${section.items.length})`, section.items))
        .join("");

    return [
        `<p>${model.totalResults} treff totalt.</p>`,
        "<div>",
        "<h2>Beste treff</h2>",
        bestMatches,
        "<h2>Alt annet</h2>",
        sections,
        "</div>",
    ].join("");
}

export function getInitialSearchContent(hasQuery: boolean): string {
    if (!hasQuery) {
        return "<p>Skriv inn et søk for å se resultater.</p>";
    }

    return "<p>Laster søkeresultater…</p>";
}

export function initSearchPage(root: ParentNode = document): void {
    if (typeof window === "undefined") return;

    const input = root.querySelector<HTMLInputElement>("[data-search-input]");
    const results = root.querySelector<HTMLElement>("[data-search-results]");

    if (!input || !results) {
        return;
    }

    const syncFromLocation = () => {
        const query = getSearchQuery(window.location.search);
        input.value = query;
        results.innerHTML = renderSearchContent(createSearchPageModel(query));
    };

    syncFromLocation();
    window.addEventListener("pageshow", syncFromLocation);
}

function renderEmptyState(query: string): string {
    return [
        '<section class="ds-search-empty-state">',
        `<h2>Ingen treff for “${escapeHtml(query)}”</h2>`,
        "<p>Prøv et kortere søk, et komponentnavn eller et mer generelt begrep.</p>",
        "<p>Du kan også gå direkte til:</p>",
        "<ul>",
        '<li><a href="/ds/jokul/component">Alle Jøkul-komponenter</a></li>',
        '<li><a href="/ds/jokul/formatter">Alle Jøkul-formattere</a></li>',
        '<li><a href="/ds/jokul/token">Alle Jøkul-tokens</a></li>',
        '<li><a href="/ds/monster">Alle mønstre</a></li>',
        "</ul>",
        "</section>",
    ].join("");
}

function renderSection(title: string, items: DsSearchResult[]): string {
    if (!items.length) {
        return "";
    }

    return [
        "<section>",
        `<h3>${escapeHtml(title)}</h3>`,
        `<ul class="ds-grid bare-list" data-columns="3" style="${GRID_STYLE}">`,
        items.map((item) => renderResultCard(item)).join(""),
        "</ul>",
        "</section>",
    ].join("");
}

function renderResultCard(result: DsSearchResult): string {
    return [
        '<li class="ds-search-result-card-item">',
        '<article class="ds-search-result-card">',
        `<p class="eyebrow">${escapeHtml(result.doc.meta)}</p>`,
        `<h3 class="title"><a href="${escapeAttribute(result.doc.href)}">${escapeHtml(result.doc.title)}</a></h3>`,
        `<p class="description">${escapeHtml(result.doc.description)}</p>`,
        `<p class="match"><small>Treff i ${escapeHtml(getMatchLabel(result.match.field))}: ${escapeHtml(result.match.excerpt)}</small></p>`,
        "</article>",
        "</li>",
    ].join("");
}

function getMatchLabel(field: DsSearchMatchField): string {
    switch (field) {
        case "title":
            return "tittel";
        case "description":
            return "beskrivelse";
        case "keyword":
            return "nøkkelord";
        case "meta":
            return "metadata";
    }
}

function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function escapeAttribute(value: string): string {
    return escapeHtml(value);
}
