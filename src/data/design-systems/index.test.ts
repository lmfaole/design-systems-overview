import { describe, expect, it } from "vitest";
import {
    getDesignSystem,
    getExternalOnlyDesignSystems,
    getPlannedDesignSystems,
    getDesignSystemCoverageKindLabels,
    getInstallGuideCountLabel,
    validateDesignSystemLocalDocs,
} from ".";
import { jokulLocalDocs } from "./systems/jokul/docs";

describe("design system catalog", () => {
    it("contains Aksel and Jøkul as scalable local documentation targets", () => {
        const aksel = getDesignSystem("aksel");
        const jokul = getDesignSystem("jokul");

        expect(aksel?.localDocumentation?.status).toBe("planned");
        expect(jokul?.localDocumentation?.status).toBe("documented");
        expect(aksel?.localDocumentation?.basePath).toBe("/ds/aksel");
        expect(jokul?.localDocumentation?.basePath).toBe("/ds/jokul");
    });

    it("captures broad asset coverage for Jøkul", () => {
        const jokul = getDesignSystem("jokul");

        expect(jokul).toBeDefined();
        expect(getDesignSystemCoverageKindLabels(jokul!)).toEqual(expect.arrayContaining([
            "Komponenter",
            "Formattere",
            "Hooks",
            "Mixins",
            "Designtokens",
            "Ikoner",
        ]));
        expect(getInstallGuideCountLabel(jokul!)).toBe("2 installasjonsguider");
    });

    it("keeps external-only systems separate from planned local systems", () => {
        const plannedSlugs = getPlannedDesignSystems().map((system) => system.slug);
        const externalSlugs = getExternalOnlyDesignSystems().map((system) => system.slug);

        expect(plannedSlugs).toContain("aksel");
        expect(plannedSlugs).not.toContain("jokul");
        expect(externalSlugs).toContain("designsystemet");
    });

    it("marks the first Jøkul component and token section as documented", () => {
        const jokul = getDesignSystem("jokul");
        const componentSection = jokul?.catalog.find((section) => section.slug === "komponenter");
        const tokenSection = jokul?.catalog.find((section) => section.slug === "tokens");

        expect(componentSection?.status).toBe("documented");
        expect(componentSection?.items?.[0]?.localPath).toBe("/ds/jokul/komponenter/button");
        expect(tokenSection?.status).toBe("documented");
        expect(tokenSection?.items?.[0]?.localPath).toBe("/ds/jokul/tokens/spacing");
    });

    it("keeps documented local docs aligned with the catalog and page contract", () => {
        const jokul = getDesignSystem("jokul");

        expect(jokul).toBeDefined();
        expect(validateDesignSystemLocalDocs(jokul!, jokulLocalDocs)).toEqual([]);
    });
});
