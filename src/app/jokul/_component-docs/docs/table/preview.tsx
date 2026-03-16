"use client";
import {
    DataTable,
    ExpandableTableRow,
    ExpandableTableRowController,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableFooter,
    TableHead,
    TableHeader,
    TablePagination,
    TableRow,
} from "@fremtind/jokul/table";

const dataRows = [
    ["Bilforsikring", "1 200 kr"],
    ["Reiseforsikring", "540 kr"],
];

export function TableHeadPreview() {
    return (
        <Table caption={<TableCaption>Head</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function TableBodyPreview() {
    return (
        <Table caption={<TableCaption>Body</TableCaption>} fullWidth>
            <TableBody>
                {dataRows.map((row, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{row[0]}</TableCell>
                        <TableCell align="right">{row[1]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export function TableCaptionPreview() {
    return (
        <Table caption={<TableCaption>Forsikringer</TableCaption>} fullWidth>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function TableRowPreview() {
    return (
        <Table caption={<TableCaption>Rader</TableCaption>} fullWidth>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Reiseforsikring</TableCell>
                    <TableCell align="right">540 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function TableHeaderPreview() {
    return (
        <Table caption={<TableCaption>Header</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris</TableHeader>
                </TableRow>
            </TableHead>
        </Table>
    );
}

export function TableCellPreview() {
    return (
        <Table caption={<TableCaption>Celler</TableCaption>} fullWidth>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function ExpandableTableRowPreview() {
    return (
        <Table caption={<TableCaption>Utvidbar rad</TableCaption>} fullWidth>
            <TableBody>
                <ExpandableTableRow
                    isOpen={true}
                    onToggle={() => undefined}
                    expandedChildren={
                        <TableRow>
                            <TableCell colSpan={3}>
                                <p style={{ margin: 0 }}>Detaljer om forsikringen.</p>
                            </TableCell>
                        </TableRow>
                    }
                >
                    <ExpandableTableRowController />
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </ExpandableTableRow>
            </TableBody>
        </Table>
    );
}

export function ExpandableTableRowControllerPreview() {
    return <ExpandableTableRowPreview />;
}

export function TableColumnPreview() {
    return (
        <Table caption={<TableCaption>Kolonner</TableCaption>} fullWidth>
            <TableColumn />
            <TableColumn />
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function TableColumnGroupPreview() {
    return (
        <Table caption={<TableCaption>Kolonnegrupper</TableCaption>} fullWidth>
            <TableColumnGroup>
                <TableColumn />
                <TableColumn />
            </TableColumnGroup>
            <TableBody>
                <TableRow>
                    <TableCell>Bilforsikring</TableCell>
                    <TableCell align="right">1 200 kr</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export function TableFooterPreview() {
    return (
        <Table caption={<TableCaption>Footer</TableCaption>} fullWidth>
            <TableBody>
                <TableRow>
                    <TableCell>Sum</TableCell>
                    <TableCell align="right">1 740 kr</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Totalt</TableCell>
                    <TableCell align="right">1 740 kr</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export function TablePaginationPreview() {
    return (
        <TablePagination
            totalNumberOfRows={20}
            rowsPerPage={5}
            rowsPerPageItems={[5, 10, 20]}
            activePage={1}
            onChange={() => undefined}
            onChangeRowsPerPage={() => undefined}
        />
    );
}

export function DataTablePreview() {
    return (
        <DataTable
            columns={["Produkt", "Pris"]}
            rows={dataRows}
        />
    );
}

export function TablePreview() {
    return (
        <Table caption={<TableCaption>Forsikringer</TableCaption>} fullWidth>
            <TableHead>
                <TableRow>
                    <TableHeader scope="col">Produkt</TableHeader>
                    <TableHeader scope="col" align="right">Pris</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataRows.map((row, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{row[0]}</TableCell>
                        <TableCell align="right">{row[1]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
