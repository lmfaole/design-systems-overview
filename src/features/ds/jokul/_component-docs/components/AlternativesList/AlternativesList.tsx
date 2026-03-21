import React from "react";
import type { ResolvedRelationship } from "@/features/ds/jokul/_component-docs/data";
import { RelatedComponentCard } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";

interface AlternativesListProps {
    items: ResolvedRelationship[];
}

export function AlternativesList({ items }: AlternativesListProps) {
    return (
        <div className="ds-grid">
            {items.map(({ doc, description }) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description} layout="horizontal" />
            ))}
        </div>
    );
}
