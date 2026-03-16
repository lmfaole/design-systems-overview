"use client";

import { CodeBlock } from "./CodeBlock";

interface ProseCodeBlockProps {
    code: string;
}

export function ProseCodeBlock({ code }: ProseCodeBlockProps) {
    return <CodeBlock code={code} />;
}
