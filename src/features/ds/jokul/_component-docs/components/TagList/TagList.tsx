import { Flex } from "@fremtind/jokul/flex";
import { Tag } from "@fremtind/jokul/tag";

interface TagListProps {
    tags: string[];
}

export function TagList({ tags }: TagListProps) {
    if (tags.length === 0) return null;
    return (
        <Flex as="ul" className="bare-list" gap="xs" wrap="wrap">
            {tags.map((tag) => (
                <li key={tag}>
                    <Tag variant="neutral">{tag}</Tag>
                </li>
            ))}
        </Flex>
    );
}
