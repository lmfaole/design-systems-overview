import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const componentRouteSource = readFileSync(
    path.resolve(process.cwd(), "src/pages/ds/jokul/component/[id].astro"),
    "utf8",
);

describe("Jøkul component detail route", () => {
    it("pre-renders the detail page and hydrates it instead of shipping an empty client-only shell", () => {
        expect(componentRouteSource).toContain("export function getStaticPaths()");
        expect(componentRouteSource).toContain("return componentDocs.map((doc) => ({");
        expect(componentRouteSource).toContain("<ComponentPageClient id={doc.id} relatedPatterns={relatedPatterns} client:load />");
        expect(componentRouteSource).not.toContain('client:only="react"');
    });
});
