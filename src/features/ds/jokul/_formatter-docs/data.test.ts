import { describe, expect, it } from "vitest";
import { formatterDocs, getFormatterDoc } from "./data";
import { visibleFormatterCount } from "@/features/ds/jokul/formatters/formatter-overview-data";

describe("Jokul formatter docs integrity", () => {
    it("documents every public formatter export from @fremtind/jokul/utilities", async () => {
        const utilities = await import("@fremtind/jokul/utilities");

        const publicFormatterExports = Object.keys(utilities)
            .filter((name) => name === "parseNumber" || name === "registerWithMasks" || name.startsWith("format"))
            .sort((a, b) => a.localeCompare(b, "nb"));
        const documentedNames = formatterDocs
            .map((doc) => doc.name)
            .sort((a, b) => a.localeCompare(b, "nb"));

        expect(documentedNames).toEqual(publicFormatterExports);
    });

    it("keeps formatter relationships pointed at valid formatter docs", () => {
        for (const doc of formatterDocs) {
            for (const relatedId of doc.related ?? []) {
                expect(getFormatterDoc(relatedId), `${doc.id} -> ${relatedId}`).toBeDefined();
            }
        }
    });

    it("exposes all formatter docs on the overview", () => {
        expect(visibleFormatterCount).toBe(formatterDocs.length);
    });
});
