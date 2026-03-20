/**
 * A tiny "good enough" TypeScript type parser for our docs.
 *
 * We only need to:
 * - split parameter lists and object literal fields at top-level (ignoring nested generics/objects)
 * - extract function parameters + return type for callback-like props
 *
 * This is intentionally not a full TS parser; if the docs start relying on more
 * complex type expressions, prefer storing structured data instead of strings.
 */

export type ParsedField = { name: string; type: string; optional: boolean };

export function isObjectLiteralType(type: string): boolean {
    const trimmed = type.trim();
    return trimmed.startsWith("{") && trimmed.endsWith("}");
}

export function splitTopLevel(input: string, separators: string[]): string[] {
    const parts: string[] = [];
    let start = 0;
    let braceDepth = 0;
    let bracketDepth = 0;
    let parenDepth = 0;
    let angleDepth = 0;

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "{") braceDepth++;
        else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
        else if (ch === "[") bracketDepth++;
        else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1);
        else if (ch === "(") parenDepth++;
        else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
        else if (ch === "<") angleDepth++;
        else if (ch === ">") angleDepth = Math.max(0, angleDepth - 1);

        const atTopLevel = braceDepth === 0 && bracketDepth === 0 && parenDepth === 0 && angleDepth === 0;
        if (atTopLevel && separators.includes(ch)) {
            parts.push(input.slice(start, i).trim());
            start = i + 1;
        }
    }

    parts.push(input.slice(start).trim());
    return parts.filter(Boolean);
}

/**
 * Parse a simple object-literal type: `{ foo?: string; bar: number }`.
 * Limitation: doesn't handle mapped types, index signatures, or destructuring.
 */
export function parseObjectLiteralFields(type: string): ParsedField[] {
    const trimmed = type.trim();
    if (!isObjectLiteralType(trimmed)) return [];

    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];

    return splitTopLevel(inner, [";", ","]).flatMap((part) => {
        // Find the first ":" at top-level for this field.
        let idx = -1;
        let braceDepth = 0;
        let bracketDepth = 0;
        let parenDepth = 0;
        let angleDepth = 0;

        for (let i = 0; i < part.length; i++) {
            const ch = part[i];
            if (ch === "{") braceDepth++;
            else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
            else if (ch === "[") bracketDepth++;
            else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1);
            else if (ch === "(") parenDepth++;
            else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
            else if (ch === "<") angleDepth++;
            else if (ch === ">") angleDepth = Math.max(0, angleDepth - 1);

            const atTopLevel = braceDepth === 0 && bracketDepth === 0 && parenDepth === 0 && angleDepth === 0;
            if (atTopLevel && ch === ":") {
                idx = i;
                break;
            }
        }

        if (idx === -1) return [];

        const rawName = part.slice(0, idx).trim();
        const rawType = part.slice(idx + 1).trim();
        const optional = rawName.endsWith("?");
        const name = optional ? rawName.slice(0, -1).trim() : rawName;
        if (!name || !rawType) return [];
        return [{ name, type: rawType, optional }];
    });
}

export function summarizeObjectLiteralType(type: string): string {
    const fields = parseObjectLiteralFields(type);
    if (fields.length === 0) return "{…}";
    const label = fields
        .slice(0, 3)
        .map((f) => `${f.name}${f.optional ? "?" : ""}`)
        .join(", ");
    return fields.length > 3 ? `{ ${label}, … }` : `{ ${label} }`;
}

/**
 * Extract parameters from a function type string.
 * Example: `(value: string, options?: { foo: number }) => void`
 */
export function extractFunctionParams(type: string): ParsedField[] {
    const openIdx = type.indexOf("(");
    if (openIdx === -1) return [];

    // Find the matching ")"
    let closeIdx = -1;
    let parenDepth = 0;
    for (let i = openIdx; i < type.length; i++) {
        const ch = type[i];
        if (ch === "(") parenDepth++;
        if (ch === ")") {
            parenDepth--;
            if (parenDepth === 0) {
                closeIdx = i;
                break;
            }
        }
    }

    if (closeIdx === -1) return [];

    const inner = type.slice(openIdx + 1, closeIdx).trim();
    if (!inner) return [];

    return splitTopLevel(inner, [","]).flatMap((part) => {
        // Find ":" at top-level for parameter. Parameters can include object/union types.
        let idx = -1;
        let braceDepth = 0;
        let bracketDepth = 0;
        let parenDepth2 = 0;
        let angleDepth = 0;

        for (let i = 0; i < part.length; i++) {
            const ch = part[i];
            if (ch === "{") braceDepth++;
            else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
            else if (ch === "[") bracketDepth++;
            else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1);
            else if (ch === "(") parenDepth2++;
            else if (ch === ")") parenDepth2 = Math.max(0, parenDepth2 - 1);
            else if (ch === "<") angleDepth++;
            else if (ch === ">") angleDepth = Math.max(0, angleDepth - 1);

            const atTopLevel = braceDepth === 0 && bracketDepth === 0 && parenDepth2 === 0 && angleDepth === 0;
            if (atTopLevel && ch === ":") {
                idx = i;
                break;
            }
        }

        if (idx === -1) return [];

        const rawName = part.slice(0, idx).trim().replace(/^\.{3}/, "");
        const rawType = part.slice(idx + 1).trim();
        const optional = rawName.endsWith("?");
        const name = optional ? rawName.slice(0, -1).trim() : rawName;
        if (!name || !rawType) return [];
        return [{ name, type: rawType, optional }];
    });
}

/**
 * Extract the return type from a function type string.
 * We only look for a top-level `=>` so nested arrows inside param types are ignored.
 */
export function extractFunctionReturnType(type: string): string | null {
    let braceDepth = 0;
    let bracketDepth = 0;
    let parenDepth = 0;
    let angleDepth = 0;

    for (let i = 0; i < type.length - 1; i++) {
        const ch = type[i];
        const next = type[i + 1];

        if (ch === "{") braceDepth++;
        else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
        else if (ch === "[") bracketDepth++;
        else if (ch === "]") bracketDepth = Math.max(0, bracketDepth - 1);
        else if (ch === "(") parenDepth++;
        else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
        else if (ch === "<") angleDepth++;
        else if (ch === ">") angleDepth = Math.max(0, angleDepth - 1);

        const atTopLevel = braceDepth === 0 && bracketDepth === 0 && parenDepth === 0 && angleDepth === 0;
        if (atTopLevel && ch === "=" && next === ">") {
            return type.slice(i + 2).trim() || null;
        }
    }

    return null;
}

