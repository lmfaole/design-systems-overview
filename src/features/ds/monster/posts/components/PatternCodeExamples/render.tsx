import { PatternCodeBlock } from "../PatternCodeBlock";
import { PatternCodeTabs } from "../PatternCodeTabs";
import "./styles.scss";
import type { PatternCodeExamplesProps } from "./types";

export function PatternCodeExamples({ snippets }: PatternCodeExamplesProps) {
    if (snippets.length === 0) {
        return null;
    }

    if (snippets.length === 1) {
        const [snippet] = snippets;

        return (
            <div className="monster-code-examples">
                <PatternCodeBlock
                    code={snippet.code}
                    language={snippet.language}
                    label={snippet.label}
                />
            </div>
        );
    }

    return (
        <div className="monster-code-examples">
            <PatternCodeTabs snippets={snippets} />
        </div>
    );
}
