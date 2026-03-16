import React from "react";
import {slugify} from "@/shared/utils/format";
import {Flex} from "@fremtind/jokul/flex";

interface SectionProps {
    /** h2 heading text — also used as the anchor ID */
    title: string;
    /** Optional lead paragraph below the heading */
    description?: string;
    children?: React.ReactNode;
}

export function Section({title, description, children}: SectionProps) {
    const id = slugify(title);
    return (
        <Flex direction="column" gap="l" className="post-prose-section">
            <h2 id={id}>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </Flex>
    );
}
