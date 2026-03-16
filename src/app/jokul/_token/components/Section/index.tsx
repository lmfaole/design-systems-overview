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
    return (
        <Flex direction="column" gap="l" id={slugify(title)} className="post-prose-section">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </Flex>
    );
}
