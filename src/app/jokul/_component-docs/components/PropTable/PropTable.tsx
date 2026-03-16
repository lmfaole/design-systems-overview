"use client";
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@fremtind/jokul/table";
import { Flex } from "@fremtind/jokul/flex";
import type { Migration, PropDef } from "@/app/jokul/_component-docs/data";
import { COLUMNS, inlineCodeStyle } from "./constants";
import { PropNameCell } from "./PropNameCell";
import { PropStatusCell } from "./PropStatusCell";
import { PropTypeCell } from "./PropTypeCell";

interface PropTableProps {
    props: PropDef[];
    migrations?: Migration[];
}

interface PropTableRowProps {
    prop: PropDef;
    migrationAnchor?: string;
}

function PropTableRow({prop, migrationAnchor}: PropTableRowProps) {
    const commonCells = (
        <>
            <TableCell data-th={COLUMNS[0]}>
                <PropNameCell name={prop.name} status={prop.status} migrationAnchor={migrationAnchor}/>
            </TableCell>
            <TableCell data-th={COLUMNS[1]}>
                <PropTypeCell prop={prop} renderPropTable={(nestedProps) => <PropTable props={nestedProps}/>}/>
            </TableCell>
            <TableCell data-th={COLUMNS[2]}>
                <span>{prop.required ? "Ja" : "Nei"}</span>
            </TableCell>
            <TableCell data-th={COLUMNS[3]}>
                {prop.default ? <code style={inlineCodeStyle}>{prop.default}</code> : "—"}
            </TableCell>
            <TableCell data-th={COLUMNS[4]}>
                <PropStatusCell status={prop.status} statusDescription={prop.statusDescription}/>
            </TableCell>
            <TableCell data-th={COLUMNS[5]}>
                <span>{prop.description}</span>
            </TableCell>
        </>
    );

    return (
        <TableRow>
            {commonCells}
        </TableRow>
    );
}

export function PropTable({props, migrations}: PropTableProps) {
    const migrationMap = new Map<string, string>(
        (migrations ?? []).map((m) => [m.deprecates.name, `#migration-${m.deprecates.name}`])
    );
    const sortedProps = props
        .map((prop, index) => ({prop, index}))
        .sort((a, b) => {
            if (a.prop.required === b.prop.required) return a.index - b.index;
            return a.prop.required ? -1 : 1;
        })
        .map(({prop}) => prop);

    return (
        <Flex direction="column" gap="m">
            <Table caption={<TableCaption srOnly>Props</TableCaption>} collapseToList fullWidth>
                <TableHead>
                    <TableRow>
                        {COLUMNS.map((col) => (
                            <TableHeader key={col}>
                                {col}
                            </TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedProps.map((prop) => (
                        <PropTableRow
                            key={prop.name}
                            prop={prop}
                            migrationAnchor={migrationMap.get(prop.name)}
                        />
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
