import aksel from "./systems/aksel";
import designsystemet from "./systems/designsystemet";
import jokul from "./systems/jokul";
import {
    createInteractiveExample,
    getInteractiveExampleDefaultValues,
    getInteractiveExampleInitialState,
    getInteractiveExampleStateKey,
} from "./playground";
import {
    assertValidDesignSystemLocalDocs,
    validateDesignSystemLocalDocs,
} from "./validation";
import {
    getDesignSystemCoverageKindLabels,
    getDesignSystemCoverageKinds,
    getDesignSystemComponentProfileSummary,
    getDesignSystemComponentRuntimeLevelLabel,
    getDesignSystemComponentPartId,
    getDesignSystemComponentSubcomponentId,
    getDesignSystemComponentSubcomponentPropTableId,
    getDesignSystemDocumentationStatus,
    getDesignSystemPropTableId,
    getDesignSystemPropTableTitle,
    getDesignSystemRelationshipGroupId,
    getDesignSystemRelationshipTitle,
    getDocumentationStatusText,
    getAssetKindLabel,
    getInstallGuideCountLabel,
    isDocumentedInProject,
    isPlannedInProject,
} from "./helpers";
import type { DesignSystem } from "./types";

export const DESIGN_SYSTEMS: DesignSystem[] = [
    aksel,
    designsystemet,
    jokul,
].sort((a, b) => a.name.localeCompare(b.name, "nb"));

export function getDesignSystems(): DesignSystem[] {
    return [...DESIGN_SYSTEMS];
}

export function getDesignSystem(slug: string): DesignSystem | undefined {
    return DESIGN_SYSTEMS.find((system) => system.slug === slug);
}

export function getDocumentedDesignSystems(): DesignSystem[] {
    return getDesignSystems().filter((system) => isDocumentedInProject(system));
}

export function getPlannedDesignSystems(): DesignSystem[] {
    return getDesignSystems().filter((system) => isPlannedInProject(system));
}

export function getExternalOnlyDesignSystems(): DesignSystem[] {
    return getDesignSystems().filter((system) =>
        getDesignSystemDocumentationStatus(system) === "external");
}

export type {
    DesignSystem,
    DesignSystemAssetKind,
    DesignSystemAssetDoc,
    DesignSystemCatalogItem,
    DesignSystemCatalogSection,
    DesignSystemCodeLanguage,
    DesignSystemComponentAssetDoc,
    DesignSystemComponentExample,
    DesignSystemComponentPart,
    DesignSystemComponentProfile,
    DesignSystemComponentRecipe,
    DesignSystemComponentRuntimeLevel,
    DesignSystemComponentSubcomponentDoc,
    DesignSystemContentSection,
    DesignSystemDataTable,
    DesignSystemDeprecatedPropMigration,
    DesignSystemDocumentedAsset,
    DesignSystemDocumentationStatus,
    DesignSystemExample,
    DesignSystemExampleCode,
    DesignSystemInteractiveExample,
    DesignSystemInteractiveExampleBooleanControl,
    DesignSystemInteractiveExampleControl,
    DesignSystemInteractiveExampleEventLog,
    DesignSystemInteractiveExampleSelectControl,
    DesignSystemInteractiveExampleSelectOption,
    DesignSystemInteractiveExampleState,
    DesignSystemInteractiveExampleValue,
    DesignSystemExternalLinks,
    DesignSystemInstallGuide,
    DesignSystemInstallStep,
    DesignSystemLocalDocs,
    DesignSystemLocalDocumentationPlan,
    DesignSystemLocalSectionDocs,
    DesignSystemPackage,
    DesignSystemPropRow,
    DesignSystemPropSource,
    DesignSystemPropTable,
    DesignSystemRelatedLink,
    DesignSystemRelationshipGroup,
    DesignSystemRelationshipKind,
    DesignSystemReferenceAssetDoc,
    DesignSystemTableColumn,
} from "./types";

export {
    createInteractiveExample,
    getAssetKindLabel,
    getInteractiveExampleDefaultValues,
    getInteractiveExampleInitialState,
    getInteractiveExampleStateKey,
    getDesignSystemComponentPartId,
    getDesignSystemComponentSubcomponentId,
    getDesignSystemComponentSubcomponentPropTableId,
    getDesignSystemCoverageKindLabels,
    getDesignSystemCoverageKinds,
    getDesignSystemComponentProfileSummary,
    getDesignSystemComponentRuntimeLevelLabel,
    getDesignSystemDocumentationStatus,
    getDesignSystemPropTableId,
    getDesignSystemPropTableTitle,
    getDesignSystemRelationshipGroupId,
    getDesignSystemRelationshipTitle,
    getDocumentationStatusText,
    getInstallGuideCountLabel,
    isDocumentedInProject,
    isPlannedInProject,
    assertValidDesignSystemLocalDocs,
    validateDesignSystemLocalDocs,
};
