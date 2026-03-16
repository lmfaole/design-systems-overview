"use client";

import { CopyButton } from "./CopyButton";
import "./code-block.scss";

interface ProseCodeBlockProps {
    code: string;
}

export function ProseCodeBlock({ code }: ProseCodeBlockProps) {
    const trimmed = code.trim();

    return (
        <div className="prose-code-block">
            <div className="prose-code-block__content">
                <CopyButton code={trimmed} className="prose-code-block__copy" />
                <pre className="prose-code-block__pre">
                    <code>{trimmed}</code>
                </pre>
            </div>
        </div>
    );
}

