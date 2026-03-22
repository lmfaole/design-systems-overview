import { getDesignSystem } from ".";
import type {
    DesignSystemAssetDoc,
    DesignSystemLocalSectionDocs,
} from "./types";
import {
    JOKUL_INSTALL_PATH,
    JOKUL_OVERVIEW_PATH,
    getJokulAssetDoc,
    getJokulInstallGuideHref,
    getJokulLocalSection,
    getJokulSectionHref,
    jokulLocalDocs,
} from "./systems/jokul/docs";

export interface DesignSystemLocalPage {
    href: `/ds/${string}`;
    title: string;
    description: string;
    keywords: string[];
    meta: string;
}

function getJokulLocalPages(): DesignSystemLocalPage[] {
    const system = getDesignSystem("jokul");

    if (!system || system.localDocumentation?.status !== "documented") {
        return [];
    }

    const installPages: DesignSystemLocalPage[] = [
        {
            href: JOKUL_INSTALL_PATH,
            title: "Jøkul installasjon",
            description: "Oversikt over lokale installasjonsguider for Jøkul.",
            keywords: [
                "jokul",
                "installasjon",
                "core",
                "react",
                "pakker",
            ],
            meta: "Jøkul · Installasjon",
        },
        ...system.installGuides
            .filter((guide) => guide.status === "documented" && guide.localPath)
            .map((guide) => ({
                href: getJokulInstallGuideHref(guide.slug),
                title: guide.title,
                description: guide.description,
                keywords: [
                    "jokul",
                    "installasjon",
                    ...guide.packages,
                ],
                meta: "Jøkul · Installasjon",
            })),
    ];

    const sectionPages: DesignSystemLocalPage[] = jokulLocalDocs.sections.flatMap((section) => [
        {
            href: getJokulSectionHref(section.slug),
            title: `Jøkul ${section.title}`,
            description: section.description,
            keywords: [
                "jokul",
                section.title,
                ...section.keywords,
            ],
            meta: `Jøkul · ${section.title}`,
        },
        ...section.items.map((item) => ({
            href: `${getJokulSectionHref(section.slug)}/${item.slug}` as `/ds/${string}`,
            title: item.title,
            description: item.description,
            keywords: [
                "jokul",
                section.title,
                ...section.keywords,
                ...item.keywords,
                ...(item.packageName ? [item.packageName] : []),
            ],
            meta: `Jøkul · ${section.title}`,
        })),
    ]);

    return [
        {
            href: JOKUL_OVERVIEW_PATH,
            title: "Jøkul",
            description: jokulLocalDocs.overview.description,
            keywords: [
                "jokul",
                "fremtind",
                "designsystem",
                "komponenter",
                "tokens",
                "installasjon",
            ],
            meta: "Jøkul · Oversikt",
        },
        ...installPages,
        ...sectionPages,
    ];
}

export function getDesignSystemLocalPages(): DesignSystemLocalPage[] {
    return getJokulLocalPages().sort((a, b) => a.href.localeCompare(b.href, "nb"));
}

export function getDesignSystemLocalPaths(): Array<`/ds/${string}`> {
    return getDesignSystemLocalPages().map((page) => page.href);
}

export function getLocalDesignSystemSection(
    systemSlug: string,
    sectionSlug: string,
): DesignSystemLocalSectionDocs | undefined {
    if (systemSlug === "jokul") {
        return getJokulLocalSection(sectionSlug);
    }

    return undefined;
}

export function getLocalDesignSystemAsset(
    systemSlug: string,
    sectionSlug: string,
    assetSlug: string,
): DesignSystemAssetDoc | undefined {
    if (systemSlug === "jokul") {
        return getJokulAssetDoc(sectionSlug, assetSlug);
    }

    return undefined;
}
