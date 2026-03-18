import type { PatternPost } from "@/app/monster/data";
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
