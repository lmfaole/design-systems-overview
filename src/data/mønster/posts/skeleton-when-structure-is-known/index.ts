import { createPatternPost } from "../_shared";
import { skeletonWhenStructureIsKnownContent } from "./content";
import { skeletonWhenStructureIsKnownImplementations } from "./implementations";

export default createPatternPost(
    skeletonWhenStructureIsKnownContent,
    skeletonWhenStructureIsKnownImplementations,
);
