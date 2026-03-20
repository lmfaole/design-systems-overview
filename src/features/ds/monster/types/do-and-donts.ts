import type { ReactNode } from "react";

/**
 * A single "do" or "don't" recommendation shown on a pattern page.
 */
export interface PatternDoAndDontsItem {
    /**
     * Short recommendation heading.
     */
    title: string;
    /**
     * Supporting explanation for why this recommendation exists.
     */
    description: ReactNode;
}

/**
 * Guidance for what teams should do and avoid when using a pattern.
 */
export interface PatternDoAndDonts {
    /**
     * Recommended ways to apply the pattern.
     */
    dos: PatternDoAndDontsItem[];
    /**
     * Common mistakes or anti-patterns to avoid.
     */
    donts: PatternDoAndDontsItem[];
}
