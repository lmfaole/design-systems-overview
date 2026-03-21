import { patternSearchDocuments } from "./pattern-documents";
import type { DsSearchDocument } from "./types";

export function getPatternSearchDocuments(): DsSearchDocument[] {
    return patternSearchDocuments.map((document) => ({
        ...document,
        keywords: [...document.keywords],
    }));
}
