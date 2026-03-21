import { describe, expect, it } from "vitest";
import spacingPost from "./index";

function getSpacingTableByCaption(caption: string) {
    return spacingPost.tokenOverview?.find((table) => table.caption === caption);
}

describe("spacing token previews", () => {
    it("renders semantic spacing tokens as real bars except the explicit none token", () => {
        const spacingTable = getSpacingTableByCaption("Spacing-skalaen — alle tilgjengelige tokens");

        expect(spacingTable).toBeDefined();

        for (const row of spacingTable?.rows ?? []) {
            const exampleMarkup = row[0];
            const tokenMarkup = row[1];
            const isZeroToken = tokenMarkup.includes(">--jkl-spacing-none</code>");

            if (isZeroToken) {
                expect(exampleMarkup).toContain("style=\"display:block;inline-size:2px;");
                expect(exampleMarkup).toContain("opacity:0.24");
                continue;
            }

            expect(exampleMarkup).toContain("inline-size:min(100%, var(");
            expect(exampleMarkup).not.toContain("opacity:0.24");
        }
    });

    it("renders unit tokens as real bars except the explicit zero token", () => {
        const unitTable = getSpacingTableByCaption("Unit-tokens — grunnleggende størrelsesenheter");

        expect(unitTable).toBeDefined();

        for (const row of unitTable?.rows ?? []) {
            const exampleMarkup = row[0];
            const tokenMarkup = row[1];
            const isZeroToken = tokenMarkup.includes(">--jkl-unit-0</code>");

            if (isZeroToken) {
                expect(exampleMarkup).toContain("style=\"display:block;inline-size:2px;");
                expect(exampleMarkup).toContain("opacity:0.24");
                continue;
            }

            expect(exampleMarkup).toContain("inline-size:min(100%, var(");
            expect(exampleMarkup).not.toContain("opacity:0.24");
        }
    });
});
