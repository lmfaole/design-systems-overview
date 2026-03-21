import {tokens as publicTokens} from "@fremtind/jokul/core";

export interface DocumentedPublicToken {
    exportPaths: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getPublicTokenValue(path: string): string {
    const value = path.split(".").reduce<unknown>((current, segment) => {
        if (!isRecord(current) || !(segment in current)) {
            throw new Error(`Unknown Jøkul token path "${path}"`);
        }

        return current[segment];
    }, publicTokens);

    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
        throw new Error(`Jøkul token path "${path}" does not resolve to a leaf value`);
    }

    return String(value);
}

export function flattenPublicTokenPaths(node: unknown = publicTokens, prefix: string[] = []): string[] {
    if (!isRecord(node)) {
        return [prefix.join(".")];
    }

    return Object.entries(node).flatMap(([key, value]) =>
        flattenPublicTokenPaths(value, [...prefix, key]),
    );
}

export const publicTokenExportPaths = flattenPublicTokenPaths().sort((a, b) =>
    a.localeCompare(b, "nb"),
);

export function formatPublicTokenPath(path: string): string {
    return `tokens.${path}`;
}
