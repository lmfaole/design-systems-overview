"use client";

import { useEffect, useState } from "react";
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
import type { ComponentExampleProps } from "../types";

const row = {
    product: "Bilforsikring",
    premium: 1200,
    details: ["Leiebil i 14 dager", "Egenandel 6 000 kr"],
};

const numberFormatter = new Intl.NumberFormat("nb-NO");

function formatPremium(value: number) {
    return `${numberFormatter.format(value)} kr`;
}

export function ExpandableTableRowExample(props: ComponentExampleProps) {
    const preferredOpen = props.isOpen === true;
    const collapseToList = props.collapseToList === true;
    const [isOpen, setIsOpen] = useState(preferredOpen);

    useEffect(() => {
        setIsOpen(preferredOpen);
    }, [preferredOpen]);

    return (
        <Flex direction="column" gap="s">
            <Table
                caption={<TableCaption>Forsikringsdetaljer</TableCaption>}
                fullWidth
                collapseToList={collapseToList}
            >
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Detaljer</TableHeader>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col" align="right">Pris per år</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ExpandableTableRow
                        isOpen={isOpen}
                        onToggle={(nextOpen) => setIsOpen(nextOpen)}
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
                        <ExpandableTableRowController data-th="Detaljer">
                            Vis detaljer
                        </ExpandableTableRowController>
                        <TableCell data-th="Produkt">{row.product}</TableCell>
                        <TableCell data-th="Pris per år" align="right">
                            {formatPremium(row.premium)}
                        </TableCell>
                    </ExpandableTableRow>
                </TableBody>
            </Table>
        </Flex>
    );
}
