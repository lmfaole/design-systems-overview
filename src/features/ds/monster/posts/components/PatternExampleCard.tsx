import type { ReactNode } from "react";
import { PatternCodeBlock } from "./PatternCodeBlock";
import "./PatternExampleCard.scss";

interface PatternExampleCardCodeExample {
    code: string;
    language?: string;
    label?: ReactNode;
}

interface PatternExampleCardProps {
    title: ReactNode;
    preview: ReactNode;
    eyebrow?: ReactNode;
    description?: ReactNode;
    codeExamples?: PatternExampleCardCodeExample[];
    code?: string;
    codeLanguage?: string;
    codeLabel?: ReactNode;
}

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
            {eyebrow && <small className="monster-example-eyebrow">{eyebrow}</small>}
            <h5 className="monster-example-title">{title}</h5>
            {description && <div className="monster-example-description">{description}</div>}
            <div className="monster-example-preview">{preview}</div>
            {snippets.map((snippet, index) => (
                <PatternCodeBlock
                    key={`${snippet.language ?? "code"}-${index}`}
                    code={snippet.code}
                    language={snippet.language}
                    label={snippet.label}
                />
            ))}
        </article>
    );
}
