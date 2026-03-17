"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";
import { Flex } from "@fremtind/jokul/flex";

const rows = [
    { product: "Bilforsikring", premium: "1 200 kr", status: "Aktiv" },
    { product: "Reiseforsikring", premium: "540 kr", status: "Aktiv" },
];

export function ResponsiveTableExample() {
    return (
        <Flex direction="column" gap="s">
            <Table
                caption={<TableCaption>Forsikringer</TableCaption>}
                collapseToList
                fullWidth
            >
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col" align="right">Pris</TableHeader>
                        <TableHeader scope="col">Status</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell data-th="Produkt">{row.product}</TableCell>
                            <TableCell data-th="Pris" align="right">{row.premium}</TableCell>
                            <TableCell data-th="Status">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}

export function MissingDataThExample() {
    return (
        <Flex direction="column" gap="s">
            <Table
                caption={<TableCaption>Uten data-th</TableCaption>}
                collapseToList
                fullWidth
            >
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col" align="right">Pris</TableHeader>
                        <TableHeader scope="col">Status</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell>{row.product}</TableCell>
                            <TableCell align="right">{row.premium}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
