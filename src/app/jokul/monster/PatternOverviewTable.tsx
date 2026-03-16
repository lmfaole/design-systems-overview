"use client";

import { DataTable } from "@fremtind/jokul/table";
import { Link } from "@fremtind/jokul/link";

export interface PatternOverviewRow {
    id: number;
    title: string;
    href: string;
    goals: string;
    components: Array<{ id: string; name: string; href: string }>;
}

interface PatternOverviewTableProps {
    rows: PatternOverviewRow[];
}

export function PatternOverviewTable({ rows }: PatternOverviewTableProps) {
    return (
        <DataTable
            caption="Mønstre"
            columns={["Id", "Tittel", "Mål", "Komponenter"]}
            rows={rows.map((row) => [
                <code key={`${row.id}-id`}>{row.id}</code>,
                (
                    <Link key={`${row.id}-t`} href={row.href}>
                        {row.title}
                    </Link>
                ),
                row.goals,
                row.components.length > 0 ? (
                    <span key={`${row.id}-u`}>
                        {row.components.map((use, i) => (
                            <span key={use.id}>
                                <Link href={use.href}>{use.name}</Link>
                                {i < row.components.length - 1 ? ", " : null}
                            </span>
                        ))}
                    </span>
                ) : (
                    "—"
                ),
            ])}
        />
    );
}
