import type { ReactNode } from "react";

export interface PatternCodeSnippet {
    code: string;
    language?: string;
    label?: ReactNode;
}

export interface PatternCodeBlockProps extends PatternCodeSnippet {}
