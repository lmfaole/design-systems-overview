import { describe, expect, it } from "vitest";
import { isValidCommitMessage, normalizeCommitMessage } from "../../scripts/lib/commit-message.mjs";

describe("commit message format", () => {
    it("accepts the allowed conventional commit types", () => {
        expect(isValidCommitMessage("feat: add route smoke tests")).toBe(true);
        expect(isValidCommitMessage("fix: keep search results in the initial html")).toBe(true);
        expect(isValidCommitMessage("docs: trim redundant agent rules")).toBe(true);
        expect(isValidCommitMessage("style: tighten logical css properties")).toBe(true);
        expect(isValidCommitMessage("refactor: split search page rendering")).toBe(true);
        expect(isValidCommitMessage("test: cover formatter docs")).toBe(true);
        expect(isValidCommitMessage("chore: refresh browser smoke script")).toBe(true);
    });

    it("rejects messages outside the allowed format", () => {
        expect(isValidCommitMessage("feature: add route smoke tests")).toBe(false);
        expect(isValidCommitMessage("feat add route smoke tests")).toBe(false);
        expect(isValidCommitMessage("Feat: add route smoke tests")).toBe(false);
        expect(isValidCommitMessage("feat:")).toBe(false);
    });

    it("normalizes surrounding whitespace before validation", () => {
        expect(normalizeCommitMessage("  test: add a regression \n")).toBe("test: add a regression");
    });
});
