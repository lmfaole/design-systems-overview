"use client";

import "./code-block.scss";
import { CodeContent } from "./CodeContent";

interface CodeBlockProps {
    code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
    return (
        <div className="code-block" data-size="small">
            <CodeContent code={code} />
        </div>
    );
}
