import type { ReactNode } from "react";
import "./PatternCodeBlock.scss";

interface PatternCodeBlockProps {
    code: string;
    language?: string;
    label?: ReactNode;
}

export function PatternCodeBlock({
    code,
    language = "tsx",
    label = "Kodeeksempel",
}: PatternCodeBlockProps) {
    const trimmed = code.trim();

    return (
        <div className="monster-code-block" data-copy-code-root>
            <div className="monster-code-block-toolbar">
                <div className="monster-code-block-meta">
                    <small className="monster-code-block-label">{label}</small>
                    <small className="monster-code-block-language">{language}</small>
                </div>
                <button
                    type="button"
                    className="monster-copy-button"
                    data-copy-code-button
                    data-copy-code-default="Kopier kode"
                    data-copy-code-success="Kopiert"
                    data-copy-code-error="Kunne ikke kopiere"
                    aria-label="Kopier kode"
                >
                    Kopier kode
                </button>
            </div>
            <pre className="monster-code-block-pre">
                <code className="monster-code-block-code" data-copy-code-source>
                    {trimmed}
                </code>
            </pre>
        </div>
    );
}
