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
import { Flex } from "@fremtind/jokul/flex";

const rows = [
    { product: "Bilforsikring", premium: 1200 },
    { product: "Reiseforsikring", premium: 540 },
    { product: "Innboforsikring", premium: 680 },
];

type SortKey = "product" | "premium";

const numberFormatter = new Intl.NumberFormat("nb-NO");

function formatPremium(value: number) {
    return `${numberFormatter.format(value)} kr`;
}

export function SortableTableExample() {
    const [sortKey, setSortKey] = useState<SortKey>("product");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("asc");

    const { getSortProps } = useSortableTableHeader(sortKey, sortDirection, (nextKey, nextDirection) => {
        setSortKey(nextKey as SortKey);
        setSortDirection(nextDirection);
    });

    const sortedRows = useMemo(() => {
        if (sortDirection === "none") return rows;
        const direction = sortDirection === "asc" ? 1 : -1;
        const collator = new Intl.Collator("nb");

        return [...rows].sort((a, b) => {
            if (sortKey === "premium") return (a.premium - b.premium) * direction;
            return collator.compare(a.product, b.product) * direction;
        });
    }, [sortKey, sortDirection]);

    return (
        <Flex direction="column" gap="s">
            <Table caption={<TableCaption>Sorterbare premier</TableCaption>} fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader sortable={getSortProps("product").sortable}>Produkt</TableHeader>
                        <TableHeader align="right" sortable={getSortProps("premium").sortable}>
                            Pris per år
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell>{row.product}</TableCell>
                            <TableCell align="right">{formatPremium(row.premium)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}

export function ClickableHeaderExample() {
    const [sortKey, setSortKey] = useState<SortKey>("product");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const sortedRows = useMemo(() => {
        const direction = sortDirection === "asc" ? 1 : -1;
        const collator = new Intl.Collator("nb");

        return [...rows].sort((a, b) => {
            if (sortKey === "premium") return (a.premium - b.premium) * direction;
            return collator.compare(a.product, b.product) * direction;
        });
    }, [sortKey, sortDirection]);

    const toggleSort = (key: SortKey) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDirection("asc");
            return;
        }
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <Flex direction="column" gap="s">
            <Table caption={<TableCaption>Uten sorteringshint</TableCaption>} fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader onClick={() => toggleSort("product")}>Produkt</TableHeader>
                        <TableHeader align="right" onClick={() => toggleSort("premium")}>
                            Pris per år
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell>{row.product}</TableCell>
                            <TableCell align="right">{formatPremium(row.premium)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
