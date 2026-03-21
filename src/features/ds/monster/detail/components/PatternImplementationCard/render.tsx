import { PatternExampleGrid } from "../PatternExampleGrid";
import { PatternFeatureList } from "../PatternFeatureList";
import "./styles.scss";
import type { PatternImplementationCardProps } from "./types";

export function PatternImplementationCard({
    implementation,
}: PatternImplementationCardProps) {
    return (
        <li className="monster-implementation">
            <article>
                <header className="monster-implementation-copy">
                    <p className="monster-implementation-meta">
                        <strong>Designsystem:</strong> {implementation.designSystem}
                    </p>
                    <h3>{implementation.title}</h3>
                    <div>{implementation.description}</div>
                </header>
                {implementation.components.length > 0 && (
                    <section className="monster-implementation-group">
                        <h4>Komponenter</h4>
                        <PatternFeatureList
                            items={implementation.components.map((component) => ({
                                title: component.title,
                                href: component.href,
                            }))}
                        />
                    </section>
                )}
                <PatternExampleGrid
                    heading="Live eksempler"
                    label={`Live eksempler for ${implementation.title}`}
                    examples={implementation.liveExamples}
                />
            </article>
        </li>
    );
}
