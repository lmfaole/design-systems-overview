import {
    getAssetKindLabel,
    getDesignSystemDocumentationStatus,
    getDesignSystems,
    getDocumentationStatusText,
    type DesignSystem,
    type DesignSystemAssetKind,
    type DesignSystemCatalogSection,
    type DesignSystemDocumentationStatus,
} from "@/data/design-systems";
import { patternPosts, getPatternHref } from "@/data/mønster/patterns";

export interface OverviewSummaryStat {
    label: string;
    value: string;
    detail: string;
    href?: string;
}

export interface OverviewEntryPoint {
    title: string;
    href: `/${string}`;
    description: string;
}

export interface OverviewContentAreaSystemEntry {
    systemName: string;
    systemSlug: string;
    title: string;
    href: string;
    status: DesignSystemDocumentationStatus;
    statusLabel: string;
    itemCount: number;
    description: string;
}

export interface OverviewContentArea {
    kind: DesignSystemAssetKind;
    title: string;
    summary: string;
    systemCount: number;
    documentedCount: number;
    plannedCount: number;
    externalCount: number;
    documentedItemCount: number;
    systems: OverviewContentAreaSystemEntry[];
}

export interface OverviewSystemSection {
    title: string;
    kind: DesignSystemAssetKind;
    kindLabel: string;
    href: string;
    status: DesignSystemDocumentationStatus;
    statusLabel: string;
    itemCount: number;
    description: string;
}

export interface OverviewSystemInventoryEntry {
    slug: string;
    name: string;
    description: string;
    href: string;
    status: DesignSystemDocumentationStatus;
    statusLabel: string;
    statusText: string;
    installGuideCount: number;
    sectionCount: number;
    documentedSectionCount: number;
    documentedItemCount: number;
    sections: OverviewSystemSection[];
}

export interface OverviewPatternEntry {
    title: string;
    href: `/ds/mønster/${string}`;
    description: string;
}

const STATUS_ORDER: Record<DesignSystemDocumentationStatus, number> = {
    documented: 0,
    planned: 1,
    external: 2,
};

function getStatusLabel(status: DesignSystemDocumentationStatus): string {
    switch (status) {
        case "documented":
            return "Dokumentert lokalt";
        case "planned":
            return "Planlagt lokalt";
        case "external":
            return "Kun eksternt";
    }
}

function getSystemHref(system: DesignSystem): string {
    return system.localDocumentation?.basePath ?? system.docs;
}

function getSectionHref(section: DesignSystemCatalogSection, system: DesignSystem): string {
    return section.localPath ?? section.externalPath ?? getSystemHref(system);
}

function getSectionItemCount(section: DesignSystemCatalogSection): number {
    return section.items?.length ?? 0;
}

function compareStatuses(
    left: DesignSystemDocumentationStatus,
    right: DesignSystemDocumentationStatus,
): number {
    return STATUS_ORDER[left] - STATUS_ORDER[right];
}

export function getOverviewEntryPoints(): OverviewEntryPoint[] {
    return [
        {
            title: "Samlet oversikt",
            href: "/ds",
            description: "Bruk oversikten når du vil se helheten: hvilke systemer som er med, hvor langt de er kommet, og hvilke innholdsområder som går igjen.",
        },
        {
            title: "Mønstre på tvers",
            href: "/ds/mønster",
            description: "Sammenlign innholdsområder som komponenter, tokens, tooling og andre tilbakevendende mønstre på tvers av designsystemene.",
        },
        {
            title: "Innhold per system",
            href: "/ds/systemer",
            description: "Se hvert designsystem som en egen katalog med seksjoner, lokale oppslag og planlagt videre arbeid.",
        },
        {
            title: "Søk i dokumentasjonen",
            href: "/ds/søk",
            description: "Finn komponenter, tokens og andre lokale sider uten å vite hvilket system de ligger under på forhånd.",
        },
    ];
}

export function getOverviewSummaryStats(): OverviewSummaryStat[] {
    const systems = getDesignSystems();
    const documentedSystems = systems.filter(
        (system) => getDesignSystemDocumentationStatus(system) === "documented",
    );
    const catalogKinds = new Set(
        systems.flatMap((system) => system.catalog.map((section) => section.kind)),
    );
    const documentedAssetCount = systems.reduce((sum, system) =>
        sum
            + system.catalog
                .filter((section) => section.status === "documented")
                .reduce((sectionSum, section) => sectionSum + getSectionItemCount(section), 0), 0);

    return [
        {
            label: "Designsystemer i katalogen",
            value: String(systems.length),
            detail: "Registrerte systemer med nok metadata til å kunne sammenlignes på tvers.",
            href: "/ds/systemer",
        },
        {
            label: "Systemer med lokal dokumentasjon",
            value: String(documentedSystems.length),
            detail: "Systemer som faktisk har lokale ruter og oppslag i repoet i dag.",
            href: "/ds/systemer",
        },
        {
            label: "Innholdsområder på tvers",
            value: String(catalogKinds.size),
            detail: "Typer innhold som går igjen i katalogene, som komponenter, tokens, tooling og lignende.",
            href: "/ds/mønster",
        },
        {
            label: "Lokale oppslag publisert",
            value: String(documentedAssetCount),
            detail: "Konkrete lokale oppslagssider under designsystemrutene, ikke bare planlagte seksjoner.",
            href: "/ds/systemer",
        },
        {
            label: "Publiserte mønstersider",
            value: String(patternPosts.length),
            detail: "Egne mønstersider som forklarer brukssituasjoner på tvers av systemsidene.",
            href: "/ds/mønster",
        },
    ];
}

export function getPublishedPatternEntries(): OverviewPatternEntry[] {
    return [...patternPosts]
        .sort((left, right) => left.title.localeCompare(right.title, "nb"))
        .map((pattern) => ({
            title: pattern.title,
            href: getPatternHref(pattern),
            description: pattern.description,
        }));
}

export function getOverviewContentAreas(): OverviewContentArea[] {
    const areas = new Map<DesignSystemAssetKind, OverviewContentAreaSystemEntry[]>();

    for (const system of getDesignSystems()) {
        for (const section of system.catalog) {
            const entries = areas.get(section.kind) ?? [];

            entries.push({
                systemName: system.name,
                systemSlug: system.slug,
                title: section.title,
                href: getSectionHref(section, system),
                status: section.status,
                statusLabel: getStatusLabel(section.status),
                itemCount: getSectionItemCount(section),
                description: section.description,
            });

            areas.set(section.kind, entries);
        }
    }

    return Array.from(areas.entries())
        .map(([kind, systems]) => {
            const sortedSystems = [...systems].sort((left, right) => {
                const statusComparison = compareStatuses(left.status, right.status);

                if (statusComparison !== 0) {
                    return statusComparison;
                }

                return left.systemName.localeCompare(right.systemName, "nb");
            });

            const documentedCount = sortedSystems.filter((entry) => entry.status === "documented").length;
            const plannedCount = sortedSystems.filter((entry) => entry.status === "planned").length;
            const externalCount = sortedSystems.filter((entry) => entry.status === "external").length;
            const documentedItemCount = sortedSystems
                .filter((entry) => entry.status === "documented")
                .reduce((sum, entry) => sum + entry.itemCount, 0);

            return {
                kind,
                title: getAssetKindLabel(kind),
                summary: `${sortedSystems.length} systemer registrerer dette området: ${documentedCount} dokumentert lokalt, ${plannedCount} planlagt lokalt og ${externalCount} kun eksternt.`,
                systemCount: sortedSystems.length,
                documentedCount,
                plannedCount,
                externalCount,
                documentedItemCount,
                systems: sortedSystems,
            };
        })
        .sort((left, right) => {
            if (right.documentedCount !== left.documentedCount) {
                return right.documentedCount - left.documentedCount;
            }

            if (right.systemCount !== left.systemCount) {
                return right.systemCount - left.systemCount;
            }

            return left.title.localeCompare(right.title, "nb");
        });
}

export function getOverviewSystemInventory(): OverviewSystemInventoryEntry[] {
    return getDesignSystems()
        .map((system) => {
            const status = getDesignSystemDocumentationStatus(system);
            const sections = [...system.catalog]
                .sort((left, right) => {
                    const statusComparison = compareStatuses(left.status, right.status);

                    if (statusComparison !== 0) {
                        return statusComparison;
                    }

                    return left.title.localeCompare(right.title, "nb");
                })
                .map((section) => ({
                    title: section.title,
                    kind: section.kind,
                    kindLabel: getAssetKindLabel(section.kind),
                    href: getSectionHref(section, system),
                    status: section.status,
                    statusLabel: getStatusLabel(section.status),
                    itemCount: getSectionItemCount(section),
                    description: section.description,
                }));

            return {
                slug: system.slug,
                name: system.name,
                description: system.description,
                href: getSystemHref(system),
                status,
                statusLabel: getStatusLabel(status),
                statusText: getDocumentationStatusText(system),
                installGuideCount: system.installGuides.length,
                sectionCount: sections.length,
                documentedSectionCount: sections.filter((section) => section.status === "documented").length,
                documentedItemCount: sections
                    .filter((section) => section.status === "documented")
                    .reduce((sum, section) => sum + section.itemCount, 0),
                sections,
            };
        })
        .sort((left, right) => {
            const statusComparison = compareStatuses(left.status, right.status);

            if (statusComparison !== 0) {
                return statusComparison;
            }

            return left.name.localeCompare(right.name, "nb");
        });
}
