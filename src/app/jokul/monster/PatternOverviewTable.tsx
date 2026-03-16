"use client";

import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    useSortableTableHeader,
} from "@fremtind/jokul/table";
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

type SortKey = "id" | "title";

const COLUMNS = [
    { key: "id" as const, label: "Id", sortable: true },
    { key: "title" as const, label: "Tittel", sortable: true },
    { key: "goals" as const, label: "Mål", sortable: false },
    { key: "components" as const, label: "Komponenter", sortable: false },
];

export function PatternOverviewTable({ rows }: PatternOverviewTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("asc");
    const { getSortProps } = useSortableTableHeader(
        sortKey,
        sortDirection,
        (newSortKey, newSortDirection) => {
            setSortKey(newSortKey as SortKey);
            setSortDirection(newSortDirection);
        },
    );

    const sortedRows = useMemo(() => {
        if (sortDirection === "none") return rows;

        const collator = new Intl.Collator("nb");
        const direction = sortDirection === "asc" ? 1 : -1;

        function getValue(row: PatternOverviewRow): string | number {
            if (sortKey === "id") return row.id;
            return row.title;
        }

        return rows
            .map((row, index) => ({ row, index }))
            .sort((a, b) => {
                const aValue = getValue(a.row);
                const bValue = getValue(b.row);

                if (typeof aValue === "number" && typeof bValue === "number") {
                    if (aValue === bValue) return a.index - b.index;
                    return (aValue - bValue) * direction;
                }

                const result = collator.compare(String(aValue), String(bValue));
                if (result !== 0) return result * direction;
                return a.index - b.index;
            })
            .map(({ row }) => row);
    }, [rows, sortDirection, sortKey]);

    return (
        <Table caption={<TableCaption srOnly>Mønstre</TableCaption>} collapseToList fullWidth>
            <TableHead>
                <TableRow>
                    {COLUMNS.map((column) => (
                        <TableHeader
                            key={column.key}
                            sortable={column.sortable ? getSortProps(column.key).sortable : undefined}
                        >
                            {column.label}
                        </TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedRows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell data-th={COLUMNS[0].label}>
                            <code>{row.id}</code>
                        </TableCell>
                        <TableCell data-th={COLUMNS[1].label}>
                            <Link href={row.href}>{row.title}</Link>
                        </TableCell>
                        <TableCell data-th={COLUMNS[2].label}>
                            {row.goals}
                        </TableCell>
                        <TableCell data-th={COLUMNS[3].label}>
                            {row.components.length > 0 ? (
                                <span>
                                    {row.components.map((use, i) => (
                                        <span key={use.id}>
                                            <Link href={use.href}>{use.name}</Link>
                                            {i < row.components.length - 1 ? ", " : null}
                                        </span>
                                    ))}
                                </span>
                            ) : (
                                "—"
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
