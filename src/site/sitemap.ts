import fs from "node:fs";
import path from "node:path";
import { getDesignSystemLocalPaths } from "@/data/design-systems/local-docs";
import { getPatternHref, patternPosts } from "@/data/mønster/patterns";
import { escapeHtml, joinHtml, tag, text } from "@/lib/html";
import { SITE_URL } from "@/site/seo";

const EXCLUDED_ROUTE_PATHS = new Set([
    "/404",
]);

const EXCLUDED_SITEMAP_PATHS = new Set([
    "/404",
    "/ds/søk",
    "/sitemap",
    "/sitemap.xml",
]);

const PAGE_FILE_EXTENSION = /\.(astro|ts|js)$/u;

function listPageFiles(rootDirectory: string): string[] {
    const files: string[] = [];

    function walk(directory: string) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                walk(entryPath);
                continue;
            }

            if (entry.isFile() && PAGE_FILE_EXTENSION.test(entry.name)) {
                files.push(entryPath);
            }
        }
    }

    walk(rootDirectory);

    return files.sort();
}

function toRoutePath(pageFilePath: string, pagesRoot: string): string | undefined {
    const relativePath = path.relative(pagesRoot, pageFilePath).replaceAll(path.sep, "/");
    const withoutExtension = relativePath.replace(PAGE_FILE_EXTENSION, "");

    if (withoutExtension.includes("[") || withoutExtension.includes("]")) {
        return undefined;
    }

    const segments = withoutExtension
        .split("/")
        .filter(Boolean)
        .filter((segment) => segment !== "index");

    return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function sortPaths(paths: string[]): string[] {
    return Array.from(new Set(paths)).sort((a, b) => a.localeCompare(b, "nb"));
}

function getStaticRoutePaths(pagesRoot: string): string[] {
    return listPageFiles(pagesRoot)
        .map((pageFilePath) => toRoutePath(pageFilePath, pagesRoot))
        .filter((routePath): routePath is string => Boolean(routePath));
}

export type SitemapRouteNode = {
    path: string;
    children: SitemapRouteNode[];
};

function getParentPath(routePath: string, routePaths: Set<string>): string | undefined {
    if (routePath === "/") {
        return undefined;
    }

    const segments = routePath.slice(1).split("/");

    while (segments.length > 1) {
        segments.pop();
        const candidatePath = `/${segments.join("/")}`;

        if (routePaths.has(candidatePath)) {
            return candidatePath;
        }
    }

    return routePaths.has("/") ? "/" : undefined;
}

function renderSitemapRouteNodes(nodes: SitemapRouteNode[]): string {
    return tag("ul", joinHtml(nodes.map((node) => tag("li", joinHtml([
        tag("a", text(node.path), { href: node.path }),
        node.children.length > 0 ? renderSitemapRouteNodes(node.children) : "",
    ])))));
}

export function getRoutePaths(
    pagesRoot = path.resolve(process.cwd(), "src/pages"),
): string[] {
    const staticPaths = getStaticRoutePaths(pagesRoot)
        .filter((routePath) => !EXCLUDED_ROUTE_PATHS.has(routePath));

    const dynamicPaths = [
        ...patternPosts.map((post) => getPatternHref(post)),
        ...getDesignSystemLocalPaths(),
    ];

    return sortPaths([...staticPaths, ...dynamicPaths]);
}

export function getSitemapPaths(
    pagesRoot = path.resolve(process.cwd(), "src/pages"),
): string[] {
    return getRoutePaths(pagesRoot)
        .filter((routePath) => !EXCLUDED_SITEMAP_PATHS.has(routePath));
}

export function createSitemapRouteTree(paths: string[]): SitemapRouteNode[] {
    const routePaths = new Set(paths);
    const nodesByPath = new Map(paths.map((routePath) => [
        routePath,
        {
            path: routePath,
            children: [] as SitemapRouteNode[],
        },
    ]));
    const rootNodes: SitemapRouteNode[] = [];

    for (const routePath of sortPaths(paths)) {
        const node = nodesByPath.get(routePath);

        if (!node) {
            continue;
        }

        const parentPath = getParentPath(routePath, routePaths);

        if (!parentPath) {
            rootNodes.push(node);
            continue;
        }

        const parentNode = nodesByPath.get(parentPath);

        if (!parentNode) {
            rootNodes.push(node);
            continue;
        }

        parentNode.children.push(node);
    }

    return rootNodes;
}

export function renderSitemapRouteList(paths: string[]): string {
    return renderSitemapRouteNodes(createSitemapRouteTree(paths));
}

export function renderSitemapXml(paths: string[], siteUrl = SITE_URL): string {
    const urls = paths
        .map((routePath) =>
            [
                "  <url>",
                `    <loc>${escapeHtml(new URL(routePath, siteUrl).toString())}</loc>`,
                "  </url>",
            ].join("\n"),
        )
        .join("\n");

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        urls,
        "</urlset>",
        "",
    ].join("\n");
}

export function createSitemapResponse(
    paths = getSitemapPaths(),
    siteUrl = SITE_URL,
): Response {
    return new Response(renderSitemapXml(paths, siteUrl), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
