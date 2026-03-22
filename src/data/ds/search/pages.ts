import type { DsSearchDocument } from "./types";

export function getDsPageSearchDocuments(): DsSearchDocument[] {
    return [
        {
            id: "page-ds-overview",
            designSystemId: "ds",
            designSystemName: "Designsystemer",
            kind: "page",
            title: "Designsystemer",
            description: "Oversikt over dokumenterte og uokumenterte designsystemer i prosjektet.",
            keywords: ["designsystemer", "oversikt", "dokumenterte", "uokumenterte", "ds"],
            href: "/ds",
            meta: "Designsystemer · Side",
        },
        {
            id: "page-pattern-index",
            designSystemId: "patterns",
            designSystemName: "Mønstre",
            kind: "page",
            title: "UI-mønstre",
            description: "Oversikt over tilgjengelige UI-mønstre i den lokale dokumentasjonen.",
            keywords: ["mønster", "mønstre", "ui-mønstre", "designmønstre"],
            href: "/ds/mønster",
            meta: "Mønster · Side",
        },
    ];
}
