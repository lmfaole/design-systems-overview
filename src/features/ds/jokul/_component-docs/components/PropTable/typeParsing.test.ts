import { describe, expect, it } from "vitest";
import {
    extractFunctionParams,
    extractFunctionReturnType,
    parseObjectLiteralFields,
    splitTopLevel,
    summarizeObjectLiteralType,
} from "./typeParsing";

describe("PropTable type parsing", () => {
    it("parses inline object literal fields including optional keys", () => {
        expect(parseObjectLiteralFields("{ foo: string; bar?: number }")).toEqual([
            { name: "foo", type: "string", optional: false },
            { name: "bar", type: "number", optional: true },
        ]);
    });

    it("summarizes long object literals without losing optional markers", () => {
        expect(summarizeObjectLiteralType("{ foo: string; bar?: number; baz: boolean; qux: Date }")).toBe(
            "{ foo, bar?, baz, … }",
        );
    });

    it("extracts callback parameters and return types with nested object values", () => {
        const callback = "(value: string, options?: { immediate?: boolean; reason: string }) => Promise<void>";

        expect(extractFunctionParams(callback)).toEqual([
            { name: "value", type: "string", optional: false },
            {
                name: "options",
                type: "{ immediate?: boolean; reason: string }",
                optional: true,
            },
        ]);
        expect(extractFunctionReturnType(callback)).toBe("Promise<void>");
    });

    it("keeps nested generics and object literals intact when splitting top-level unions", () => {
        expect(
            splitTopLevel(
                'Array<{ id: string; values: string[] }> | { mode: "auto" | "manual" } | boolean',
                ["|"],
            ),
        ).toEqual([
            "Array<{ id: string; values: string[] }>",
            '{ mode: "auto" | "manual" }',
            "boolean",
        ]);
    });

    it("parses callback parameters with nested generic and function types", () => {
        const callback =
            "(next: Array<{ id: string; values: string[] }>, format?: (value: string) => string) => Promise<Array<string>>";

        expect(extractFunctionParams(callback)).toEqual([
            {
                name: "next",
                type: "Array<{ id: string; values: string[] }>",
                optional: false,
            },
            {
                name: "format",
                type: "(value: string) => string",
                optional: true,
            },
        ]);
        expect(extractFunctionReturnType(callback)).toBe("Promise<Array<string>>");
    });
});
