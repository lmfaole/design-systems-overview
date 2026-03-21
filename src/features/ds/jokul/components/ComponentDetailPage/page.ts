import type { Migration } from "@/data/jokul/component-docs";

export interface DetailTocItem {
    id: string;
    label: string;
}

export interface MigrationEntry {
    anchorId: string;
    displayName: string;
    migration: Migration;
}

export interface ComponentDetailSections {
    hasExample: boolean;
    hasPatterns: boolean;
    hasRequires: boolean;
    hasMigrations: boolean;
    hasSubcomponents: boolean;
    hasAlternatives: boolean;
    hasSiblings: boolean;
    siblingsLabel: string;
    hasRelated: boolean;
}

export const COMPLEXITY_LABEL = {
    easy: "Enkel",
    medium: "Middels",
    hard: "Vanskelig",
} as const;

const EXAMPLE_CLIENT_ONLY_IDS = new Set([
    "nav-tab",
    "nav-tabs",
    "tab",
    "tab-list",
    "tab-panel",
    "tabs",
]);

export function getStatusLabel(status: "stable" | "beta" | "deprecated"): string {
    if (status === "stable") return "Stabil";
    if (status === "beta") return "Beta";

    return "Deprecated";
}

export function formatComplexity(rating: keyof typeof COMPLEXITY_LABEL, note?: string): string {
    const label = COMPLEXITY_LABEL[rating];

    return note ? `${label} (${note})` : label;
}

export function getExampleHydrationMode(id: string): "load" | "only" {
    return EXAMPLE_CLIENT_ONLY_IDS.has(id) ? "only" : "load";
}

export function createMigrationEntries(migrations: Migration[]): MigrationEntry[] {
    return migrations.map((migration) => {
        const sameName = migrations.filter((candidate) => candidate.deprecates.name === migration.deprecates.name);
        const altIndex = sameName.length > 1 ? sameName.indexOf(migration) + 1 : 0;
        const displayName = altIndex > 0
            ? `${migration.deprecates.name} (valg ${altIndex})`
            : migration.deprecates.name;
        const anchorId = altIndex > 0
            ? `migration-${migration.deprecates.name}-alt-${altIndex}`
            : `migration-${migration.deprecates.name}`;

        return {
            anchorId,
            displayName,
            migration,
        };
    });
}

export function createDetailTocItems(sections: ComponentDetailSections): DetailTocItem[] {
    return [
        sections.hasExample ? { id: "eksempel", label: "Eksempel" } : null,
        sections.hasPatterns ? { id: "monster-monstre", label: "Brukes i mønstre" } : null,
        sections.hasRequires ? { id: "krever", label: "Krever" } : null,
        { id: "props", label: "Props" },
        sections.hasMigrations ? { id: "migrering", label: "Migreringsguider" } : null,
        sections.hasSubcomponents ? { id: "delkomponenter", label: "Delkomponenter" } : null,
        sections.hasAlternatives ? { id: "alternativer", label: "Alternativer" } : null,
        sections.hasSiblings ? { id: sections.siblingsLabel, label: "Relaterte søsken" } : null,
        sections.hasRelated ? { id: "relaterte-komponenter", label: "Relaterte komponenter" } : null,
        { id: "metadata", label: "Metadata" },
    ].filter((item): item is DetailTocItem => Boolean(item));
}

export function initComponentDetailPage(root: ParentNode = document): void {
    if (typeof window === "undefined") return;

    const buttons = root.querySelectorAll<HTMLButtonElement>("[data-copy-code]");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            const code = button.dataset.copyCode;

            if (!code) {
                return;
            }

            try {
                await navigator.clipboard.writeText(code);
                const label = button.querySelector<HTMLElement>("[data-copy-label]");

                if (label) {
                    label.textContent = "Kopiert";
                }

                button.dataset.copyState = "copied";
                window.setTimeout(() => {
                    if (label) {
                        label.textContent = "Kopier";
                    }

                    button.dataset.copyState = "idle";
                }, 2000);
            } catch {
                button.dataset.copyState = "error";
            }
        });
    });
}
