import {
    DESIGN_SYSTEMS,
    getDesignSystemCoverageKindLabels,
    getDesignSystemDocumentationStatus,
    getDocumentationStatusText,
    getExternalOnlyDesignSystems,
    getInstallGuideCountLabel,
    getPlannedDesignSystems,
    isDocumentedInProject,
    isPlannedInProject,
    type DesignSystem,
} from "@/data/design-systems";

export function getDesignSystems() {
    return [...DESIGN_SYSTEMS];
}

export function getDocumentedDesignSystems() {
    return getDesignSystems().filter((system) => isDocumentedInProject(system));
}

export function getPlannedLocalDesignSystems() {
    return getPlannedDesignSystems();
}

export function getExternalDesignSystems() {
    return getExternalOnlyDesignSystems();
}

export function getComponentCountLabel(system: DesignSystem) {
    const count = system.stats?.components;

    if (typeof count !== "number") return null;

    return `${count} komponent${count === 1 ? "" : "er"}`;
}

export function getInstallGuideLabel(system: DesignSystem) {
    return getInstallGuideCountLabel(system);
}

export function getCoverageLabels(system: DesignSystem) {
    return getDesignSystemCoverageKindLabels(system);
}

export function getDocumentationStatusLabel(system: DesignSystem) {
    return getDocumentationStatusText(system);
}

export function getLocalBasePath(system: DesignSystem) {
    return system.localDocumentation?.basePath ?? null;
}

export function getPrimarySystemHref(system: DesignSystem) {
    const localBasePath = getLocalBasePath(system);

    if (localBasePath && getDesignSystemDocumentationStatus(system) === "documented") {
        return localBasePath;
    }

    return system.docs;
}

export function getRoadmapItems(system: DesignSystem) {
    return system.localDocumentation?.roadmap ?? [];
}

export function getPackageLabel(system: DesignSystem) {
    return system.packageName ?? system.packages[0]?.name ?? null;
}

export function isPlannedLocally(system: DesignSystem) {
    return isPlannedInProject(system);
}
