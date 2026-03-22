import { getDesignSystemLocalPages } from "@/data/design-systems/local-docs";
import type { DsSearchDocument } from "./types";

export function getDsPageSearchDocuments(): DsSearchDocument[] {
    return [
        {
            id: "page-ds-overview",
            designSystemId: "ds",
            designSystemName: "Oversikt",
            kind: "page",
            title: "Designsystemoversikt",
            description: "Samlet inngang til mønstre, innholdsområder og systemkataloger på tvers av designsystemene i prosjektet.",
            keywords: ["designsystemer", "oversikt", "mønstre", "innholdsområder", "systemkatalog", "ds"],
            href: "/ds",
            meta: "Oversikt · Side",
        },
        {
            id: "page-pattern-index",
            designSystemId: "patterns",
            designSystemName: "Mønstre på tvers",
            kind: "page",
            title: "Mønstre på tvers av designsystemer",
            description: "Oversikt over innholdsområder og mønsterarbeid som går igjen på tvers av systemene i katalogen.",
            keywords: ["mønster", "mønstre", "tverrgående", "designsystemer", "komponenter", "tokens", "tooling"],
            href: "/ds/mønster",
            meta: "Mønstre · Side",
        },
        {
            id: "page-system-inventory",
            designSystemId: "systems",
            designSystemName: "Systemer",
            kind: "page",
            title: "Innhold per designsystem",
            description: "Systemkatalog med seksjoner, innhold og dokumentasjonsstatus for hvert designsystem i prosjektet.",
            keywords: ["systemer", "designsystemer", "innhold", "seksjoner", "dokumentasjon", "katalog"],
            href: "/ds/systemer",
            meta: "Systemer · Side",
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
