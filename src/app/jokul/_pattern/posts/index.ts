import iconButtonsPattern from "./ikonknapper";
import asyncSearchPattern from "./asynkront-sok";
import doubleSubmitPattern from "./dobbel-innsending";
import disclosurePattern from "./progressiv-avsloring";
import longProcessPattern from "./fremdrift-lengre-prosess";
import tabsPattern from "./faner";
import type { PatternPost } from "./types";

export type { PatternPost } from "./types";
export type { PatternId } from "./ids";

export const patternPosts: PatternPost[] = [
    iconButtonsPattern,
    asyncSearchPattern,
    doubleSubmitPattern,
    disclosurePattern,
    longProcessPattern,
    tabsPattern,
].sort((a, b) => a.title.localeCompare(b.title, "nb"));
