"use client";
import { Tag } from "@fremtind/jokul/tag";
import { Flex } from "@fremtind/jokul/flex";

export function TagPreview() {
    const tags = ["Bil", "Båt", "Hjem"];
    return <Flex gap="xs" alignItems="center">{tags.map(t => <Tag key={t}>{t}</Tag>)}</Flex>;
}
