import type { ComponentType } from "react";

/**
 * Lightweight visual signature for a pattern page.
 */
export interface PatternIllustration {
    /**
     * Accessible label announced if the illustration is exposed as an image in the UI.
     * Leave it empty only when the illustration is purely decorative.
     */
    label?: string;
    /**
     * Illustration component rendered in the overview and on the pattern page.
     * Keep it lightweight and self-contained, typically as a small inline SVG,
     * so it also works when passed directly to the PageHeader background API.
     */
    component: ComponentType;
}
