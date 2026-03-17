import iconButtonsPattern from "./ikonknapper";
import asyncSearchPattern from "./asynkront-sok";
import doubleSubmitPattern from "./dobbel-innsending";
import disclosurePattern from "./progressiv-avsloring";
import longProcessPattern from "./fremdrift-lengre-prosess";
import tabsPattern from "./faner";
import breadcrumbsPattern from "./brodsmuler";
import destructiveConfirmPattern from "./bekreft-destruktiv-handling";
import errorSummaryPattern from "./feiloppsummering";
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
    breadcrumbsPattern,
    destructiveConfirmPattern,
    errorSummaryPattern,
].sort((a, b) => a.title.localeCompare(b.title, "nb"));
