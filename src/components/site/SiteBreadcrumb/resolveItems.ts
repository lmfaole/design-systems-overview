import { getComponentDoc, getParentAndSiblings } from "@/features/ds/jokul/_component-docs/data";
import { getTokenPost } from "@/features/ds/jokul/_token/data";
import { getPatternPost } from "@/data/monster/patterns";

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

function resolveJokulComponentItems(componentId: string): SiteBreadcrumbItem[] {
    const doc = getComponentDoc(componentId);

    if (!doc) {
        return withCurrent([
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { href: "/ds/jokul", label: "Jøkul" },
            { href: "/ds/jokul/component", label: "Komponenter" },
            { label: humanizeSegment(componentId) },
        ]);
    }

    const { parent } = getParentAndSiblings(componentId);

    return withCurrent(
        parent
            ? [
                { href: "/", label: "Forside" },
                { href: "/ds", label: "Designsystemer" },
                { href: "/ds/jokul", label: "Jøkul" },
                { href: "/ds/jokul/component", label: "Komponenter" },
                { href: `/ds/jokul/component/${parent.id}`, label: parent.name },
                { label: doc.name },
            ]
            : [
                { href: "/", label: "Forside" },
                { href: "/ds", label: "Designsystemer" },
                { href: "/ds/jokul", label: "Jøkul" },
                { href: "/ds/jokul/component", label: "Komponenter" },
                { label: doc.name },
            ],
    );
}

function resolveJokulTokenItems(tokenSlug: string): SiteBreadcrumbItem[] {
    const post = getTokenPost(tokenSlug);

    return withCurrent([
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { href: "/ds/jokul", label: "Jøkul" },
        { href: "/ds/jokul/token", label: "Designtokens" },
        { label: post?.title ?? humanizeSegment(tokenSlug) },
    ]);
}

function resolveMonsterItems(patternId: string): SiteBreadcrumbItem[] {
    const post = getPatternPost(patternId);

    return withCurrent([
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { href: "/ds/monster", label: "Mønster" },
        { label: post?.title ?? humanizeSegment(patternId) },
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

    if (segments[1] === "sok") {
        return withCurrent([
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { label: "Søk" },
        ]);
    }

    if (segments[1] === "jokul") {
        if (segments.length === 2) {
            return withCurrent([
                { href: "/", label: "Forside" },
                { href: "/ds", label: "Designsystemer" },
                { label: "Jøkul" },
            ]);
        }

        if (segments[2] === "component") {
            if (segments.length === 3) {
                return withCurrent([
                    { href: "/", label: "Forside" },
                    { href: "/ds", label: "Designsystemer" },
                    { href: "/ds/jokul", label: "Jøkul" },
                    { label: "Komponenter" },
                ]);
            }

            if (segments[3] === "props") {
                return withCurrent([
                    { href: "/", label: "Forside" },
                    { href: "/ds", label: "Designsystemer" },
                    { href: "/ds/jokul", label: "Jøkul" },
                    { href: "/ds/jokul/component", label: "Komponenter" },
                    { label: "Props-oversikt" },
                ]);
            }

            return resolveJokulComponentItems(segments[3]);
        }

        if (segments[2] === "token") {
            if (segments.length === 3) {
                return withCurrent([
                    { href: "/", label: "Forside" },
                    { href: "/ds", label: "Designsystemer" },
                    { href: "/ds/jokul", label: "Jøkul" },
                    { label: "Designtokens" },
                ]);
            }

            return resolveJokulTokenItems(segments[3]);
        }

        return withCurrent([
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { href: "/ds/jokul", label: "Jøkul" },
            { label: humanizeSegment(segments[2]) },
        ]);
    }

    if (segments[1] === "monster") {
        if (segments.length === 2) {
            return withCurrent([
                { href: "/", label: "Forside" },
                { href: "/ds", label: "Designsystemer" },
                { label: "Mønster" },
            ]);
        }

        return resolveMonsterItems(segments[2]);
    }

    return withCurrent([
        { href: "/", label: "Forside" },
        { href: "/ds", label: "Designsystemer" },
        { label: humanizeSegment(segments[1]) },
    ]);
}
