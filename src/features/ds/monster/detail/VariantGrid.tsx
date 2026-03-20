import type { PatternExample, PatternAvoidExample } from "@/features/ds/monster/types";
import { getHtmlVariants } from "../_utils/getHtmlVariants";
import { ExampleCard } from "./ExampleCard";

interface VariantGridProps {
    title: string;
    titleId: string;
    emptyText: string;
    examples: Array<PatternExample | PatternAvoidExample>;
}

export function VariantGrid({ title, titleId, emptyText, examples }: VariantGridProps) {
    const htmlExamples = examples.flatMap((example) =>
        getHtmlVariants(example).map((variant, index) => ({
            key: `${example.title}-${variant.label}-${index}`,
            title: example.title,
            description: example.description,
            variant,
        })),
    );
    const columns = Math.min(4, Math.max(1, htmlExamples.length));

    return (
        <section className="monster-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{title}</h2>
            {htmlExamples.length === 0 ? (
                <p className="monster-inline-meta">{emptyText}</p>
            ) : (
                <div className="monster-grid" data-columns={columns}>
                    {htmlExamples.map((example) => (
                        <ExampleCard
                            key={example.key}
                            title={example.title}
                            description={example.description}
                            variant={example.variant}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
