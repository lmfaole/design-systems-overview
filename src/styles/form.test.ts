import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const formStylesSource = readFileSync(
    path.resolve(process.cwd(), "src/styles/form.scss"),
    "utf8",
);

describe("Shared form styles", () => {
    it("co-locates shared label, text field, and select styling", () => {
        expect(formStylesSource).toContain(
            ':where(label):has(> :is(input[type="search"], input[type="text"], input[type="number"], textarea, select))',
        );
        expect(formStylesSource).toContain(':where(input[type="search"], input[type="text"], input[type="number"], textarea)');
        expect(formStylesSource).toContain(":where(select)");
        expect(formStylesSource).toContain(":where(button)");
        expect(formStylesSource).toContain(':where(button[data-variant="quiet"])');
        expect(formStylesSource).toContain("appearance: none;");
        expect(formStylesSource).toContain("background-image:");
    });
});
