import { describe, expect, it } from "vitest";
import {
    createInteractiveExample,
    getInteractiveExampleDefaultValues,
    getInteractiveExampleInitialState,
} from ".";

describe("design-system playground helpers", () => {
    it("creates all discrete states and resolves the default state", () => {
        const interactive = createInteractiveExample(
            [
                {
                    kind: "select",
                    name: "variant",
                    label: "Variant",
                    defaultValue: "primary",
                    options: [
                        { value: "primary", label: "Primary" },
                        { value: "secondary", label: "Secondary" },
                    ],
                },
                {
                    kind: "boolean",
                    name: "disabled",
                    label: "Disabled",
                    defaultValue: false,
                },
            ],
            (values) => ({
                previewHtml: `<button${values.disabled ? " disabled" : ""}>${values.variant}</button>`,
                codeExamples: [
                    {
                        label: "React",
                        language: "tsx",
                        code: `<Button variant="${values.variant}"${values.disabled ? " disabled" : ""} />`,
                    },
                ],
            }),
        );

        expect(interactive.states).toHaveLength(4);
        expect(getInteractiveExampleDefaultValues(interactive.controls)).toEqual({
            variant: "primary",
            disabled: false,
        });

        const initialState = getInteractiveExampleInitialState(interactive);

        expect(initialState?.previewHtml).toContain(">primary</button>");
        expect(initialState?.codeExamples[0]?.code).toContain('variant="primary"');
        expect(initialState?.codeExamples[0]?.code).not.toContain("disabled");
    });
});
