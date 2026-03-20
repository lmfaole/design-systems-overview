/**
 * A single deprecated or replacement item in a {@link Migration}.
 */
export interface MigrationItem {
    /** The exact name as it appears in JSX or an import statement. */
    name: string;
}

/**
 * A self-contained migration guide for a single deprecated API pattern.
 * Describes what changed, why, and shows a before/after code comparison.
 *
 * Each migration must describe exactly one deprecated prop or component.
 * Split unrelated deprecations into separate Migration entries.
 */
export interface Migration {
    /** The prop or component name used as the heading, e.g. `"iconLeft"` or `"InfoSystemMessage"`. */
    title: string;

    /**
     * One or two sentences explaining *why* this was deprecated —
     * the reasoning or design decision behind the change.
     * The before/after code shows *how* to migrate; this explains *why*.
     * Omit if no meaningful context exists beyond the code itself.
     */
    description?: string;

    /**
     * The single prop or component being deprecated.
     * See {@link MigrationItem} for the shape.
     * e.g. `{ name: "iconLeft", kind: "prop" }`
     *   or `{ name: "InfoSystemMessage", kind: "component" }`
     */
    deprecates: MigrationItem;

    /**
     * The props or components that replace the deprecated one.
     * Each entry follows the {@link MigrationItem} shape.
     * Omit entirely when the deprecated item is simply removed with no replacement.
     * e.g. `[{ name: "icon", kind: "prop" }, { name: "iconPosition", kind: "prop" }]`
     */
    replacedBy?: MigrationItem[];

    /**
     * The deprecated code snippet ("before").
     * Write as valid JSX, imports excluded. Use 4-space indentation.
     */
    before: string;

    /**
     * The replacement code snippet ("after").
     * Write as valid JSX, imports excluded. Use 4-space indentation.
     */
    after: string;
}
