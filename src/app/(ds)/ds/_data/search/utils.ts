import type { DsSearchDocument, DsSearchMatch, DsSearchResult } from "./types";

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

function getNormalizedIndex(value: string, query: string) {
    const chars = Array.from(value);
    let normalized = "";
    const indexMap: number[] = [];

    chars.forEach((char, index) => {
        const normalizedChar = normalizeSearchValue(char);

        for (const _ of normalizedChar) {
            indexMap.push(index);
        }

        normalized += normalizedChar;
    });

    const normalizedIndex = normalized.indexOf(query);

    if (normalizedIndex === -1) return -1;

    return indexMap[normalizedIndex] ?? -1;
}

function getExcerpt(value: string, query: string) {
    const startIndex = getNormalizedIndex(value, query);

    if (startIndex === -1) return value;

    const chars = Array.from(value);
    const excerptStart = Math.max(0, startIndex - 36);
    const excerptEnd = Math.min(chars.length, startIndex + query.length + 52);
    const excerpt = chars.slice(excerptStart, excerptEnd).join("").trim();

    return `${excerptStart > 0 ? "…" : ""}${excerpt}${excerptEnd < chars.length ? "…" : ""}`;
}

function getMatch(query: string, doc: DsSearchDocument): { score: number; match: DsSearchMatch } | null {
    const normalizedTitle = normalizeSearchValue(doc.title);

    if (normalizedTitle === query) {
        return {
            score: 120,
            match: {
                field: "title",
                value: doc.title,
                excerpt: doc.title,
            },
        };
    }

    if (normalizedTitle.startsWith(query)) {
        return {
            score: 80,
            match: {
                field: "title",
                value: doc.title,
                excerpt: doc.title,
            },
        };
    }

    if (normalizedTitle.includes(query)) {
        return {
            score: 50,
            match: {
                field: "title",
                value: doc.title,
                excerpt: doc.title,
            },
        };
    }

    const keyword = doc.keywords.find((entry) => includesQuery(entry, query));

    if (keyword) {
        return {
            score: 30,
            match: {
                field: "keyword",
                value: keyword,
                excerpt: keyword,
            },
        };
    }

    if (includesQuery(doc.description, query)) {
        return {
            score: 20,
            match: {
                field: "description",
                value: doc.description,
                excerpt: getExcerpt(doc.description, query),
            },
        };
    }

    if (includesQuery(doc.meta, query)) {
        return {
            score: 15,
            match: {
                field: "meta",
                value: doc.meta,
                excerpt: getExcerpt(doc.meta, query),
            },
        };
    }

    return null;
}

export function searchDocuments(query: string, docs: DsSearchDocument[]) {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) return [];

    return docs
        .map((doc) => {
            const hit = getMatch(normalizedQuery, doc);

            if (!hit) return null;

            return {
                doc,
                score: hit.score,
                match: hit.match,
            };
        })
        .filter((entry): entry is DsSearchResult & { score: number } => entry !== null)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.doc.title.localeCompare(b.doc.title, "nb");
        })
        .map(({ doc, match }) => ({ doc, match }));
}
