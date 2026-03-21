export type HtmlAttributes = Record<string, string | number | boolean | null | undefined>;

export type CssDeclarations = Record<string, string | number | null | undefined>;

export function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function toCssPropertyName(property: string): string {
    if (property.startsWith("--")) {
        return property;
    }

    return property.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
}

export function serializeStyle(style: CssDeclarations = {}): string {
    return Object.entries(style)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([property, value]) => `${toCssPropertyName(property)}:${String(value)}`)
        .join(";");
}

export function tag(name: string, content = "", attributes: HtmlAttributes = {}): string {
    const serializedAttributes = Object.entries(attributes)
        .flatMap(([key, value]) => {
            if (value === undefined || value === null || value === false) {
                return [];
            }

            if (value === true) {
                return [key];
            }

            return [`${key}="${escapeHtml(String(value))}"`];
        })
        .join(" ");

    if (serializedAttributes.length === 0) {
        return `<${name}>${content}</${name}>`;
    }

    return `<${name} ${serializedAttributes}>${content}</${name}>`;
}

export function text(value: string | number): string {
    return escapeHtml(String(value));
}

export function code(value: string | number, attributes: HtmlAttributes = {}): string {
    return tag("code", text(value), attributes);
}

export function strong(value: string | number, attributes: HtmlAttributes = {}): string {
    return tag("strong", text(value), attributes);
}

export function span(content: string, attributes: HtmlAttributes = {}): string {
    return tag("span", content, attributes);
}

export function joinHtml(parts: Array<string | false | null | undefined>, separator = ""): string {
    return parts.filter((part): part is string => typeof part === "string" && part.length > 0).join(separator);
}
