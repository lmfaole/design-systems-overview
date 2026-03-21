import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Migration, PropDef } from "@/features/ds/jokul/_component-docs/data";
import { PropTable } from "./PropTable";

function createProp(overrides: Partial<PropDef> = {}): PropDef {
    return {
        name: "prop",
        type: "string",
        required: false,
        description: "Beskrivelse",
        source: "custom",
        status: "stable",
        ...overrides,
    };
}

function createMigration(name: string): Migration {
    return {
        title: name,
        deprecates: { name },
        before: `<Component ${name}="old" />`,
        after: `<Component ${name}="new" />`,
    };
}

function renderPropTable(props: PropDef[], migrations?: Migration[]) {
    return renderToStaticMarkup(<PropTable props={props} migrations={migrations} />);
}

describe("PropTable", () => {
    it("sorts required props before optional props while preserving their relative order", () => {
        const html = renderPropTable([
            createProp({ name: "optionalFirst", required: false }),
            createProp({ name: "requiredFirst", required: true }),
            createProp({ name: "optionalSecond", required: false }),
            createProp({ name: "requiredSecond", required: true }),
        ]);

        expect(html.indexOf("requiredFirst")).toBeLessThan(html.indexOf("requiredSecond"));
        expect(html.indexOf("requiredSecond")).toBeLessThan(html.indexOf("optionalFirst"));
        expect(html.indexOf("optionalFirst")).toBeLessThan(html.indexOf("optionalSecond"));
    });

    it("links deprecated props to their migration section when a matching migration exists", () => {
        const html = renderPropTable(
            [createProp({ name: "legacyProp", status: "deprecated", statusDescription: "Bruk newProp." })],
            [createMigration("legacyProp")],
        );

        expect(html).toContain('href="#migration-legacyProp"');
        expect(html).toContain("legacyProp");
    });

    it("does not create migration links for props without a matching deprecated migration", () => {
        const html = renderPropTable([
            createProp({ name: "currentProp", status: "stable" }),
            createProp({ name: "legacyWithoutMigration", status: "deprecated", statusDescription: "Fases ut." }),
        ]);

        expect(html).not.toContain('href="#migration-currentProp"');
        expect(html).not.toContain('href="#migration-legacyWithoutMigration"');
    });

    it("renders required flags, defaults, and status labels in the expected columns", () => {
        const html = renderPropTable([
            createProp({
                name: "requiredDeprecated",
                required: true,
                default: '"medium"',
                status: "deprecated",
            }),
            createProp({
                name: "optionalStable",
                required: false,
                status: "stable",
            }),
        ]);

        expect(html).toContain("requiredDeprecated");
        expect(html).toContain("optionalStable");
        expect(html).toContain(">Ja<");
        expect(html).toContain(">Nei<");
        expect(html).toContain("&quot;medium&quot;");
        expect(html).toContain(">deprecated<");
        expect(html).toContain(">—<");
    });

    it("formats simple union types as readable comma-separated values", () => {
        const html = renderPropTable([
            createProp({
                name: "variant",
                type: '"small" | "medium" | "large"',
            }),
        ]);

        expect(html).toContain(">small, medium, large<");
    });

    it("renders a popover trigger for shared prop aliases", () => {
        const html = renderPropTable([
            createProp({
                name: "options",
                type: "ToastOptions",
            }),
        ]);

        expect(html).toContain(">ToastOptions<");
        expect(html).toContain('aria-haspopup="dialog"');
    });

    it("renders a popover trigger for inline object types", () => {
        const html = renderPropTable([
            createProp({
                name: "settings",
                type: "{ foo: string; bar?: number }",
            }),
        ]);

        expect(html).toContain(">settings()<");
        expect(html).toContain('aria-haspopup="dialog"');
    });

    it("renders callback props as callable popover triggers", () => {
        const html = renderPropTable([
            createProp({
                name: "onChange",
                type: "(value: string) => void",
            }),
            createProp({
                name: "setValue",
                type: "Dispatch<SetStateAction<string>>",
            }),
        ]);

        expect(html).toContain(">onChange()<");
        expect(html).toContain(">setValue()<");
        expect(html.match(/aria-haspopup="dialog"/g)).toHaveLength(2);
    });

    it("renders special Gap and Layout types as popover triggers", () => {
        const html = renderPropTable([
            createProp({
                name: "gap",
                type: "Gap",
            }),
            createProp({
                name: "layout",
                type: "Layout",
            }),
        ]);

        expect(html).toContain(">Gap<");
        expect(html).toContain(">Layout<");
        expect(html.match(/aria-haspopup="dialog"/g)).toHaveLength(2);
    });
});
