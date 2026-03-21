import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentExampleControl } from "@/features/ds/jokul/_component-docs/docs/types";
import { ComponentExample } from "./ComponentExample";

const componentExampleSource = readFileSync(
    path.resolve(process.cwd(), "src/features/ds/jokul/_component-docs/components/ComponentExample/ComponentExample.tsx"),
    "utf8",
);

describe("ComponentExample", () => {
    it("renders native controls and native popovers for the example chrome", () => {
        const controls: ComponentExampleControl[] = [
            { name: "disabled", kind: "boolean", defaultValue: true },
            { name: "label", kind: "text", defaultValue: "Send inn" },
            { name: "count", kind: "number", defaultValue: 3 },
            { name: "variant", kind: "select", options: ["primary", "secondary"], defaultValue: "primary" },
            {
                name: "layout.breakpoints",
                kind: "select",
                options: ["mobile", "desktop"],
                defaultValue: "mobile",
            },
            { name: "metadata", kind: "json", defaultValue: "{\"status\":\"ok\"}" },
        ];

        const html = renderToStaticMarkup(
            <ComponentExample controls={controls}>
                {(props) => <button type="button">{String(props.disabled)}</button>}
            </ComponentExample>,
        );

        expect(html).toContain('type="checkbox"');
        expect(html).toContain('data-variant="switch"');
        expect(html).toContain('type="text"');
        expect(html).toContain('type="number"');
        expect(html).toContain('data-panel="controls"');
        expect(html).toContain('data-panel="preview"');
        expect(html).toContain(">Visning<");
        expect(html).toContain(">Props<");
        expect(html).not.toContain(">Valg<");
    });

    it("stays free of design-system-specific UI imports", () => {
        expect(componentExampleSource).not.toContain('@fremtind/jokul/');
        expect(componentExampleSource).not.toContain('className="select"');
        expect(componentExampleSource).not.toContain('className="text-field"');
        expect(componentExampleSource).not.toContain("site-control");
        expect(componentExampleSource).not.toContain("site-button");
        expect(componentExampleSource).toContain('data-panel="controls"');
        expect(componentExampleSource).toContain('data-panel-scroll=""');
        expect(componentExampleSource).toContain('<h3>Visning</h3>');
        expect(componentExampleSource).toContain('<h3>Props</h3>');
        expect(componentExampleSource).toContain("ResizeObserver");
        expect(componentExampleSource).toContain("--component-example-preview-block-size");
    });
});
