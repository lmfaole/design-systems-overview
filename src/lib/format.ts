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
 * e.g. "Bekreftelse på søknad" → "bekreftelse-pa-soknad"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/æ/g, "ae")
        .replace(/ø/g, "o")
        .replace(/å/g, "a")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
