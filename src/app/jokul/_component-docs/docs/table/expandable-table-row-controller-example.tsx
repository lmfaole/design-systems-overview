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
    product: "Reiseforsikring",
    premium: 540,
    details: ["Dekning i hele verden", "Bagasje inntil 30 000 kr"],
};

const numberFormatter = new Intl.NumberFormat("nb-NO");

function formatPremium(value: number) {
    return `${numberFormatter.format(value)} kr`;
}

export function ExpandableTableRowControllerExample(props: ComponentExampleProps) {
    const preferredOpen = props.isOpen === true;
    const collapseToList = props.collapseToList === true;
    const label = typeof props.children === "string" && props.children.trim().length > 0
        ? props.children.trim()
        : "Vis detaljer";
    const dataTh = typeof props["data-th"] === "string" && props["data-th"].trim().length > 0
        ? props["data-th"].trim()
        : "Detaljer";
    const [isOpen, setIsOpen] = useState(preferredOpen);

    useEffect(() => {
        setIsOpen(preferredOpen);
    }, [preferredOpen]);

    return (
        <Flex direction="column" gap="s">
            <Table
                caption={<TableCaption>Reiseforsikring</TableCaption>}
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
                        <ExpandableTableRowController data-th={dataTh}>
                            {label}
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
