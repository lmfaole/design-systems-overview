"use client";

import { useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import {
    ExpandableTableRow,
    ExpandableTableRowController,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

const rows = [
    {
        id: "bil",
        product: "Bilforsikring",
        premium: 1200,
        details: ["Leiebil i 14 dager", "Egenandel 6 000 kr"],
    },
    {
        id: "reise",
        product: "Reiseforsikring",
        premium: 540,
        details: ["Dekning i hele verden", "Bagasje inntil 30 000 kr"],
    },
];

const numberFormatter = new Intl.NumberFormat("nb-NO");

function formatPremium(value: number) {
    return `${numberFormatter.format(value)} kr`;
}

export function ExpandableRowsExample() {
    const [openRowId, setOpenRowId] = useState<string | null>(rows[0]?.id ?? null);

    return (
        <Flex direction="column" gap="s">
            <Table caption={<TableCaption>Forsikringsdetaljer</TableCaption>} fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Detaljer</TableHeader>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col" align="right">Pris per år</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <ExpandableTableRow
                            key={row.id}
                            isOpen={openRowId === row.id}
                            onToggle={(nextOpen) => setOpenRowId(nextOpen ? row.id : null)}
                            expandedChildren={(
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Flex direction="column" gap="xs">
                                            {row.details.map((detail) => (
                                                <span key={detail}>{detail}</span>
                                            ))}
                                        </Flex>
                                    </TableCell>
                                </TableRow>
                            )}
                        >
                            <ExpandableTableRowController>
                                {openRowId === row.id ? "Skjul" : "Vis"}
                            </ExpandableTableRowController>
                            <TableCell>{row.product}</TableCell>
                            <TableCell align="right">{formatPremium(row.premium)}</TableCell>
                        </ExpandableTableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}

export function MissingColSpanExample() {
    return (
        <Flex direction="column" gap="s">
            <Table caption={<TableCaption>Utvidelse uten riktig colSpan</TableCaption>} fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Detaljer</TableHeader>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col" align="right">Pris per år</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ExpandableTableRow
                        expandedChildren={(
                            <TableRow>
                                <TableCell colSpan={1}>
                                    Innholdet får ikke plass når colSpan ikke dekker alle kolonner.
                                </TableCell>
                            </TableRow>
                        )}
                    >
                        <ExpandableTableRowController>Vis</ExpandableTableRowController>
                        <TableCell>Bilforsikring</TableCell>
                        <TableCell align="right">{formatPremium(1200)}</TableCell>
                    </ExpandableTableRow>
                </TableBody>
            </Table>
        </Flex>
    );
}
