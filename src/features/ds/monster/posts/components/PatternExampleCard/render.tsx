import { PatternCodeExamples } from "../PatternCodeExamples";
import "./styles.scss";
import type { PatternExampleCardProps } from "./types";

export function PatternExampleCard({
    title,
    preview,
    eyebrow,
    description,
    codeExamples,
    code,
    codeLanguage,
    codeLabel,
}: PatternExampleCardProps) {
    const snippets = codeExamples ?? (code ? [{ code, language: codeLanguage, label: codeLabel }] : []);

    return (
        <article className="monster-example-card">
            <header className="monster-example-header">
                {eyebrow && <small className="monster-example-eyebrow">{eyebrow}</small>}
                <h5 className="monster-example-title">{title}</h5>
                {description && <div className="monster-example-description">{description}</div>}
            </header>
            <div className="monster-example-body" data-has-code={String(snippets.length > 0)}>
                <figure className="monster-example-preview">{preview}</figure>
                {snippets.length > 0 && (
                    <div className="monster-example-code">
                        <PatternCodeExamples snippets={snippets} />
                    </div>
                )}
            </div>
        </article>
    );
}
