import React from "react";
import {Link} from "@fremtind/jokul/link";
import type {ResolvedRelationship} from "@/features/ds/jokul/_component-docs/data";
import {DescriptionDetail, DescriptionList, DescriptionTerm} from "@fremtind/jokul/description-list";

interface SubcomponentsListProps {
    items: ResolvedRelationship[];
}

export function SubcomponentsList({items}: SubcomponentsListProps) {
    return (
        <DescriptionList separators>
            {items.map(({doc, description}) => (
                <React.Fragment key={doc.id}>
                    <DescriptionTerm>
                        <Link href={`/ds/jokul/component/${doc.id}`}>{doc.name}</Link>
                    </DescriptionTerm>
                    <DescriptionDetail>{description}</DescriptionDetail>
                </React.Fragment>
            ))}
        </DescriptionList>
    );
}
