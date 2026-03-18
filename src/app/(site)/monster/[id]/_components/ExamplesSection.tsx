import type { PatternPost } from "@/app/monster/data";
import { VariantGrid } from "./VariantGrid";

interface ExamplesSectionProps {
    examples: PatternPost["examples"];
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
    return (
        <VariantGrid
            title="Eksempler"
            titleId="eksempler"
            emptyText="HTML-varianter kommer."
            examples={examples}
        />
    );
}
