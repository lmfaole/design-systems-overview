import { DESIGN_SYSTEMS, type DesignSystem } from "@/data/design-systems";
import { componentDocs } from "@/data/jokul/component-docs";

export function isDocumentedInProject(system: DesignSystem) {
    return system.docs.startsWith("/ds/");
}

export function getDesignSystems() {
    const jokulComponentCount = componentDocs.filter((doc) => doc.showOnOverview !== false).length;

    return DESIGN_SYSTEMS.map((system) => {
        if (system.docs !== "/ds/jokul") return system;

        return {
            ...system,
            stats: { ...system.stats, components: jokulComponentCount },
        };
    });
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
