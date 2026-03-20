export type DsSearchDocumentKind = "page" | "component" | "token" | "pattern";

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
