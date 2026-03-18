/**
 * Lifecycle status of a prop or component.
 *
 * - `"stable"`       — Production-ready and unlikely to change.
 * - `"experimental"` — Available but the API may change before stabilising.
 * - `"deprecated"`   — Still works but will be removed in a future major release.
 *                      Always pair with a `statusDescription` explaining the migration path.
 */
export type PropStatus = "stable" | "deprecated" | "experimental";

/**
 * Origin of a prop — used to communicate where the prop comes from so
 * consumers know whether it is a Jøkul-specific concern or a pass-through.
 *
 * - `"custom"`  — A prop defined by the Jøkul component itself (e.g. `variant`, `errorLabel`).
 * - `"native"`  — A standard HTML attribute forwarded to the underlying DOM element
 *                 (e.g. `disabled`, `aria-label`, `className`).
 * - `"aria"`    — An ARIA attribute required or recommended for accessibility
 *                 (e.g. `aria-describedby`, `role`).
 * - `"react"`   — A React-specific prop (e.g. `children`, `ref`, `key`).
 */
export type PropSource = "custom" | "native" | "aria" | "react";

/**
 * Documents a single prop (or HTML attribute) accepted by a component or sub-component.
 */
export interface PropDef {
    /** Prop name as it appears in JSX, e.g. `"variant"` or `"aria-label"`. */
    name: string;

    /**
     * TypeScript type written as a human-readable string, e.g.:
     * - `"string"`
     * - `'"primary" | "secondary" | "ghost"'`
     * - `"React.ReactNode"`
     * - `"(value: string) => void"`
     */
    type: string;

    /** Whether the prop must be provided. If false, document a sensible `default`. */
    required: boolean;

    /**
     * The value used when the prop is omitted.
     * Always a string representation, e.g. `"false"`, `'"bottom-start"'`, `"undefined"`.
     * Omit entirely when the prop is required or has no meaningful default.
     */
    default?: string;

    /**
     * Plain-language explanation of what the prop does and when to use it.
     * Should answer: "What does setting this change?" and "When should I use it?"
     * Keep to 1–3 sentences.
     */
    description: string;

    /** Where the prop originates — see {@link PropSource}. */
    source: PropSource;

    /** Lifecycle status of this prop — see {@link PropStatus}. */
    status: PropStatus;

    /**
     * Shown next to the status badge when {@link PropDef.status} is `"deprecated"` or `"experimental"`.
     * For deprecated props, always include the migration path, e.g.
     * `"Use the size prop instead. Will be removed in v12."`.
     */
    statusDescription?: string;
}
