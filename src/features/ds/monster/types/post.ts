import type { PatternAccessibilityConcern } from "./accessibility";
import type { PatternDoAndDonts } from "./do-and-donts";
import type { PatternIllustration } from "./illustration";
import type { PatternImplementation } from "./implementation";
import type { PatternFurtherReadingItem } from "./resources";

/**
 * Top-level classification used to group pattern pages in the overview and search.
 */
export type PatternCategory = "handlinger" | "navigasjon" | "tilbakemelding" | "struktur";

/**
 * Display labels for each pattern category.
 */
export const PATTERN_CATEGORY_LABELS: Record<PatternCategory, string> = {
    handlinger: "Handlinger",
    navigasjon: "Navigasjon",
    tilbakemelding: "Tilbakemelding",
    struktur: "Struktur",
};

/**
 * Content model for a Monster pattern page.
 */
export interface PatternPost {
    /**
     * Stable route id for the pattern page.
     */
    id: number;
    /**
     * Pattern title shown in listings, breadcrumbs, and the detail page.
     */
    title: string;
    /**
     * Category used for grouping and filtering the pattern.
     */
    category: PatternCategory;
    /**
     * Short summary used in page metadata, overview cards, and search.
     */
    description: string;
    /**
     * Visual signature shown in pattern listings and on the pattern page itself.
     */
    illustration: PatternIllustration;
    /**
     * Recommended and discouraged ways to use the pattern.
     */
    doAndDonts: PatternDoAndDonts;
    /**
     * Accessibility issues, edge cases, and requirements readers should know about.
     */
    accessibilityConcerns: PatternAccessibilityConcern[];
    /**
     * One or more implementation guides for the pattern.
     * The first entry must always cover a baseline implementation using only
     * HTML, CSS, and JavaScript before any design-system-specific variants.
     */
    implementation: PatternImplementation[];
    /**
     * Supporting links for readers who want to go deeper after the pattern page.
     */
    furtherReading: PatternFurtherReadingItem[];
}
