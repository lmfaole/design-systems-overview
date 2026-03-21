import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const cardStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/styles/card.scss"),
    "utf8",
);

describe("Shared card styles", () => {
    it("defines the shared card surface and infers linked cards from a direct child anchor", () => {
        expect(cardStylesSource).toContain(".card");
        expect(cardStylesSource).toContain(".card:has(> a:any-link)");
        expect(cardStylesSource).toContain(".card > a:any-link");
        expect(cardStylesSource).toContain("display: grid;");
        expect(cardStylesSource).toContain("text-decoration: none;");
    });
});
