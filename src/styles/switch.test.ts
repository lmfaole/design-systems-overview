import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const switchStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/styles/switch.scss"),
    "utf8",
);

describe("Shared switch styles", () => {
    it("styles checkbox inputs with data-variant switch without extra utility classes", () => {
        expect(switchStylesSource).toContain(".switch");
        expect(switchStylesSource).toContain('input[type="checkbox"][data-variant="switch"]');
        expect(switchStylesSource).toContain(".switch:has(> input[type=\"checkbox\"][data-variant=\"switch\"])");
        expect(switchStylesSource).toContain("grid-template-columns: auto minmax(0, 1fr);");
        expect(switchStylesSource).toContain("align-self: center;");
        expect(switchStylesSource).toContain("@media (forced-colors: active)");
        expect(switchStylesSource).toContain("@media (prefers-reduced-motion: reduce)");
    });
});
