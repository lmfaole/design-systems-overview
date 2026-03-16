/**
 * Exhaustive list of all registered pattern IDs.
 * Each value matches the URL segment under `/jokul/monster/[id]`.
 */
export const PATTERN_IDS = [
    1,
    2,
    3,
    4,
    5,
    6,
] as const;

export type PatternId = (typeof PATTERN_IDS)[number];
