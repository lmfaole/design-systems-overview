import type { PatternPost } from "@/data/monster/patterns";
import { PatternFeatureList } from "./components";
import { MONSTER_PATTERN_SECTIONS } from "./sections";

interface AccessibilitySectionProps {
    concerns: PatternPost["accessibilityConcerns"];
}

export function AccessibilitySection({ concerns }: AccessibilitySectionProps) {
    if (concerns.length === 0) return null;

    return (
        <section
            className="monster-section"
            aria-labelledby={MONSTER_PATTERN_SECTIONS.accessibility.id}
        >
            <h2 id={MONSTER_PATTERN_SECTIONS.accessibility.id}>
                {MONSTER_PATTERN_SECTIONS.accessibility.label}
            </h2>
            <PatternFeatureList
                items={concerns.map((item) => ({
                    title: item.title,
                    description: item.description,
                }))}
                tone="accent"
            />
        </section>
    );
}
