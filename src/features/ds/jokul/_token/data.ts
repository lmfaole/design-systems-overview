export { tokenPosts } from "./posts";
export type { TokenPost, TokenResource } from "./posts/types";

import { tokenPosts } from "./posts";
import type { TokenPost } from "./posts/types";
import { slugify } from "@/lib/format";

export function getTokenSlug(post: TokenPost): string {
    return slugify(post.title);
}

export function getTokenPost(slug: string): TokenPost | undefined {
    return tokenPosts.find((p) => slugify(p.title) === slug);
}

export function getTokenPostById(id: number): TokenPost | undefined {
    return tokenPosts.find((p) => p.id === id);
}
