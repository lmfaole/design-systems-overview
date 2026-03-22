import { getDesignSystem } from "@/data/design-systems";
import {
    getLocalDesignSystemAsset,
    getLocalDesignSystemSection,
} from "@/data/design-systems/local-docs";
import { getPatternPost } from "@/data/mønster/patterns";

export type SiteBreadcrumbItem = {
    href?: string;
    label: string;
    current?: boolean;
};

function normalizePathname(pathname: string): string {
    const normalized = pathname.replace(/\/+$/, "");
    return normalized || "/";
}

function decodeSegment(segment: string): string {
    return decodeURIComponent(segment);
}

function humanizeSegment(segment: string): string {
    const decoded = decodeSegment(segment).replace(/-/g, " ");
    return decoded.charAt(0).toLocaleUpperCase("nb-NO") + decoded.slice(1);
}

function withCurrent(items: SiteBreadcrumbItem[]): SiteBreadcrumbItem[] {
    return items.map((item, index) => ({
        ...item,
        current: index === items.length - 1,
        href: index === items.length - 1 ? undefined : item.href,
    }));
}

function resolveMønsterItems(patternSlug: string): SiteBreadcrumbItem[] {
    const post = getPatternPost(patternSlug);

    return withCurrent([
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { href: "/ds/mønster", label: "Mønster" },
        { label: post?.title ?? humanizeSegment(patternSlug) },
    ]);
}

function resolveDesignSystemItems(segments: string[]): SiteBreadcrumbItem[] | undefined {
    const systemSlug = segments[1];
    const system = getDesignSystem(systemSlug ?? "");

    if (!system) {
        return undefined;
    }

    const baseItems: SiteBreadcrumbItem[] = [
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { href: `/ds/${system.slug}`, label: system.name },
    ];

    if (segments.length === 2) {
        return withCurrent([
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { label: system.name },
        ]);
    }

    if (segments[2] === "installasjon") {
        if (segments.length === 3) {
            return withCurrent([
                ...baseItems,
                { label: "Installasjon" },
            ]);
        }

        const guide = system.installGuides.find((entry) => entry.slug === segments[3]);

        return withCurrent([
            ...baseItems,
            { href: `/ds/${system.slug}/installasjon`, label: "Installasjon" },
            { label: guide?.title ?? humanizeSegment(segments[3] ?? "") },
        ]);
    }

    const sectionSlug = segments[2] ?? "";
    const section = getLocalDesignSystemSection(system.slug, sectionSlug)
        ?? system.catalog.find((entry) => entry.localPath?.endsWith(`/${sectionSlug}`));

    if (segments.length === 3) {
        return withCurrent([
            ...baseItems,
            { label: section?.title ?? humanizeSegment(sectionSlug) },
        ]);
    }

    const asset = getLocalDesignSystemAsset(system.slug, sectionSlug, segments[3] ?? "");

    return withCurrent([
        ...baseItems,
        { href: `/ds/${system.slug}/${sectionSlug}`, label: section?.title ?? humanizeSegment(sectionSlug) },
        { label: asset?.title ?? humanizeSegment(segments[3] ?? "") },
    ]);
}

export function resolveSiteBreadcrumbItems(pathname: string): SiteBreadcrumbItem[] {
    const normalizedPathname = normalizePathname(pathname);

    if (normalizedPathname === "/") {
        return [{ label: "Forside", current: true }];
    }

    const segments = normalizedPathname.split("/").filter(Boolean).map(decodeSegment);

    if (segments[0] !== "ds") {
        return withCurrent([
            { href: "/", label: "Forside" },
            { label: humanizeSegment(segments[segments.length - 1] ?? "") },
        ]);
    }

    if (segments.length === 1) {
        return withCurrent([
            { href: "/", label: "Forside" },
            { label: "Designsystemer" },
        ]);
    }

    if (segments[1] === "søk") {
        return withCurrent([
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { label: "Søk" },
        ]);
    }

    if (segments[1] === "mønster") {
        if (segments.length === 2) {
            return withCurrent([
                { href: "/", label: "Forside" },
                { href: "/ds", label: "Designsystemer" },
                { label: "Mønster" },
            ]);
        }

        return resolveMønsterItems(segments[2]);
    }

    const designSystemItems = resolveDesignSystemItems(segments);

    if (designSystemItems) {
        return designSystemItems;
    }

    return withCurrent([
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { label: humanizeSegment(segments[1]) },
    ]);
}
