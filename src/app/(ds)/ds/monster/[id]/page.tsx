import type { Metadata } from "next";
import { getPatternPost, patternPosts } from "@/app/ds/monster/data";
import { PageHeader } from "@/app/ds/_shared/components/PageHeader";
import { ExamplesSection } from "@/app/ds/monster/[id]/_components/ExamplesSection";
import { AvoidSection } from "@/app/ds/monster/[id]/_components/AvoidSection";
import { DoAndDontsSection } from "@/app/ds/monster/[id]/_components/DoAndDontsSection";
import { AccessibilitySection } from "@/app/ds/monster/[id]/_components/AccessibilitySection";
import { ResourceSection } from "@/app/ds/monster/[id]/_components/ResourceSection";
import { ComponentsSection } from "@/app/ds/monster/[id]/_components/ComponentsSection";
import { createPageMetadata } from "@/app/_shared/seo";

export const dynamicParams = false;

type Awaitable<T> = T | Promise<T>;

interface PatternPageProps {
    params: Awaitable<{ id: string }>;
}

export function generateStaticParams() {
    return patternPosts.map((post) => ({
        id: String(post.id),
    }));
}

export async function generateMetadata({ params }: { params: Awaitable<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPatternPost(resolvedParams.id);

    if (!post) {
        return createPageMetadata({
            title: "Fant ikke mønster",
            description: "Mønsteret du prøvde å åpne finnes ikke i ressursen.",
            path: `/ds/monster/${resolvedParams.id}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: post.title,
        description: post.goals,
        path: `/ds/monster/${post.id}`,
        type: "article",
    });
}

export default async function PatternPage({ params }: PatternPageProps) {
    const resolvedParams = await params;
    const post = getPatternPost(resolvedParams.id);

    if (!post) {
        return (
            <section className="monster-section">
                <h1>Fant ikke mønsteret</h1>
                <p>
                    <a href="/ds/monster">Tilbake til alle mønstre</a>
                </p>
            </section>
        );
    }

    return (
        <>
            <div className="monster-hero">
                <p className="monster-kicker">Mønster</p>
                <PageHeader
                    title={post.title}
                    description={post.goals}
                />
            </div>

            {post.doAndDonts && <DoAndDontsSection doAndDonts={post.doAndDonts} />}
            {post.examples.length > 0 && <ExamplesSection examples={post.examples} />}
            {post.avoid.length > 0 && <AvoidSection avoid={post.avoid} />}
            <AccessibilitySection accessibility={post.accessibility} />
            <ResourceSection items={post.resources} />
            <ComponentsSection components={post.components ?? []} />
        </>
    );
}
