import React, { useMemo, useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import { Search } from "@fremtind/jokul/search";
import { NavLink } from "@fremtind/jokul/nav-link";
import { Toolbar } from "@/features/ds/jokul/_shared/components/Toolbar";
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
import type { PropSource } from "@/features/ds/jokul/_component-docs/data";
import { ALL_PROP_ENTRIES } from "@/features/ds/jokul/_component-docs/prop-index";
import { PageHeader } from "@/components/ds/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import "./styles.scss";

const SOURCE_LABEL: Record<PropSource, string> = {
    custom: "Egendefinert",
    native: "Native HTML",
    aria: "ARIA",
    react: "React",
};

export default function PropIndexPage() {
    const [propQuery, setPropQuery] = useState("");
    const [sortKey, setSortKey] = useState("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("asc");
    useLocalStorage("comp-prop-sort-v2", "name");

    const { getSortProps } = useSortableTableHeader(sortKey, sortDirection, (key, dir) => {
        setSortKey(key);
        setSortDirection(dir);
    });

    const filteredProps = useMemo(() => {
        const q = propQuery.toLowerCase().trim();
        const results = ALL_PROP_ENTRIES.filter(
            (entry) =>
                !q ||
                entry.propName.toLowerCase().includes(q) ||
                entry.usedBy.some((component) => component.name.toLowerCase().includes(q)),
        );
        return results.sort((a, b) => {
            const dir = sortDirection === "desc" ? -1 : 1;
            if (sortKey === "source") return dir * a.source.localeCompare(b.source, "nb");
            if (sortKey === "usedBy") return dir * (a.usedBy.length - b.usedBy.length);
            return dir * a.propName.localeCompare(b.propName, "nb");
        });
    }, [propQuery, sortKey, sortDirection]);

    return (
        <Flex as="main" className="page" direction="column" gap="xl">
            <PageHeader
                title="Komponentdokumentasjon"
                description="Detaljert API-dokumentasjon, prop-tabeller og levende eksempler for komponenter fra Jøkul. Bruk dette som referanse når du bygger med designsystemet."
            />

            <NavLink href="/ds/jokul/component">Komponenter</NavLink>

            <Toolbar>
                <Search
                    label="Filtrer props"
                    labelProps={{ srOnly: false }}
                    value={propQuery}
                    onChange={(e) => setPropQuery(e.target.value)}
                    placeholder="Propnavn eller komponentnavn…"
                />
            </Toolbar>
            <Table caption={<TableCaption srOnly>Props-oversikt</TableCaption>} collapseToList fullWidth>
                <TableHead>
                    <TableRow>
                        <TableHeader sortable={getSortProps("name").sortable}>Prop</TableHeader>
                        <TableHeader sortable={getSortProps("source").sortable}>Kilde</TableHeader>
                        <TableHeader sortable={getSortProps("usedBy").sortable}>Brukt i</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProps.map((entry) => (
                        <TableRow key={entry.propName}>
                            <TableCell data-th="Prop">
                                <code>{entry.propName}</code>
                            </TableCell>
                            <TableCell data-th="Kilde">{SOURCE_LABEL[entry.source]}</TableCell>
                            <TableCell data-th="Brukt i">
                                {entry.usedBy.map((component, index) => (
                                    <span key={component.id}>
                                        <Link href={`/ds/jokul/component/${component.id}`}>{component.name}</Link>
                                        {index < entry.usedBy.length - 1 && (
                                            <span style={{ color: "var(--jkl-color-text-subdued)" }}>, </span>
                                        )}
                                    </span>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
