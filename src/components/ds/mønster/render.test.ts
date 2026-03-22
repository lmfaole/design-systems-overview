import { describe, expect, it } from "vitest";
import { getPatternPost } from "@/data/mønster/patterns";
import { serializePatternPost } from "./render";

describe("mønster render helpers", () => {
    it("serializes implementation descriptions and live examples to static html", () => {
        const post = getPatternPost("bekreftelse-etter-handling");

        expect(post).toBeDefined();

        const serialized = serializePatternPost(post!);

        expect(serialized.implementation[0]?.descriptionHtml).toContain("Start med en synlig tekstlig status");
        expect(serialized.implementation[0]?.liveExamplesHtml[0]).toContain("Bekreft lagring i samme flate");
    });

    it("serializes further reading descriptions when present", () => {
        const post = getPatternPost("status-i-oppdatert-region");

        expect(post).toBeDefined();

        const serialized = serializePatternPost(post!);
        const describedResource = serialized.furtherReading.find((item) => item.descriptionHtml);

        expect(describedResource?.descriptionHtml).toContain("statusoppdateringer");
    });

    it("namespaces ids across serialized live examples to avoid duplicate ids on the page", () => {
        const post = getPatternPost("fremdrift-ved-venting");

        expect(post).toBeDefined();

        const serialized = serializePatternPost(post!);
        const ids = serialized.implementation
            .flatMap((implementation) => implementation.liveExamplesHtml)
            .flatMap((html) => Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]));

        expect(ids.length).toBeGreaterThan(0);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("rewrites aria and hash references to the namespaced live example ids", () => {
        const post = getPatternPost("fremdrift-ved-venting");

        expect(post).toBeDefined();

        const serialized = serializePatternPost(post!);
        const markup = serialized.implementation
            .flatMap((implementation) => implementation.liveExamplesHtml)
            .join("\n");
        const ids = new Set(Array.from(markup.matchAll(/\sid="([^"]+)"/g), (match) => match[1]));
        const referencedIds = Array.from(markup.matchAll(/\s(?:aria-labelledby|aria-describedby|aria-controls|aria-owns|for)="([^"]+)"/g))
            .flatMap((match) => match[1].split(/\s+/u))
            .filter(Boolean);
        const hashTargets = Array.from(markup.matchAll(/href="#([^"]+)"/g), (match) => match[1]);

        expect(referencedIds.length + hashTargets.length).toBeGreaterThan(0);
        expect(referencedIds.every((id) => ids.has(id))).toBe(true);
        expect(hashTargets.every((id) => ids.has(id))).toBe(true);
        expect(Array.from(ids).every((id) => id.startsWith("mønster-example-"))).toBe(true);
    });
});
