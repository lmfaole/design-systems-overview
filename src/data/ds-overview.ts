import { DESIGN_SYSTEMS, type DesignSystem } from "@/data/design-systems";

export function isDocumentedInProject(system: DesignSystem) {
    return system.docs.startsWith("/ds/");
}

export function getDesignSystems() {
    return [...DESIGN_SYSTEMS];
}

export function getUndocumentedDesignSystems() {
    return getDesignSystems().filter((system) => !isDocumentedInProject(system));
}

export function getDocumentedDesignSystems() {
    return getDesignSystems().filter((system) => isDocumentedInProject(system));
}

export function getComponentCountLabel(system: DesignSystem) {
    const count = system.stats?.components;

    if (typeof count !== "number") return null;

    return `${count} komponent${count === 1 ? "" : "er"}`;
}
