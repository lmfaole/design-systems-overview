import iconButtonsPattern from "./ikonknapper";
import asyncSearchPattern from "./asynkront-sok";
import doubleSubmitPattern from "./dobbel-innsending";
import type { PatternPost } from "./types";

export type { PatternPost } from "./types";
export type { PatternId } from "./ids";

export const patternPosts: PatternPost[] = [
    iconButtonsPattern,
    asyncSearchPattern,
    doubleSubmitPattern,
].sort((a, b) => a.title.localeCompare(b.title, "nb"));
