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
            "/ds/søk",
            "/sitemap",
            "/sitemap.xml",
            "/ds/mønster",
            "/ds/mønster/status-i-oppdatert-region",
            "/ds/mønster/skjelettvisning",
            "/ds/mønster/fremdrift-ved-venting",
            "/ds/mønster/tomtilstander",
            "/ds/mønster/bekreftelse-etter-handling",
        ]));
        expect(paths).not.toContain("/404");
    });

    it("filters the xml sitemap to crawler-relevant routes", () => {
        const paths = getSitemapPaths();

        expect(paths).toEqual(expect.arrayContaining([
            "/",
            "/ds",
            "/ds/mønster",
            "/ds/mønster/status-i-oppdatert-region",
            "/ds/mønster/skjelettvisning",
            "/ds/mønster/fremdrift-ved-venting",
            "/ds/mønster/tomtilstander",
            "/ds/mønster/bekreftelse-etter-handling",
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
            "/ds/mønster",
            "/ds/mønster/skjelettvisning",
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
                                path: "/ds/mønster",
                                children: [
                                    {
                                        path: "/ds/mønster/skjelettvisning",
                                        children: [],
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
            "/ds/mønster",
            "/ds/mønster/skjelettvisning",
            "/sitemap.xml",
        ]);

        expect(html).toContain('<ul>');
        expect(html).toContain('<a href="/">/</a>');
        expect(html).toContain('<a href="/ds/mønster/skjelettvisning">/ds/mønster/skjelettvisning</a>');
        expect(html).toContain('<a href="/sitemap.xml">/sitemap.xml</a>');
    });

    it("renders sitemap xml with absolute urls", () => {
        const xml = renderSitemapXml(["/", "/ds/mønster/skjelettvisning"]);

        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xml).toContain("<loc>https://lmfaole.party/</loc>");
        expect(xml).toContain("<loc>https://lmfaole.party/ds/m%C3%B8nster/skjelettvisning</loc>");
    });

    it("creates an xml response", async () => {
        const response = createSitemapResponse(["/"]);

        expect(response.headers.get("Content-Type")).toBe("application/xml; charset=utf-8");
        await expect(response.text()).resolves.toContain("<loc>https://lmfaole.party/</loc>");
    });
});
