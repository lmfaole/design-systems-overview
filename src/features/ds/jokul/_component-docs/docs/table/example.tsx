
import { Flex } from "@fremtind/jokul/flex";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";
import type { ComponentExampleProps } from "../types";

type PremiumRow = {
    product: string;
    type: string;
    premium: number;
};

const rows: PremiumRow[] = [
    { product: "Bilforsikring", type: "Kasko", premium: 1200 },
    { product: "Reiseforsikring", type: "Helårs", premium: 540 },
    { product: "Innboforsikring", type: "Standard", premium: 680 },
];

const numberFormatter = new Intl.NumberFormat("nb-NO");

function formatPremium(value: number) {
    return `${numberFormatter.format(value)} kr`;
}

export function TableExample(props: ComponentExampleProps) {
    const caption = typeof props.caption === "string" && props.caption.trim().length > 0
        ? props.caption.trim()
        : "Forsikringspremier";
    const collapseToList = props.collapseToList === true;
    const fullWidth = props.fullWidth === true;
    const totalPremium = rows.reduce((sum, row) => sum + row.premium, 0);

    return (
        <Flex direction="column" gap="s">
            <Table
                caption={<TableCaption>{caption}</TableCaption>}
                collapseToList={collapseToList}
                fullWidth={fullWidth}
            >
                <TableHead>
                    <TableRow>
                        <TableHeader scope="col">Produkt</TableHeader>
                        <TableHeader scope="col">Type</TableHeader>
                        <TableHeader scope="col" align="right">Pris per år</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.product}>
                            <TableCell data-th="Produkt">{row.product}</TableCell>
                            <TableCell data-th="Type">{row.type}</TableCell>
                            <TableCell data-th="Pris per år" align="right">
                                {formatPremium(row.premium)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell data-th="Produkt" colSpan={2}>Sum</TableCell>
                        <TableCell data-th="Pris per år" align="right">
                            {formatPremium(totalPremium)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Flex>
    );
}
