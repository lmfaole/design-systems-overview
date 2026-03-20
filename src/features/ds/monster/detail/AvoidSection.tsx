import type { PatternPost } from "@/data/monster/patterns";
import { VariantGrid } from "./VariantGrid";

interface AvoidSectionProps {
    avoid: PatternPost["avoid"];
}

export function AvoidSection({ avoid }: AvoidSectionProps) {
    return (
        <VariantGrid
            title="Hva du bør unngå"
            titleId="fallgruver"
            emptyText="HTML-varianter kommer."
            examples={avoid}
        />
    );
}
