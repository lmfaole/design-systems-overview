import { Flex } from "@fremtind/jokul/flex";
import { ResourceList, type ResourceListItem } from "./ResourceList";

interface ResourceSectionProps {
    items: ResourceListItem[];
    heading?: string;
    headingId?: string;
}

export function ResourceSection({
    items,
    heading = "Videre lesning",
    headingId = "videre-lesning",
}: ResourceSectionProps) {
    if (items.length === 0) return null;

    return (
        <section aria-labelledby={headingId}>
            <div className="pattern-prose__text">
                <Flex direction="column" gap="s">
                    <h2 id={headingId}>{heading}</h2>
                    <ResourceList items={items} />
                </Flex>
            </div>
        </section>
    );
}
