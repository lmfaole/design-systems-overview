import type { Metadata } from "next";
import { getPatternPost } from "@/app/monster/data";
import { ExamplesSection } from "./_components/ExamplesSection";
import { AvoidSection } from "./_components/AvoidSection";
import { DoAndDontsSection } from "./_components/DoAndDontsSection";
import { AccessibilitySection } from "./_components/AccessibilitySection";
import { ResourceSection } from "./_components/ResourceSection";
import { ComponentsSection } from "./_components/ComponentsSection";
import { createPageMetadata } from "@/app/_shared/seo";

export const runtime = "edge";

type Awaitable<T> = T | Promise<T>;

interface PatternPageProps {
    params: Awaitable<{ id: string }>;
    searchParams?: Awaitable<{ id?: string }>;
}

export async function generateMetadata({ params }: { params: Awaitable<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPatternPost(resolvedParams.id);

    if (!post) {
        return createPageMetadata({
            title: "Fant ikke mønster",
            description: "Mønsteret du prøvde å åpne finnes ikke i ressursen.",
            path: `/monster/${resolvedParams.id}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: post.title,
        description: post.goals,
        path: `/monster/${post.id}`,
        type: "article",
    });
}

export default async function PatternPage({ params, searchParams }: PatternPageProps) {
    // Next can provide `params`/`searchParams` as Promises (sync dynamic APIs).
    const resolvedParams = await params;
    const resolvedSearchParams = await Promise.resolve(searchParams);

    // Also try `searchParams.id` since some runtimes may mirror dynamic params into the query string.
    const candidates = [resolvedParams.id, resolvedSearchParams?.id].filter(Boolean) as string[];
    const post = candidates.map((id) => getPatternPost(id)).find(Boolean);

    if (!post) {
        return (
            <section className="monster-section">
                <h1>Fant ikke mønsteret</h1>
                <p>
                    <a href="/monster">Tilbake til alle mønstre</a>
                </p>
            </section>
        );
    }

    return (
        <>
            <header className="monster-hero">
                <p className="monster-kicker">Mønster</p>
                <h1>{post.title}</h1>
                <p>{post.goals}</p>
            </header>

            {post.doAndDonts && <DoAndDontsSection doAndDonts={post.doAndDonts} />}
            {post.examples.length > 0 && <ExamplesSection examples={post.examples} />}
            {post.avoid.length > 0 && <AvoidSection avoid={post.avoid} />}
            <AccessibilitySection accessibility={post.accessibility} />
            <ResourceSection items={post.resources} />
            <ComponentsSection components={post.components ?? []} />
        </>
    );
}
