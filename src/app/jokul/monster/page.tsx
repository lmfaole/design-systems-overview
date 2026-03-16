import { Flex } from "@fremtind/jokul/flex";
import { patternPosts } from "@/app/jokul/_pattern/data";
import { getPatternHref } from "@/app/jokul/_pattern/data";
import { getComponentDoc } from "@/app/jokul/_component-docs/data";
import { PageHeader } from "@/shared/components/PageHeader";
import { PatternOverviewTable } from "./PatternOverviewTable";

export const runtime = "edge";

export default function PatternIndexPage() {
    const rows = patternPosts.map((post) => ({
        id: post.id,
        title: post.title,
        href: getPatternHref(post),
        goals: post.goals,
        components: post.components.map((id) => {
            const doc = getComponentDoc(id);
            return {
                id,
                name: doc?.name ?? id,
                href: `/jokul/component/${id}`,
            };
        }),
    }));

    return (
        <Flex as="main" direction="column" gap="2xl">
            <PageHeader
                title="Mønster"
                description="Anbefalte løsninger på gjentakende UI-problemer. Bruk disse for å få konsistent, tilgjengelig og forutsigbar oppførsel."
            />

            <PatternOverviewTable rows={rows} />
        </Flex>
    );
}
