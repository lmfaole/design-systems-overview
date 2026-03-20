import type React from "react";

export type WcagLevel = "A" | "AA" | "AAA";

export interface WcagRule {
    id: string;
    title: React.ReactNode;
    level: WcagLevel;
    relevance: React.ReactNode;
    url?: string;
}

export interface PatternAccessibility {
    title: string;
    description: string;
    ariaRoles: React.ReactNode[];
    wcag: WcagRule[];
    avoid: React.ReactNode[];
    testing?: React.ReactNode[];
}
