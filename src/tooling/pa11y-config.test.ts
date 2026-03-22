import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const pa11yConfig = JSON.parse(
    readFileSync(path.resolve(process.cwd(), ".pa11yci.json"), "utf8"),
) as { urls: string[] };

describe("pa11y config", () => {
    it("targets current /ds routes instead of legacy 404 pages", () => {
        expect(pa11yConfig.urls).toEqual([
            "http://127.0.0.1:3001/ds",
            "http://127.0.0.1:3001/ds/mønster",
            "http://127.0.0.1:3001/ds/mønster/skjelettvisning",
            "http://127.0.0.1:3001/ds/mønster/tomtilstander",
            "http://127.0.0.1:3001/ds/søk?q=skjelettvisning",
        ]);
        expect(
            pa11yConfig.urls.every((url) => {
                const { pathname } = new URL(url);
                return pathname === "/ds" || pathname.startsWith("/ds/");
            }),
        ).toBe(true);
        expect(
            pa11yConfig.urls.some((url) => {
                const { pathname } = new URL(url);
                return pathname.includes("/component/") || pathname.includes("/token/") || pathname.includes("/formatter/");
            }),
        ).toBe(false);
        expect(pa11yConfig.urls).toContain("http://127.0.0.1:3001/ds/mønster");
        expect(pa11yConfig.urls).toContain("http://127.0.0.1:3001/ds/søk?q=skjelettvisning");
    });
});
