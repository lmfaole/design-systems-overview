import type { ReactNode } from "react";

/**
 * A single accessibility concern that should be called out on a pattern page.
 */
export interface PatternAccessibilityConcern {
    /**
     * Short heading used in the accessibility section.
     */
    title: string;
    /**
     * Explanatory copy describing what to watch out for and why it matters.
     * Can contain links or inline emphasis.
     */
    description: ReactNode;
}
