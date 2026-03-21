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
            "http://127.0.0.1:3001/ds/jokul",
            "http://127.0.0.1:3001/ds/jokul/formatter",
            "http://127.0.0.1:3001/ds/jokul/component",
            "http://127.0.0.1:3001/ds/jokul/component/button",
            "http://127.0.0.1:3001/ds/jokul/component/props",
            "http://127.0.0.1:3001/ds/jokul/token",
            "http://127.0.0.1:3001/ds/jokul/token/farger",
            "http://127.0.0.1:3001/ds/monster",
            "http://127.0.0.1:3001/ds/monster/lastetilstander",
            "http://127.0.0.1:3001/ds/sok?q=button",
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
                return /\/jokul(?:\/|$)/.test(pathname) && !pathname.startsWith("/ds/");
            }),
        ).toBe(false);
        expect(pa11yConfig.urls).toContain("http://127.0.0.1:3001/ds/jokul/component");
        expect(pa11yConfig.urls).toContain("http://127.0.0.1:3001/ds/jokul/component/props");
    });
});
