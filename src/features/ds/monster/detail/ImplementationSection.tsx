import type { PatternPost } from "@/data/monster/patterns";
import { Grid } from "@/components/ds/Grid";
import { PatternFeatureList } from "./components";
import { MONSTER_PATTERN_SECTIONS } from "./sections";
import "./ImplementationSection.scss";

interface ImplementationSectionProps {
    implementations: PatternPost["implementation"];
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
            <Grid
                as="ul"
                columns={1}
                gap="var(--site-space-m)"
                className="monster-implementation-list"
            >
                {implementations.map((implementation) => (
                    <li
                        key={`${implementation.designSystem}-${implementation.title}`}
                        className="monster-implementation"
                    >
                        <div className="monster-implementation-copy">
                            <p className="monster-implementation-meta">
                                <strong>Designsystem:</strong> {implementation.designSystem}
                            </p>
                            <h3>{implementation.title}</h3>
                            <div>{implementation.description}</div>
                        </div>
                        {implementation.components.length > 0 && (
                            <div className="monster-implementation-group">
                                <h4>Komponenter</h4>
                                <PatternFeatureList
                                    items={implementation.components.map((component) => ({
                                        title: component.title,
                                        href: component.href,
                                    }))}
                                />
                            </div>
                        )}
                        {implementation.liveExamples.length > 0 && (
                            <div
                                className="monster-implementation-group"
                                aria-label={`Live eksempler for ${implementation.title}`}
                            >
                                <h4>Live eksempler</h4>
                                <Grid
                                    as="ul"
                                    columns={2}
                                    gap="var(--site-space-m)"
                                    className="bare-list monster-live-examples"
                                >
                                    {implementation.liveExamples.map((example, index) => (
                                        <li key={index} className="monster-example-grid-item">
                                            {example}
                                        </li>
                                    ))}
                                </Grid>
                            </div>
                        )}
                        <div className="monster-implementation-group">
                            <h4>Steg for steg</h4>
                            <PatternFeatureList
                                items={implementation.steps.map((step) => ({
                                    title: step.title,
                                    description: step.description,
                                }))}
                                ordered
                                tone="accent"
                            />
                        </div>
                    </li>
                ))}
            </Grid>
        </section>
    );
}
