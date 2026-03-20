import type { ComponentId } from "@/app/ds/_data/jokul-component-docs";
import type { PatternAccessibility } from "./accessibility";
import type { PatternDoAndDonts } from "./do-and-donts";
import type { PatternExample, PatternAvoidExample } from "./examples";
import type { PatternResource } from "./resources";

export type PatternCategory = "handlinger" | "navigasjon" | "tilbakemelding" | "struktur";

export interface PatternPost {
    id: number;
    title: string;
    category: PatternCategory;
    goals: string;
    doAndDonts?: PatternDoAndDonts;
    avoid: PatternAvoidExample[];
    examples: PatternExample[];
    accessibility: PatternAccessibility;
    resources: PatternResource[];
    components?: ComponentId[];
}
