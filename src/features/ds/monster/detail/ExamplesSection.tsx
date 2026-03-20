import type { PatternPost } from "@/data/monster/patterns";
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
