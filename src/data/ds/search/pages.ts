import { getDesignSystemLocalPages } from "@/data/design-systems/local-docs";
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
            description: "Plan for å bygge opp mønsterdokumentasjonen på nytt og koble den til lokal docsdata.",
            keywords: ["mønster", "mønstre", "ui-mønstre", "designmønstre", "plan", "koblinger"],
            href: "/ds/mønster",
            meta: "Mønster · Side",
        },
        ...getDesignSystemLocalPages().map((page) => ({
            id: `page-${page.href}`,
            designSystemId: page.href.split("/")[2] ?? "ds",
            designSystemName: "Jøkul",
            kind: "page" as const,
            title: page.title,
            description: page.description,
            keywords: page.keywords,
            href: page.href,
            meta: page.meta,
        })),
    ];
}
