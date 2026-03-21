import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const gridStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/styles/grid.scss"),
    "utf8",
);

describe("Shared grid styles", () => {
    it("keeps grids single-column by default and progressively enhances multi-column layouts", () => {
        expect(gridStylesSource).toContain(".grid");
        expect(gridStylesSource).toContain("--ds-grid-columns: 1;");
        expect(gridStylesSource).toContain("@media (min-width: 42.5rem)");
        expect(gridStylesSource).toContain("@media (min-width: 75rem)");
        expect(gridStylesSource).toContain('&[data-columns="2"]');
        expect(gridStylesSource).toContain('&[data-columns="3"]');
        expect(gridStylesSource).toContain('&[data-columns="4"]');
        expect(gridStylesSource).not.toContain("attr(data-columns");
    });
});
