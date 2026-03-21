import type { ReactNode } from "react";

export interface PatternFeatureListItem {
    title: ReactNode;
    description?: ReactNode;
    href?: string;
}

export interface PatternFeatureListProps {
    items: PatternFeatureListItem[];
    ordered?: boolean;
    tone?: "neutral" | "accent" | "success" | "error";
}
