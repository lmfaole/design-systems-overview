import type React from "react";
import type { ComponentId } from "@/app/jokul/_component-docs/docs/types";
import type { PatternId } from "./ids";

/**
 * Content model for "mønster" (patterns).
 *
 * Goal: keep posts consistent and scannable.
 * - Prefer short, concrete guidance over long explanations.
 * - Use React nodes for text fields so we can embed Jøkul `Link`, inline `code`, etc.
 */
export type WcagLevel = "A" | "AA" | "AAA";

export interface WcagRule {
    /**
     * WCAG success criterion ID, e.g. "1.1.1" or "2.5.8".
     *
     * Notes:
     * - Keep the official dotted numeric format. It's used for sorting in the UI.
     */
    id: string;
    /**
     * Short name, e.g. "Non-text Content".
     * Keep it concise (this becomes the visible label in the WCAG list).
     */
    title: React.ReactNode;
    level: WcagLevel;
    /**
     * Why this criterion is relevant for this specific pattern.
     *
     * Keep it to 1-2 sentences and tie it to concrete user impact
     * (screen reader, keyboard, low vision, motor, cognitive, etc.).
     */
    relevance: React.ReactNode;
    /**
     * Optional deep link to the official understanding page.
     * Prefer the "Understanding ..." URLs when available.
     */
    url?: string;
}

export interface PatternAccessibility {
    /**
     * Short headline for the key a11y concern this pattern addresses.
     *
     * Should read well as an H3, and ideally describes the outcome:
     * "Gi X et tydelig navn", "Sørg for Y med tastatur", etc.
     */
    title: React.ReactNode;
    /**
     * Why the pattern matters from an accessibility perspective.
     *
     * Keep it brief (2-4 sentences). Mention what tends to go wrong and who it affects.
     */
    description: React.ReactNode;
    /**
     * Relevant ARIA roles/attributes for the pattern.
     * Use inline links in the nodes to point to official guidance.
     *
     * Guidelines:
     * - Prefer native elements/semantics first (e.g. <button>) and document ARIA as needed.
     * - Link to ARIA APG and/or MDN/WAI-ARIA for each point.
     * - Each item should be self-contained and actionable.
     */
    ariaRoles: React.ReactNode[];
    /**
     * WCAG success criteria this pattern helps satisfy.
     *
     * Keep it focused: include the criteria that are actually relevant for this pattern,
     * not an exhaustive list. Every rule must include a short "relevance" explanation.
     */
    wcag: WcagRule[];
    /**
     * Concrete guidance for preventing common pitfalls.
     *
     * Structure as short bullet points. Prefer "Do/Don't" language and concrete examples.
     */
    avoid: React.ReactNode[];

    /**
     * Optional: practical checks people can run while implementing.
     *
     * Recommended to include at least:
     * - Keyboard (Tab/Shift+Tab, Enter/Space where relevant)
     * - Screen reader announcement (name + role + state)
     */
    testing?: React.ReactNode[];
}

export interface PatternExample {
    /**
     * Short label for this implementation variant.
     * Used as the visible heading in the examples section.
     */
    title: string;
    /**
     * Optional short explanation of when/why to pick this variant.
     * Use inline links and `code` where helpful.
     */
    description?: React.ReactNode;
    /**
     * The relevant snippet for this example, shown in a "Vis kode" modal.
     * Keep it focused and copy/paste friendly.
     */
    code: string;
    /**
     * A compact live example (Client Component).
     * Keep it small enough to fit comfortably in a card.
     *
     * Put the implementation in a sibling `examples.tsx` file with `"use client"`,
     * so patterns can be rendered in Server Components without pulling hooks into
     * the content module.
     */
    Example: React.ComponentType;
}

export interface PatternPost {
    id: PatternId;
    /**
     * Display title (used in the overview and the page hero).
     * Keep it short; avoid punctuation.
     */
    title: string;
    /**
     * The user's goal with the pattern (used in the overview and the page hero).
     * Should be phrased as an outcome and not repeat the title.
     */
    goals: string;

    /**
     * Multiple "ways to build it" examples.
     *
     * These are meant to be copyable building blocks that demonstrate the pattern
     * in different contexts (e.g. icon-only vs icon+text, toggle state, etc.).
     */
    examples: PatternExample[];

    /** Mandatory accessibility guidance for the pattern */
    accessibility: PatternAccessibility;

    /**
     * All components used by the pattern (what a consumer typically composes to implement it).
     * Keep it accurate; it's used to generate the components section and overview column.
     */
    components: ComponentId[];
}
