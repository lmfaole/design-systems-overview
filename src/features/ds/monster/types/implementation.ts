import type { ReactNode } from "react";

/**
 * Required label for the baseline implementation that every pattern must start with.
 */
export const BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM = "HTML, CSS og JS";

/**
 * One step in a concrete implementation guide for a design system.
 */
export interface PatternImplementationGuideStep {
    /**
     * Short step heading used in the ordered implementation guide.
     */
    title: string;
    /**
     * Detailed explanation of what the team should do in this step.
     */
    description: ReactNode;
}

/**
 * A component reference used by a design-system-specific implementation.
 */
export interface PatternImplementationComponentReference {
    /**
     * Human-readable component name shown in the implementation section.
     */
    title: string;
    /**
     * Internal or external documentation URL for the component.
     */
    href: string;
}

/**
 * A complete implementation path for one specific design system.
 */
export interface PatternImplementation {
    /**
     * Name of the design system this implementation applies to, for example "Jøkul".
     * The first implementation on every pattern must use
     * {@link BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM}.
     */
    designSystem: string;
    /**
     * Short heading for this implementation variant.
     */
    title: string;
    /**
     * Introductory explanation of how the pattern should be approached in this design system.
     * Can include links or inline emphasis.
     */
    description: ReactNode;
    /**
     * Rendered examples that demonstrate the implementation in context.
     * Each example module must import the packages, scripts, and styles
     * required for the rendered example to work correctly.
     * Prefer a local stylesheet that @use:s the required design-system styles.
     * Include the design system's webfonts when the example depends on icon
     * fonts or branded typefaces, for example Jøkul's webfonts.scss.
     * Vanilla implementations must include their own local CSS and JS helpers
     * instead of relying on unrelated page-level side effects.
     */
    liveExamples: ReactNode[];
    /**
     * Component documentation references for the components used in this implementation.
     */
    components: PatternImplementationComponentReference[];
    /**
     * Ordered guide describing how to build the implementation step by step.
     */
    steps: PatternImplementationGuideStep[];
}
