import { Flex } from "@fremtind/jokul/flex";
import { CodeBlock } from "@/features/ds/jokul/_shared/components/CodeBlock";
import type { Migration } from "@/features/ds/jokul/_component-docs/docs/types";
import "./migration-example.scss";

interface MigrationExampleProps {
    migration: Migration;
}

export function MigrationExample({ migration }: MigrationExampleProps) {
    return (
        <Flex direction="column" gap="s" className="migration-example">
            {migration.description && <p className="small muted">{migration.description}</p>}

            {migration.replacedBy && (
                <p className="small muted">
                    Erstattes av:{" "}
                    {migration.replacedBy.map((item, i) => (
                        <span key={item.name}>
                            {i > 0 && ", "}
                            <code>{item.name}</code>
                        </span>
                    ))}
                </p>
            )}

            <div className="ds-grid" data-columns={2}>
                <Flex direction="column" gap="xs" className="block">
                    <span className="block-label muted">Før</span>
                    <CodeBlock code={migration.before} />
                </Flex>
                <Flex direction="column" gap="xs" className="block">
                    <span className="block-label muted">Etter</span>
                    <CodeBlock code={migration.after} />
                </Flex>
            </div>
        </Flex>
    );
}
