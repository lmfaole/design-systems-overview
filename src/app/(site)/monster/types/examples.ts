import type React from "react";

export type PatternExampleVariantKind = "html" | "jokul";

export interface PatternExampleVariant {
    label: string;
    kind: PatternExampleVariantKind;
    howTo?: React.ReactNode;
    description?: React.ReactNode;
    code: string;
    Example: React.ComponentType;
}

export interface PatternExample {
    title: string;
    description?: React.ReactNode;
    variants: PatternExampleVariant[];
}

export interface PatternAvoidExample {
    title: string;
    description?: React.ReactNode;
    variants: PatternExampleVariant[];
}
