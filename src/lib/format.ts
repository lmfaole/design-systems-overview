/**
 * Converts a kebab-case component ID to PascalCase display name.
 * e.g. "description-list" → "DescriptionList", "text-input" → "TextInput"
 */
export function toPascalCase(id: string): string {
    return id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

/**
 * Converts a string to a URL-safe slug for use as an anchor ID.
 * e.g. "Grunnleggende kort" → "grunnleggende-kort"
 */
export function slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
