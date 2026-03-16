import React from "react";
import type {ResolvedRelationship} from "@/app/jokul/_component-docs/data";
import {Grid} from "@/shared/components/Grid";
import {RelatedComponentCard} from "@/shared/components/RelatedComponentCard";

interface AlternativesListProps {
    items: ResolvedRelationship[];
}

export function AlternativesList({items}: AlternativesListProps) {
    return (
        <Grid columns={1}>
            {items.map(({doc, description}) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description} layout="horizontal" />
            ))}
        </Grid>
    );
}
