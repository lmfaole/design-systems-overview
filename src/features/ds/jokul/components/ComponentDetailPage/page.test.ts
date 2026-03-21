import { describe, expect, it } from "vitest";
import type { Migration } from "@/data/jokul/component-docs";
import {
    createDetailTocItems,
    createMigrationEntries,
    formatComplexity,
    getExampleHydrationMode,
    getStatusLabel,
} from "./page";

const migrations: Migration[] = [
    {
        title: "help",
        deprecates: { name: "Help" },
        before: "<Help />",
        after: "<Tooltip />",
    },
    {
        title: "help-inline",
        deprecates: { name: "Help" },
        before: "<Help inline />",
        after: "<Tooltip inline />",
    },
];

describe("ComponentDetailPage helpers", () => {
    it("creates stable migration anchor ids for repeated deprecated names", () => {
        expect(createMigrationEntries(migrations)).toEqual([
            expect.objectContaining({
                anchorId: "migration-Help-alt-1",
                displayName: "Help (valg 1)",
            }),
            expect.objectContaining({
                anchorId: "migration-Help-alt-2",
                displayName: "Help (valg 2)",
            }),
        ]);
    });

    it("builds a table of contents from the available sections", () => {
        expect(createDetailTocItems({
            hasExample: true,
            hasPatterns: true,
            hasRequires: false,
            hasMigrations: true,
            hasSubcomponents: false,
            hasAlternatives: true,
            hasSiblings: true,
            siblingsLabel: "andre-komponenter",
            hasRelated: false,
        })).toEqual([
            { id: "eksempel", label: "Eksempel" },
            { id: "monster-monstre", label: "Brukes i mønstre" },
            { id: "props", label: "Props" },
            { id: "migrering", label: "Migreringsguider" },
            { id: "alternativer", label: "Alternativer" },
            { id: "andre-komponenter", label: "Relaterte søsken" },
            { id: "metadata", label: "Metadata" },
        ]);
    });

    it("formats metadata labels", () => {
        expect(getStatusLabel("stable")).toBe("Stabil");
        expect(getStatusLabel("beta")).toBe("Beta");
        expect(getStatusLabel("deprecated")).toBe("Deprecated");
        expect(formatComplexity("medium", "Krever litt oppsett")).toBe("Middels (Krever litt oppsett)");
        expect(formatComplexity("easy")).toBe("Enkel");
    });

    it("server-renders SSR-safe examples and keeps known tabs examples client-only", () => {
        expect(getExampleHydrationMode("button")).toBe("load");
        expect(getExampleHydrationMode("select")).toBe("load");
        expect(getExampleHydrationMode("nav-tab")).toBe("only");
        expect(getExampleHydrationMode("tabs")).toBe("only");
    });
});
