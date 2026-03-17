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
import { Search } from "@fremtind/jokul/search";
import { BETA_Select as Select } from "@fremtind/jokul/select";
import type { PatternCategory } from "@/app/jokul/_pattern/posts/types";
import { Toolbar } from "@/shared/components/Toolbar";

export interface PatternOverviewRow {
    id: number;
    title: string;
    href: string;
    category: PatternCategory;
    goals: string;
    components: Array<{ id: string; name: string; href: string }>;
}

interface PatternOverviewTableProps {
    rows: PatternOverviewRow[];
    showFilters?: boolean;
}

type SortKey = "id" | "title" | "category";

const CATEGORY_LABELS: Record<PatternCategory, string> = {
    handlinger: "Handlinger",
    navigasjon: "Navigasjon",
    tilbakemelding: "Tilbakemelding",
    struktur: "Struktur",
};

const COLUMNS = [
    { key: "id" as const, label: "Id", sortable: true },
    { key: "title" as const, label: "Tittel", sortable: true },
    { key: "category" as const, label: "Kategori", sortable: true },
    { key: "goals" as const, label: "Mål", sortable: false },
    { key: "components" as const, label: "Komponenter", sortable: false },
];

export function PatternOverviewTable({ rows, showFilters = true }: PatternOverviewTableProps) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<PatternCategory | "">("");
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

    const availableCategories = useMemo(
        () =>
            Array.from(new Set(rows.map((row) => row.category))).sort((a, b) =>
                CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b], "nb"),
            ),
        [rows],
    );

    const filteredRows = useMemo(() => {
        const q = query.toLowerCase().trim();
        return rows.filter((row) => {
            if (activeCategory && row.category !== activeCategory) return false;
            if (!q) return true;
            const matchesCategory = CATEGORY_LABELS[row.category].toLowerCase().includes(q);
            const matchesComponents = row.components.some((comp) =>
                comp.name.toLowerCase().includes(q),
            );
            return (
                row.title.toLowerCase().includes(q) ||
                row.goals.toLowerCase().includes(q) ||
                matchesCategory ||
                matchesComponents
            );
        });
    }, [rows, query, activeCategory]);

    const sortedRows = useMemo(() => {
        if (sortDirection === "none") return filteredRows;

        const collator = new Intl.Collator("nb");
        const direction = sortDirection === "asc" ? 1 : -1;

        function getValue(row: PatternOverviewRow): string | number {
            if (sortKey === "id") return row.id;
            if (sortKey === "category") return CATEGORY_LABELS[row.category];
            return row.title;
        }

        return filteredRows
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
    }, [filteredRows, sortDirection, sortKey]);

    return (
        <>
            {showFilters && (
                <Toolbar>
                    <Search
                        label="Søk i mønstre"
                        labelProps={{ srOnly: false }}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Tittel, mål eller komponent…"
                    />
                    <Select
                        label="Kategori"
                        name="filter-pattern-category"
                        value={activeCategory}
                        onChange={(event) =>
                            setActiveCategory((event.target.value as PatternCategory) || "")
                        }
                    >
                        <option value="">Alle kategorier</option>
                        {availableCategories.map((category) => (
                            <option key={category} value={category}>
                                {CATEGORY_LABELS[category]}
                            </option>
                        ))}
                    </Select>
                </Toolbar>
            )}
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
                                {CATEGORY_LABELS[row.category]}
                            </TableCell>
                            <TableCell data-th={COLUMNS[3].label}>
                                {row.goals}
                            </TableCell>
                            <TableCell data-th={COLUMNS[4].label}>
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
        </>
    );
}
