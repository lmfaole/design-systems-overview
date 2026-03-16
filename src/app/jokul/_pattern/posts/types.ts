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

export interface PatternAvoidExample {
    /**
     * Short label for the pitfall.
     */
    title: string;
    /**
     * Short explanation of why this is a pitfall.
     */
    description?: React.ReactNode;
    /**
     * The snippet to show in the code modal.
     * Keep it focused and copy/paste friendly.
     */
    code: string;
    /**
     * A compact, working example that demonstrates what to avoid.
     */
    Example: React.ComponentType;
}

/**
 * Publisher category for filtering/labels in the UI.
 *
 * Keep the set small and consistent across publishers.
 */
export type PatternResourcePublisherType =
    | "standards"
    | "government"
    | "docs"
    | "research"
    | "industry"
    | "training"
    | "publication"
    | "author";

export const PATTERN_RESOURCE_PUBLISHER_TYPE_LABELS = {
    standards: "Standard",
    government: "Myndighet",
    docs: "Dokumentasjon",
    research: "Forskning",
    industry: "Bransje",
    training: "Kurs",
    publication: "Publikasjon",
    author: "Forfatter",
} as const satisfies Record<PatternResourcePublisherType, string>;

/** Trusted publishers with display titles and categories. */
export const PATTERN_RESOURCE_PUBLISHERS = {
    WHATWG: { title: "WHATWG", type: "standards" },
    "W3C/WAI": { title: "W3C/WAI", type: "standards" },
    "W3C CSS Working Group": { title: "W3C CSS Working Group", type: "standards" },
    MDN: { title: "MDN", type: "docs" },
    React: { title: "React", type: "docs" },
    "GOV.UK": { title: "GOV.UK", type: "government" },
    "Nielsen Norman Group": { title: "Nielsen Norman Group", type: "research" },
    WebAIM: { title: "WebAIM", type: "industry" },
    Deque: { title: "Deque", type: "industry" },
    "Standard Norge": { title: "Standard Norge", type: "standards" },
    Digdir: { title: "Digdir", type: "government" },
    "Uu-tilsynet": { title: "Uu-tilsynet", type: "government" },
    Nkom: { title: "Nkom", type: "government" },
    "Frontend Masters": { title: "Frontend Masters", type: "training" },
    "Andy Bell": { title: "Andy Bell", type: "author" },
    Piccalilli: { title: "Piccalilli", type: "publication" },
    "CSS-Tricks": { title: "CSS-Tricks", type: "publication" },
    "A List Apart": { title: "A List Apart", type: "publication" },
    "Smashing Magazine": { title: "Smashing Magazine", type: "publication" },
    "Web.dev": { title: "Web.dev", type: "docs" },
    "Adrian Roselli": { title: "Adrian Roselli", type: "author" },
    "Sara Soueidan": { title: "Sara Soueidan", type: "author" },
    "Heydon Pickering": { title: "Heydon Pickering", type: "author" },
    "Scott O'Hara": { title: "Scott O'Hara", type: "author" },
    "Jeremy Keith": { title: "Jeremy Keith", type: "author" },
    "Rachel Andrew": { title: "Rachel Andrew", type: "author" },
    "Lea Verou": { title: "Lea Verou", type: "author" },
    "Una Kravets": { title: "Una Kravets", type: "author" },
} as const;

export type PatternResourcePublisher = keyof typeof PATTERN_RESOURCE_PUBLISHERS;

/**
 * Relevance score for a resource (1=low, 5=high).
 *
 * Guidelines:
 * - 5: Core/authoritative guidance for this exact pattern.
 * - 4: Highly relevant, directly applicable guidance.
 * - 3: Relevant supporting material, still pattern-specific.
 * - 2: Minor supporting detail; keep rare and justify in description.
 * - 1: Avoid unless there's a strong, explicit link to this pattern.
 */
export type PatternResourceRelevance = 1 | 2 | 3 | 4 | 5;

export interface PatternResource {
    /** Title of the resource. */
    title: string;
    /** Canonical URL to the resource. */
    href: string;
    /** Trusted publisher name. */
    publisher: PatternResourcePublisher;
    /** Relevance score (1=low, 5=high) for this specific pattern. */
    relevance: PatternResourceRelevance;
    /**
     * Optional short context for why it's relevant.
     * Keep it specific to the pattern (avoid generic accessibility overviews).
     */
    description?: React.ReactNode;
}

export interface PatternPost {
    id: PatternId;
    /**
     * Display title (used in the overview and the page hero).
     * Keep it short; avoid punctuation.
     */
    title: string;
    /**
     * Category used for grouping and filtering patterns.
     */
    category: PatternCategory;
    /**
     * The user's goal with the pattern (used in the overview and the page hero).
     * Should be phrased as an outcome and not repeat the title.
     */
    goals: string;
    /**
     * Common pitfalls to avoid when implementing the pattern.
     *
     * Must be working React examples that demonstrate the pitfall.
     */
    avoid: PatternAvoidExample[];

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
     * Further reading about the pattern from highly respected publications.
     * Every entry must be directly about the pattern topic (e.g. buttons, search/autocomplete,
     * form submission/error prevention), not just general accessibility policy.
     */
    resources: PatternResource[];

    /**
     * All components used by the pattern (what a consumer typically composes to implement it).
     * Keep it accurate; it's used to generate the components section and overview column.
     */
    components: ComponentId[];
}

export type PatternCategory = "handlinger" | "navigasjon" | "tilbakemelding" | "struktur";
