import typographyPost from "./typography";
import colorsPost from "./colors";
import spacingPost from "./spacing";
import motionPost from "./motion";
import breakpointsPost from "./breakpoints";
import borderRadiusPost from "./border-radius";
import type { TokenPost } from "./types";

export type { TokenPost };
export const tokenPosts: TokenPost[] = [typographyPost, colorsPost, spacingPost, motionPost, breakpointsPost, borderRadiusPost].sort((a, b) => a.title.localeCompare(b.title, "nb"));
