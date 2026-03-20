import { getTokenSlug, tokenPosts } from "@/app/ds/jokul/_token/data";
import { TokenPostPageClient } from "./TokenPostPageClient";

export const dynamicParams = false;

type Awaitable<T> = T | Promise<T>;

export function generateStaticParams() {
    return tokenPosts.map((post) => ({
        slug: getTokenSlug(post),
    }));
}

export default async function TokenPostPage({
    params,
}: {
    params: Awaitable<{ slug: string }>;
}) {
    const resolvedParams = await params;

    return <TokenPostPageClient slug={resolvedParams.slug} />;
}
