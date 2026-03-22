/**
 * Required label for the baseline implementation that every pattern must start with.
 */
export const BASE_PATTERN_IMPLEMENTATION_DESIGN_SYSTEM = "HTML, CSS og JS";

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
     * Name of the design system or implementation context this variant applies to.
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
     * Stored as trusted HTML because some descriptions include inline links or code.
     */
    descriptionHtml: string;
    /**
     * Rendered example-card markup that demonstrates the implementation in context.
     */
    liveExamples: string[];
    /**
     * Component documentation references for the components used in this implementation.
     */
    components: PatternImplementationComponentReference[];
}
