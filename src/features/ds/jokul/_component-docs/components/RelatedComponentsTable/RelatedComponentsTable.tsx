import type { RelatedComponentDoc } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";
import { Grid } from "@/features/ds/jokul/_shared/components/Grid";
import { RelatedComponentCard } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";

interface RelatedComponentsTableProps {
    items: Array<{ doc: RelatedComponentDoc; description: string }>;
}

export function RelatedComponentsTable({ items }: RelatedComponentsTableProps) {
    return (
        <Grid columns={4}>
            {items.map(({ doc, description }) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description} />
            ))}
        </Grid>
    );
}
