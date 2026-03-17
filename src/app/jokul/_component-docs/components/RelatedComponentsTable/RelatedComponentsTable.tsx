import type {RelatedComponentDoc} from "@/shared/components/RelatedComponentCard";
import {Grid} from "@/shared/components/Grid";
import {RelatedComponentCard} from "@/shared/components/RelatedComponentCard";

interface RelatedComponentsTableProps {
    items: Array<{ doc: RelatedComponentDoc; description: string }>;
}

export function RelatedComponentsTable({items}: RelatedComponentsTableProps) {
    return (
        <Grid columns={4}>
            {items.map(({doc, description}) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description}/>
            ))}
        </Grid>
    );
}
