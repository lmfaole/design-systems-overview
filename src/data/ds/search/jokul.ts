import { jokulSearchDocuments } from "./generated/jokul-search-documents";
import type { DsSearchDocument } from "./types";

export function getJokulSearchDocuments(): DsSearchDocument[] {
    return jokulSearchDocuments.map((document) => ({
        ...document,
        keywords: [...document.keywords],
    })) as DsSearchDocument[];
}
