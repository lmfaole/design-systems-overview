/**
 * Shared section metadata for mønster pattern pages.
 * Keep ids and labels centralized so the page TOC and section headings stay in sync.
 */
export const MØNSTER_PATTERN_SECTIONS = {
    doAndDonts: {
        id: "dos-and-donts",
        label: "Do's and don'ts",
    },
    accessibility: {
        id: "tilgjengelighet",
        label: "Tilgjengelighet",
    },
    implementation: {
        id: "implementasjon",
        label: "Implementasjon",
    },
    furtherReading: {
        id: "videre-lesning",
        label: "Videre lesning",
    },
} as const;
