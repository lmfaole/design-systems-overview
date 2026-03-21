import type { PatternImplementation } from "@/features/ds/monster/types";
import { PatternImplementationCard } from "./components";
import { MONSTER_PATTERN_SECTIONS } from "./sections";
import "./ImplementationSection.scss";

interface ImplementationSectionProps {
    implementations: PatternImplementation[];
}

export function ImplementationSection({ implementations }: ImplementationSectionProps) {
    if (implementations.length === 0) return null;

    return (
        <section
            className="monster-section"
            aria-labelledby={MONSTER_PATTERN_SECTIONS.implementation.id}
        >
            <h2 id={MONSTER_PATTERN_SECTIONS.implementation.id}>
                {MONSTER_PATTERN_SECTIONS.implementation.label}
            </h2>
            <ul className="ds-grid monster-implementation-list">
                {implementations.map((implementation) => (
                    <PatternImplementationCard
                        key={`${implementation.designSystem}-${implementation.title}`}
                        implementation={implementation}
                    />
                ))}
            </ul>
        </section>
    );
}
