import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(
    readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"),
) as { scripts: Record<string, string> };

describe("package scripts", () => {
    it("uses incremental setup and browser ensure helpers in the expensive flows", () => {
        expect(packageJson.scripts.postinstall).toBe("patch-package && npm run setup");
        expect(packageJson.scripts.setup).toBe("node scripts/setup.mjs");
        expect(packageJson.scripts["browser:ensure"]).toBe("node scripts/ensure-browser.mjs");
        expect(packageJson.scripts["test:browser"]).toBe("npm run build && npm run test:browser:run");
        expect(packageJson.scripts["test:a11y"]).toBe("npm run build && npm run test:a11y:built");
        expect(packageJson.scripts["test:lighthouse"]).toBe("npm run build && npm run test:lighthouse:built");
        expect(packageJson.scripts["test:browser:run"]).not.toContain("browser:install");
        expect(packageJson.scripts["test:a11y:built"]).not.toContain("browser:install");
        expect(packageJson.scripts["test:lighthouse:built"]).not.toContain("browser:install");
    });
});
