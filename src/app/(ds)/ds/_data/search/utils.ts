import type { DsSearchDocument } from "./types";

export function normalizeSearchValue(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function includesQuery(value: string, query: string) {
    return normalizeSearchValue(value).includes(query);
}

function scoreDocument(query: string, doc: DsSearchDocument) {
    let score = 0;

    const normalizedTitle = normalizeSearchValue(doc.title);

    if (normalizedTitle === query) score += 120;
    if (normalizedTitle.startsWith(query)) score += 80;
    if (normalizedTitle.includes(query)) score += 50;
    if (includesQuery(doc.description, query)) score += 20;
    if (doc.keywords.some((keyword) => includesQuery(keyword, query))) score += 30;
    if (includesQuery(doc.meta, query)) score += 15;

    return score;
}

export function searchDocuments(query: string, docs: DsSearchDocument[]) {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) return [];

    return docs
        .map((doc) => ({ doc, score: scoreDocument(normalizedQuery, doc) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.doc.title.localeCompare(b.doc.title, "nb");
        })
        .map((entry) => entry.doc);
}
