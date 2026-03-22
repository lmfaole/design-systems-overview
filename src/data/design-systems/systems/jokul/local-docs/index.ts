import type {
    DesignSystemAssetDoc,
    DesignSystemLocalDocs,
    DesignSystemLocalSectionDocs,
} from "../../../types";
import { jokulLocalOverview } from "./overview";
import { JOKUL_INSTALL_PATH, JOKUL_OVERVIEW_PATH, getJokulAssetHref, getJokulInstallGuideHref, getJokulSectionHref } from "./paths";
import { jokulLocalSections } from "./sections";

export {
    JOKUL_INSTALL_PATH,
    JOKUL_OVERVIEW_PATH,
    getJokulAssetHref,
    getJokulInstallGuideHref,
    getJokulSectionHref,
};

export const jokulLocalDocs: DesignSystemLocalDocs = {
    systemSlug: "jokul",
    overview: jokulLocalOverview,
    sections: jokulLocalSections,
};

export function getJokulLocalSection(sectionSlug: string): DesignSystemLocalSectionDocs | undefined {
    return jokulLocalSections.find((section) => section.slug === sectionSlug);
}

export function getJokulAssetDoc(
    sectionSlug: string,
    assetSlug: string,
): DesignSystemAssetDoc | undefined {
    return getJokulLocalSection(sectionSlug)?.items.find((item) => item.slug === assetSlug);
}
