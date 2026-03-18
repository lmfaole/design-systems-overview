"use client";

import { Flex } from "@fremtind/jokul/flex";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";
import type { ComponentExampleProps } from "../types";

type PremiumRow = {
    product: string;
    premium: string;
};

const rows: PremiumRow[] = [
    { product: "Bilforsikring", premium: "1 200 kr" },
    { product: "Reiseforsikring", premium: "540 kr" },
];

const alignments = ["left", "center", "right"] as const;

type Align = (typeof alignments)[number];

export function TableHeaderExample(props: ComponentExampleProps) {
    const align = typeof props.align === "string" && alignments.includes(props.align as Align)
        ? (props.align as Align)
        : "right";
    const srOnly = props.srOnly === true;

    return (
        <Flex direction="column" gap="s">
            <Table caption={<TableCaption>Premieoversikt</TableCaption>} fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col" srOnly={srOnly}>Produkt</TableHeader>
                        <TableHeader scope="col" align={align} srOnly={srOnly}>Pris per år</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell>{row.product}</TableCell>
                            <TableCell align={align}>{row.premium}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
