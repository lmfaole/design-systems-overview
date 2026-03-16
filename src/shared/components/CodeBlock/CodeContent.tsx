"use client";

import { CopyButton } from "./CopyButton";

interface CodeContentProps {
    code: string;
}

export function CodeContent({ code }: CodeContentProps) {
    const trimmed = code.trim();

    return (
        <div className="code-block__content">
            <div className="code-block__copy">
                <CopyButton code={trimmed} />
            </div>
            <pre className="code-block__pre">
                <code>{trimmed}</code>
            </pre>
        </div>
    );
}
