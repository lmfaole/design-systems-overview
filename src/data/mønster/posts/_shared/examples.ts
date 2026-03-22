import { renderPatternExampleCard } from "@/components/ds/mønster/PatternExampleCard";
import type { PatternExampleCardProps } from "@/components/ds/mønster/PatternExampleCard.types";
import type { PatternCodeSnippet } from "@/components/ds/mønster/PatternCodeBlock.types";

/**
 * Data-first definition of an example card rendered inside an implementation section.
 */
export type PatternExampleDefinition = PatternExampleCardProps & {
    key: string;
};

interface SplitCodeSource {
    html?: string;
    css?: string;
    js?: string;
}

type PatternExampleBaseDefinition = Omit<
    PatternExampleDefinition,
    "codeExamples" | "code" | "codeLanguage" | "codeLabel"
>;

/**
 * Example definition for the baseline implementation where HTML, CSS, and JS
 * are copyable as separate blocks.
 */
export interface VanillaPatternExampleDefinition extends PatternExampleBaseDefinition, SplitCodeSource {}

/**
 * Example definition for design-system-specific examples that are shown as one
 * copyable source block.
 */
export interface SingleCodePatternExampleDefinition extends PatternExampleBaseDefinition {
    code: string;
    codeLabel?: string;
    codeLanguage?: string;
}

/**
 * Create the standard set of copyable HTML, CSS, and JS snippets used by the
 * baseline implementation examples.
 */
export function createSplitCodeExamples({
    html,
    css,
    js,
}: SplitCodeSource): PatternCodeSnippet[] {
    const snippets: PatternCodeSnippet[] = [];

    if (html) {
        snippets.push({ code: html, language: "html", label: "Struktur" });
    }

    if (css) {
        snippets.push({ code: css, language: "css", label: "Stiler" });
    }

    if (js) {
        snippets.push({ code: js, language: "js", label: "Logikk" });
    }

    return snippets;
}

/**
 * Build a standard baseline example where HTML, CSS, and JS are modeled
 * separately from the card presentation metadata.
 */
export function createVanillaPatternExample({
    html,
    css,
    js,
    ...example
}: VanillaPatternExampleDefinition): PatternExampleDefinition {
    return {
        ...example,
        codeExamples: createSplitCodeExamples({ html, css, js }),
    };
}

/**
 * Build a standard single-snippet example for one specific design system.
 */
export function createSingleCodePatternExample(
    example: SingleCodePatternExampleDefinition,
): PatternExampleDefinition {
    return example;
}

/**
 * Render a list of example-card definitions into the markup consumed by the
 * pattern model.
 */
export function renderPatternExamples(examples: PatternExampleDefinition[]): string[] {
    return examples.map(({ key: _key, ...props }) => renderPatternExampleCard(props));
}
