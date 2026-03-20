import type { PatternPost } from "@/data/monster/patterns";
import { PatternDoAndDontsGrid } from "./components";
import { MONSTER_PATTERN_SECTIONS } from "./sections";

interface DoAndDontsSectionProps {
    doAndDonts: PatternPost["doAndDonts"];
}

export function DoAndDontsSection({ doAndDonts }: DoAndDontsSectionProps) {
    return (
        <section
            className="monster-section"
            aria-labelledby={MONSTER_PATTERN_SECTIONS.doAndDonts.id}
        >
            <h2 id={MONSTER_PATTERN_SECTIONS.doAndDonts.id}>
                {MONSTER_PATTERN_SECTIONS.doAndDonts.label}
            </h2>
            <PatternDoAndDontsGrid
                dos={doAndDonts.dos}
                donts={doAndDonts.donts}
            />
        </section>
    );
}
