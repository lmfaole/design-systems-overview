import {
    DESIGN_SYSTEM_ASSET_KINDS,
    type DesignSystem,
    type DesignSystemAssetKind,
    type DesignSystemComponentAssetDoc,
    type DesignSystemComponentRuntimeLevel,
    type DesignSystemDocumentationStatus,
    type DesignSystemPropSource,
    type DesignSystemPropTable,
    type DesignSystemRelationshipGroup,
    type DesignSystemRelationshipKind,
} from "./types";

const DESIGN_SYSTEM_ASSET_KIND_LABELS: Record<DesignSystemAssetKind, string> = {
    component: "Komponenter",
    formatter: "Formattere",
    hook: "Hooks",
    mixin: "Mixins",
    token: "Designtokens",
    icon: "Ikoner",
    utility: "Utilities",
    theme: "Tema og styling",
    pattern: "Mønstre",
    template: "Maler",
    tooling: "Tooling",
};

const DESIGN_SYSTEM_PROP_SOURCE_LABELS: Record<
    Exclude<DesignSystemPropSource, "framework">,
    string
> = {
    "design-system": "Design system-props",
    native: "Native HTML-props",
    aria: "ARIA-props",
    deprecated: "Utfasete props",
};

const DESIGN_SYSTEM_RELATIONSHIP_LABELS: Record<
    DesignSystemRelationshipKind,
    string
> = {
    parent: "Foreldre",
    child: "Barn",
    sibling: "Søsken",
    alternative: "Alternativer",
    pattern: "Relaterte mønstre",
};

const DESIGN_SYSTEM_COMPONENT_RUNTIME_LEVEL_LABELS: Record<
    DesignSystemComponentRuntimeLevel,
    string
> = {
    none: "Ingen",
    optional: "Valgfri",
    required: "Påkrevd",
};

export function getDesignSystemDocumentationStatus(
    system: DesignSystem,
): DesignSystemDocumentationStatus {
    return system.localDocumentation?.status ?? "external";
}

export function isDocumentedInProject(system: DesignSystem): boolean {
    return getDesignSystemDocumentationStatus(system) === "documented";
}

export function isPlannedInProject(system: DesignSystem): boolean {
    return getDesignSystemDocumentationStatus(system) === "planned";
}

export function getAssetKindLabel(kind: DesignSystemAssetKind): string {
    return DESIGN_SYSTEM_ASSET_KIND_LABELS[kind];
}

export function getDesignSystemCoverageKinds(
    system: DesignSystem,
): DesignSystemAssetKind[] {
    const coveredKinds = new Set(system.catalog.map((section) => section.kind));

    return DESIGN_SYSTEM_ASSET_KINDS.filter((kind) => coveredKinds.has(kind));
}

export function getDesignSystemCoverageKindLabels(
    system: DesignSystem,
): string[] {
    return getDesignSystemCoverageKinds(system).map((kind) => getAssetKindLabel(kind));
}

export function getInstallGuideCountLabel(system: DesignSystem): string | null {
    const count = system.installGuides.length;

    if (count === 0) {
        return null;
    }

    return `${count} installasjonsguide${count === 1 ? "" : "r"}`;
}

export function getDocumentationStatusText(system: DesignSystem): string {
    switch (getDesignSystemDocumentationStatus(system)) {
        case "documented":
            return "Har lokal dokumentasjon i repoet.";
        case "planned":
            return "Har en planlagt lokal dokumentasjonsstruktur i repoet.";
        case "external":
            return "Følger foreløpig bare ekstern dokumentasjon.";
    }
}

export function getDesignSystemPropTableId(source: DesignSystemPropSource): string {
    return `props-${source}`;
}

export function getDesignSystemPropTableTitle(
    systemName: string,
    table: DesignSystemPropTable,
): string {
    if (table.source === "framework") {
        return `${table.frameworkName}-props`;
    }

    if (table.source === "design-system") {
        return `${systemName}-props`;
    }

    return DESIGN_SYSTEM_PROP_SOURCE_LABELS[table.source];
}

export function getDesignSystemRelationshipTitle(
    group: DesignSystemRelationshipGroup,
): string {
    return DESIGN_SYSTEM_RELATIONSHIP_LABELS[group.kind];
}

export function getDesignSystemRelationshipGroupId(
    group: DesignSystemRelationshipGroup,
): string {
    return `asset-relasjoner-${group.kind}`;
}

export function getDesignSystemComponentPartId(name: string): string {
    return `part-${name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`;
}

export function getDesignSystemComponentSubcomponentId(slug: string): string {
    return `subcomponent-${slug}`;
}

export function getDesignSystemComponentSubcomponentPropTableId(
    subcomponentSlug: string,
    source: DesignSystemPropSource,
): string {
    return `${getDesignSystemComponentSubcomponentId(subcomponentSlug)}-${getDesignSystemPropTableId(source)}`;
}

export function getDesignSystemComponentRuntimeLevelLabel(
    level: DesignSystemComponentRuntimeLevel,
): string {
    return DESIGN_SYSTEM_COMPONENT_RUNTIME_LEVEL_LABELS[level];
}

export function getDesignSystemComponentProfileSummary(
    asset: DesignSystemComponentAssetDoc,
): Array<{ label: string; value: string }> {
    const propCount = [
        ...asset.propTables,
        ...(asset.subcomponents?.flatMap((subcomponent) => subcomponent.propTables) ?? []),
    ].flatMap((table) => table.rows).length;

    return [
        {
            label: "Klient-JS",
            value: getDesignSystemComponentRuntimeLevelLabel(
                asset.componentProfile.clientRuntime,
            ),
        },
        {
            label: "Hydrering",
            value: getDesignSystemComponentRuntimeLevelLabel(
                asset.componentProfile.hydration,
            ),
        },
        {
            label: "Dokumenterte props",
            value: String(propCount),
        },
        {
            label: "Playground-kontroller",
            value: String(asset.example.interactive.controls.length),
        },
        {
            label: "Delkomponenter",
            value: String(asset.subcomponents?.length ?? 0),
        },
        {
            label: "Anatomideler",
            value: String(asset.parts?.length ?? 0),
        },
        {
            label: "Komposisjoner",
            value: String(asset.recipes?.length ?? 0),
        },
        {
            label: "Utfasete props",
            value: String(asset.deprecatedPropMigrations?.length ?? 0),
        },
    ];
}
