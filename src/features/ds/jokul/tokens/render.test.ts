import { describe, expect, it } from "vitest";
import { getTokenPost } from "@/data/jokul/tokens";
import { serializeTokenPost } from "./render";

describe("token render helpers", () => {
    it("serializes token post illustrations and table cells to static html", () => {
        const post = getTokenPost("farger");

        expect(post).toBeDefined();

        const serialized = serializeTokenPost(post!);

        expect(serialized.illustrationHtml).toContain('data-token-illustration-bleed="true"');
        expect(serialized.tokenOverview.length).toBeGreaterThan(0);
        expect(serialized.tokenOverview[0]?.rows[0]?.[1]).toContain("<code>");
    });

    it("sorts resources by relevance and serializes their metadata", () => {
        const post = getTokenPost("farger");

        expect(post).toBeDefined();

        const serialized = serializeTokenPost(post!);

        expect(serialized.resources[0]).toMatchObject({
            title: "WCAG 2.1 — 1.4.3: Contrast (Minimum)",
            meta: "W3C/WAI · Standard",
        });
    });

    it("keeps text-on-action token previews on a contrasting action surface", () => {
        const post = getTokenPost("farger");

        expect(post).toBeDefined();

        const serialized = serializeTokenPost(post!);
        const tableMarkup = serialized.tokenOverview
            .flatMap((table) => table.rows.flat())
            .find((cell) => cell.includes("--jkl-color-text-on-action"));

        expect(tableMarkup).toContain("background:var(--jkl-color-background-action)");
    });
});
