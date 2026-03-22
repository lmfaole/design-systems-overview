export const JOKUL_OVERVIEW_PATH = "/ds/jokul";
export const JOKUL_INSTALL_PATH = "/ds/jokul/installasjon";

export function getJokulSectionHref(sectionSlug: string): `/ds/${string}` {
    return `${JOKUL_OVERVIEW_PATH}/${sectionSlug}`;
}

export function getJokulAssetHref(sectionSlug: string, assetSlug: string): `/ds/${string}` {
    return `${getJokulSectionHref(sectionSlug)}/${assetSlug}`;
}

export function getJokulInstallGuideHref(guideSlug: string): `/ds/${string}` {
    return `${JOKUL_INSTALL_PATH}/${guideSlug}`;
}
