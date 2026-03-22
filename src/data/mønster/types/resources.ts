/**
 * A supporting resource linked from the "further reading" section of a pattern page.
 */
export interface PatternFurtherReadingItem {
    /**
     * Link text shown to the reader.
     */
    title: string;
    /**
     * Destination URL for the resource.
     */
    href: string;
    /**
     * Optional supporting context about why the resource is useful.
     */
    description?: string;
}
