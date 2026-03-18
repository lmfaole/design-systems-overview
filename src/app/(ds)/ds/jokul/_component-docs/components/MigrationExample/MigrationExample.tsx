import { Flex } from "@fremtind/jokul/flex";
import { CodeBlock } from "@/app/ds/jokul/_shared/components/CodeBlock";
import { Grid } from "@/app/ds/jokul/_shared/components/Grid";
import type { Migration } from "@/app/ds/jokul/_component-docs/docs/types";
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

            <Grid columns={2} gap="m">
                <Flex direction="column" gap="xs" className="migration-example__block">
                    <span className="migration-example__block-label muted">Før</span>
                    <CodeBlock code={migration.before} />
                </Flex>
                <Flex direction="column" gap="xs" className="migration-example__block">
                    <span className="migration-example__block-label muted">Etter</span>
                    <CodeBlock code={migration.after} />
                </Flex>
            </Grid>
        </Flex>
    );
}
