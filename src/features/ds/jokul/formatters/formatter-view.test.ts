import { describe, expect, it } from "vitest";
import {
    formatFormatterExampleResult,
    getFormatterCardLabel,
    getFormatterImportStatement,
} from "./formatter-view";

describe("formatter-view helpers", () => {
    it("returns the right formatter card labels", () => {
        expect(getFormatterCardLabel("parseNumber")).toBe("Parser");
        expect(getFormatterCardLabel("registerWithMasks")).toBe("React Hook Form");
        expect(getFormatterCardLabel("formatValuta")).toBe("Formatter");
    });

    it("builds formatter import statements", () => {
        expect(getFormatterImportStatement("formatValuta", "@fremtind/jokul/utilities")).toBe(
            'import { formatValuta } from "@fremtind/jokul/utilities";',
        );
    });

    it("decodes escaped non-breaking spaces in formatter results", () => {
        expect(formatFormatterExampleResult("12\\u00A0345\\u00A0kr")).toBe("12\u00A0345\u00A0kr");
    });
});
