import { describe, expect, it } from "vitest";
import {
    createSitemapResponse,
    createSitemapRouteTree,
    getRoutePaths,
    getSitemapPaths,
    renderSitemapRouteList,
    renderSitemapXml,
} from "./sitemap";

describe("sitemap helpers", () => {
    it("collects public routes for the html sitemap", () => {
        const paths = getRoutePaths();

        expect(paths).toEqual(expect.arrayContaining([
            "/",
            "/ds",
            "/ds/jokul",
            "/ds/jokul/installasjon",
            "/ds/jokul/installasjon/react-og-core",
            "/ds/jokul/komponenter",
            "/ds/jokul/komponenter/button",
            "/ds/jokul/komponenter/loader",
            "/ds/jokul/komponenter/skeleton-loader",
            "/ds/jokul/komponenter/table",
            "/ds/jokul/tokens",
            "/ds/jokul/tokens/spacing",
            "/ds/søk",
            "/sitemap",
            "/sitemap.xml",
            "/ds/mønster",
        ]));
        expect(paths).not.toContain("/404");
    });

    it("filters the xml sitemap to crawler-relevant routes", () => {
        const paths = getSitemapPaths();

        expect(paths).toEqual(expect.arrayContaining([
            "/",
            "/ds",
            "/ds/jokul",
            "/ds/jokul/installasjon",
            "/ds/jokul/installasjon/react-og-core",
            "/ds/jokul/komponenter",
            "/ds/jokul/komponenter/button",
            "/ds/jokul/komponenter/loader",
            "/ds/jokul/komponenter/skeleton-loader",
            "/ds/jokul/komponenter/table",
            "/ds/jokul/tokens",
            "/ds/jokul/tokens/spacing",
            "/ds/mønster",
        ]));
        expect(paths).not.toContain("/404");
        expect(paths).not.toContain("/ds/søk");
        expect(paths).not.toContain("/sitemap");
        expect(paths).not.toContain("/sitemap.xml");
    });

    it("builds a nested route tree", () => {
        const tree = createSitemapRouteTree([
            "/",
            "/ds",
            "/ds/jokul",
            "/ds/jokul/komponenter",
            "/ds/jokul/komponenter/button",
            "/sitemap.xml",
        ]);

        expect(tree).toEqual([
            {
                path: "/",
                children: [
                    {
                        path: "/ds",
                        children: [
                            {
                                path: "/ds/jokul",
                                children: [
                                    {
                                        path: "/ds/jokul/komponenter",
                                        children: [
                                            {
                                                path: "/ds/jokul/komponenter/button",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: "/sitemap.xml",
                        children: [],
                    },
                ],
            },
        ]);
    });

    it("renders a nested route list", () => {
        const html = renderSitemapRouteList([
            "/",
            "/ds",
            "/ds/jokul",
            "/ds/jokul/komponenter",
            "/ds/jokul/komponenter/button",
            "/sitemap.xml",
        ]);

        expect(html).toContain('<ul>');
        expect(html).toContain('<a href="/">/</a>');
        expect(html).toContain('<a href="/ds/jokul/komponenter/button">/ds/jokul/komponenter/button</a>');
        expect(html).toContain('<a href="/sitemap.xml">/sitemap.xml</a>');
    });

    it("renders sitemap xml with absolute urls", () => {
        const xml = renderSitemapXml(["/", "/ds/jokul/komponenter/button"]);

        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xml).toContain("<loc>https://lmfaole.party/</loc>");
        expect(xml).toContain("<loc>https://lmfaole.party/ds/jokul/komponenter/button</loc>");
    });

    it("creates an xml response", async () => {
        const response = createSitemapResponse(["/"]);

        expect(response.headers.get("Content-Type")).toBe("application/xml; charset=utf-8");
        await expect(response.text()).resolves.toContain("<loc>https://lmfaole.party/</loc>");
    });
});
