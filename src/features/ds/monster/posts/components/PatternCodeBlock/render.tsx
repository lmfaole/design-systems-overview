import "./styles.scss";
import type { PatternCodeBlockProps } from "./types";

export function PatternCodeBlock({
    code,
    language = "tsx",
    label = "Kodeeksempel",
}: PatternCodeBlockProps) {
    const trimmed = code.trim();

    return (
        <figure className="monster-code-block" data-copy-code-root>
            <figcaption className="monster-code-block-toolbar">
                <p className="monster-code-block-meta">
                    <small className="monster-code-block-label">{label}</small>
                    <small className="monster-code-block-language">{language}</small>
                </p>
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
            </figcaption>
            <pre className="monster-code-block-pre">
                <code className="monster-code-block-code" data-copy-code-source>
                    {trimmed}
                </code>
            </pre>
        </figure>
    );
}
