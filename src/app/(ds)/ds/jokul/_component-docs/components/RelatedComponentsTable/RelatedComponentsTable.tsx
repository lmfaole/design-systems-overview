import type { RelatedComponentDoc } from "@/app/ds/jokul/_shared/components/RelatedComponentCard";
import { Grid } from "@/app/ds/jokul/_shared/components/Grid";
import { RelatedComponentCard } from "@/app/ds/jokul/_shared/components/RelatedComponentCard";

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
