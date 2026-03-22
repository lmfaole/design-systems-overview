import { getPatternSearchDocuments } from "./patterns";
import { getDsPageSearchDocuments } from "./pages";
import { searchDocuments } from "./utils";

export { normalizeSearchValue } from "./utils";
export type { DsSearchDocument, DsSearchDocumentKind, DsSearchResult, DsSearchMatch, DsSearchMatchField } from "./types";

export function getDsSearchDocuments() {
    return [
        ...getDsPageSearchDocuments(),
        ...getPatternSearchDocuments(),
    ];
}

export function searchDsDocuments(query: string) {
    return searchDocuments(query, getDsSearchDocuments());
}
