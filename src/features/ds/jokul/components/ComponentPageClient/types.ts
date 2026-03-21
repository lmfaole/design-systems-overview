import type { Migration } from "@/features/ds/jokul/_component-docs/data";
import type { ComponentComplexityRating } from "@/features/ds/jokul/_component-docs/docs/types";
import type { PatternComponentBacklink } from "@/data/monster/patterns";

export interface ComplexityRowProps {
    rating: ComponentComplexityRating;
    note?: string;
}

export interface MigrationSectionProps {
    migrations: Migration[];
}

export interface RelatedPatternsSectionProps {
    patterns: PatternComponentBacklink[];
}

export interface ComponentPageClientProps {
    id: string;
    relatedPatterns: PatternComponentBacklink[];
}
