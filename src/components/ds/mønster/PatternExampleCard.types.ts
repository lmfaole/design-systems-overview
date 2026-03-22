import type { PatternCodeSnippet } from "./PatternCodeBlock.types";

export interface PatternExampleCardProps {
    title: string;
    preview: string;
    eyebrow?: string;
    description?: string;
    codeExamples?: PatternCodeSnippet[];
    code?: string;
    codeLanguage?: string;
    codeLabel?: string;
}
