import React from "react";
import type { ResolvedRelationship } from "@/app/ds/jokul/_component-docs/data";
import { Grid } from "@/app/ds/jokul/_shared/components/Grid";
import { RelatedComponentCard } from "@/app/ds/jokul/_shared/components/RelatedComponentCard";

interface AlternativesListProps {
    items: ResolvedRelationship[];
}

export function AlternativesList({ items }: AlternativesListProps) {
    return (
        <Grid columns={1}>
            {items.map(({ doc, description }) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description} layout="horizontal" />
            ))}
        </Grid>
    );
}
