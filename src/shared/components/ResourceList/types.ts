export type ResourcePublisherType =
    | "standards"
    | "government"
    | "docs"
    | "research"
    | "industry"
    | "training"
    | "publication"
    | "author";

export const RESOURCE_PUBLISHER_TYPE_LABELS = {
    standards: "Standard",
    government: "Myndighet",
    docs: "Dokumentasjon",
    research: "Forskning",
    industry: "Bransje",
    training: "Kurs",
    publication: "Publikasjon",
    author: "Forfatter",
} as const satisfies Record<ResourcePublisherType, string>;

export const RESOURCE_PUBLISHERS = {
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
    "Material Design": { title: "Material Design", type: "publication" },
    "Spec.fm": { title: "Spec.fm", type: "publication" },
    "Luke Wroblewski": { title: "Luke Wroblewski", type: "author" },
    Myndex: { title: "Myndex", type: "research" },
    "Practical Typography": { title: "Practical Typography", type: "publication" },
} as const;

export type ResourcePublisher = keyof typeof RESOURCE_PUBLISHERS;

/**
 * Relevance score for a resource (1=low, 5=high).
 *
 * Guidelines:
 * - 5: Core/authoritative guidance for this exact topic.
 * - 4: Highly relevant, directly applicable guidance.
 * - 3: Relevant supporting material, still topic-specific.
 * - 2: Minor supporting detail; keep rare and justify in description.
 * - 1: Avoid unless there's a strong, explicit link to this topic.
 */
export type ResourceRelevance = 1 | 2 | 3 | 4 | 5;
