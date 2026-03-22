export type DsSearchDocumentKind = "page" | "pattern";
export type DsSearchMatchField = "title" | "description" | "keyword" | "meta";

export interface DsSearchDocument {
    id: string;
    designSystemId: string;
    designSystemName: string;
    kind: DsSearchDocumentKind;
    title: string;
    description: string;
    keywords: string[];
    href: string;
    meta: string;
}

export interface DsSearchMatch {
    field: DsSearchMatchField;
    excerpt: string;
}

export interface DsSearchResult {
    doc: DsSearchDocument;
    match: DsSearchMatch;
}
