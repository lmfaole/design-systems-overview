import { getJokulSearchDocuments } from "./jokul";
import { getPatternSearchDocuments } from "./patterns";
import { getDsPageSearchDocuments } from "./pages";
import { searchDocuments } from "./utils";

export { normalizeSearchValue } from "./utils";
export type { DsSearchDocument, DsSearchDocumentKind } from "./types";

export function getDsSearchDocuments() {
    return [
        ...getDsPageSearchDocuments(),
        ...getJokulSearchDocuments(),
        ...getPatternSearchDocuments(),
    ];
}

export function searchDsDocuments(query: string) {
    return searchDocuments(query, getDsSearchDocuments());
}
