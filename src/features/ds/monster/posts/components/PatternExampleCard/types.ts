import type { ReactNode } from "react";
import type { PatternCodeSnippet } from "../PatternCodeBlock";

export interface PatternExampleCardProps {
    title: ReactNode;
    preview: ReactNode;
    eyebrow?: ReactNode;
    description?: ReactNode;
    codeExamples?: PatternCodeSnippet[];
    code?: string;
    codeLanguage?: string;
    codeLabel?: ReactNode;
}
