import type { PatternPost } from "@/app/monster/data";
import { compareWcagIds } from "../_utils/compareWcagIds";

interface AccessibilitySectionProps {
    accessibility: PatternPost["accessibility"];
}

export function AccessibilitySection({ accessibility }: AccessibilitySectionProps) {
    const wcagSorted = [...accessibility.wcag].sort((a, b) => compareWcagIds(a.id, b.id));

    return (
        <section className="monster-section" aria-labelledby="tilgjengelighet">
            <h2 id="tilgjengelighet">Tilgjengelighet</h2>
            <p className="monster-kicker">{accessibility.title}</p>
            <p>{accessibility.description}</p>

            {accessibility.ariaRoles.length > 0 && (
                <div>
                    <h3>ARIA</h3>
                    <ul className="monster-list">
                        {accessibility.ariaRoles.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {wcagSorted.length > 0 && (
                <div>
                    <h3>WCAG</h3>
                    <ul className="monster-list">
                        {wcagSorted.map((rule) => (
                            <li key={rule.id}>
                                {rule.url ? (
                                    <a href={rule.url}>{rule.id} {rule.title} (Nivå {rule.level})</a>
                                ) : (
                                    <span>{rule.id} {rule.title} (Nivå {rule.level})</span>
                                )}
                                <div className="monster-inline-meta">{rule.relevance}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h3>Slik unngår du det</h3>
                <ul className="monster-list">
                    {accessibility.avoid.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            {accessibility.testing && accessibility.testing.length > 0 && (
                <div>
                    <h3>Testing</h3>
                    <ul className="monster-list">
                        {accessibility.testing.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
