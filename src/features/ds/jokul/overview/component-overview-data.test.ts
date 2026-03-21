import { describe, expect, it } from "vitest";
import { componentDocs } from "@/features/ds/jokul/_component-docs/data";
import { visibleComponentCount } from "./component-overview-data";

describe("component overview data", () => {
    it("keeps the visible overview component count in sync with the docs registry", () => {
        const visibleDocs = componentDocs.filter((doc) => doc.showOnOverview !== false);

        expect(visibleComponentCount).toBe(visibleDocs.length);
    });
});
