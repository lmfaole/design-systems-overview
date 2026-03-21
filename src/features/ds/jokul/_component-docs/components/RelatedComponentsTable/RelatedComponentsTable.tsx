import type { RelatedComponentDoc } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";
import { RelatedComponentCard } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";

interface RelatedComponentsTableProps {
    items: Array<{ doc: RelatedComponentDoc; description: string }>;
}

export function RelatedComponentsTable({ items }: RelatedComponentsTableProps) {
    return (
        <div className="grid" data-columns={4}>
            {items.map(({ doc, description }) => (
                <RelatedComponentCard key={doc.id} doc={doc} description={description} />
            ))}
        </div>
    );
}
