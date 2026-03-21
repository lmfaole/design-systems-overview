import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const dataMocks = vi.hoisted(() => ({
    getComponentDoc: vi.fn(),
}));

const controlsMocks = vi.hoisted(() => ({
    buildExampleControls: vi.fn(() => ["generated-controls"]),
}));

vi.mock("@/data/jokul/component-docs", () => dataMocks);
vi.mock("@/features/ds/jokul/_component-docs/utils/example-controls", () => controlsMocks);
vi.mock("@/features/ds/jokul/_component-docs/components/ComponentExample/ComponentExample", () => ({
    ComponentExample: ({ controls, children }: any) => (
        <section data-component-example="" data-controls={JSON.stringify(controls)}>
            {typeof children === "function" ? children({}) : children}
        </section>
    ),
}));

import { ComponentExampleIsland } from "./render";

describe("ComponentExampleIsland", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders nothing when the component does not expose a live example", () => {
        dataMocks.getComponentDoc.mockReturnValue({
            id: "button",
            example: null,
        });

        const html = renderToStaticMarkup(<ComponentExampleIsland id="button" />);

        expect(html).toBe("");
    });

    it("renders the example with generated controls when no custom controls are provided", () => {
        dataMocks.getComponentDoc.mockReturnValue({
            id: "button",
            props: [{ name: "variant" }],
            example: <div>Eksempel</div>,
            exampleControls: undefined,
            exampleControlsConfig: undefined,
        });

        const html = renderToStaticMarkup(<ComponentExampleIsland id="button" />);

        expect(html).toContain('data-component-example=""');
        expect(html).toContain('data-controls="[&quot;generated-controls&quot;]"');
        expect(controlsMocks.buildExampleControls).toHaveBeenCalledWith([{ name: "variant" }], undefined);
    });

    it("prefers explicit example controls when they are defined on the doc", () => {
        dataMocks.getComponentDoc.mockReturnValue({
            id: "button",
            props: [],
            example: <div>Eksempel</div>,
            exampleControls: ["doc-controls"],
            exampleControlsConfig: undefined,
        });

        const html = renderToStaticMarkup(<ComponentExampleIsland id="button" />);

        expect(html).toContain('data-controls="[&quot;doc-controls&quot;]"');
        expect(controlsMocks.buildExampleControls).not.toHaveBeenCalled();
    });

    it("renders function-based examples from the component docs", () => {
        dataMocks.getComponentDoc.mockReturnValue({
            id: "button",
            props: [],
            example: () => <button type="button">Eksempel fra funksjon</button>,
            exampleControls: [],
            exampleControlsConfig: undefined,
        });

        const html = renderToStaticMarkup(<ComponentExampleIsland id="button" />);

        expect(html).toContain("Eksempel fra funksjon");
    });
});
