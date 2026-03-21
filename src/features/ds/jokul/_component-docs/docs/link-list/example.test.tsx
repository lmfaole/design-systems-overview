import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buildExampleControls } from "../../utils/example-controls";
import doc from "./index";

function getControlDefaultValue(control: ReturnType<typeof buildExampleControls>[number]) {
    switch (control.kind) {
        case "boolean":
            return control.defaultValue ?? false;
        case "select": {
            const firstOption = control.options[0];
            return control.defaultValue ?? (typeof firstOption === "string" ? firstOption : firstOption?.value);
        }
        case "multiselect":
            return control.defaultValue ?? [];
        case "text":
            return control.defaultValue ?? "";
        case "number":
            return control.defaultValue ?? control.min ?? 0;
        case "json":
            return control.defaultValue ?? "{}";
    }
}

function renderExample(overrides: Record<string, unknown> = {}) {
    if (typeof doc.example !== "function") {
        throw new Error("Link List docs example must stay interactive");
    }

    const controls = doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig);
    const defaultProps = Object.fromEntries(
        controls.map((control) => [control.name, getControlDefaultValue(control)]),
    );

    return renderToStaticMarkup(
        createElement(Fragment, null, doc.example({...defaultProps, ...overrides})),
    );
}

describe("Link List docs example", () => {
    it("shows the configured default label", () => {
        const markup = renderExample();

        expect(markup).toContain(">Forsikringer<");
        expect(markup).not.toContain("hidden=\"\"");
    });

    it("applies the label prop from the example controls", () => {
        const markup = renderExample({ label: "Skademeldinger" });

        expect(markup).toContain(">Skademeldinger<");
        expect(markup).not.toContain(">Forsikringer<");
    });

    it("applies the hideLabel prop from the example controls", () => {
        const markup = renderExample({ hideLabel: true });

        expect(markup).toContain(">Forsikringer<");
        expect(markup).toContain("hidden=\"\"");
    });
});
