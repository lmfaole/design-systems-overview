import { createPatternPost } from "../_shared";
import { progressWhenWaitingContent } from "./content";
import { progressWhenWaitingImplementations } from "./implementations";

export default createPatternPost(
    progressWhenWaitingContent,
    progressWhenWaitingImplementations,
);
