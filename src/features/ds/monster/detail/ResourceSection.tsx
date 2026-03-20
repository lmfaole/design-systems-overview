import type { PatternPost } from "@/data/monster/patterns";
import { PatternFeatureList } from "./components";
import { MONSTER_PATTERN_SECTIONS } from "./sections";

interface ResourceSectionProps {
    items: PatternPost["furtherReading"];
}

export function ResourceSection({ items }: ResourceSectionProps) {
    if (items.length === 0) return null;

    return (
        <section
            className="monster-section"
            aria-labelledby={MONSTER_PATTERN_SECTIONS.furtherReading.id}
        >
            <h2 id={MONSTER_PATTERN_SECTIONS.furtherReading.id}>
                {MONSTER_PATTERN_SECTIONS.furtherReading.label}
            </h2>
            <PatternFeatureList
                items={items.map((item) => ({
                    title: item.title,
                    href: item.href,
                    description: item.description,
                }))}
            />
        </section>
    );
}
