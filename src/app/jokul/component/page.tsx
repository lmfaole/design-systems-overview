"use client";

import {useMemo, useState} from "react";
import {Flex} from "@fremtind/jokul/flex";
import {Search} from "@fremtind/jokul/search";
import {BETA_Select as Select} from "@fremtind/jokul/select";
import {NavLink} from "@fremtind/jokul/nav-link";
import {SkeletonAnimation, SkeletonElement} from "@fremtind/jokul/loader";
import {componentDocs} from "@/app/jokul/_component-docs/data";
import {Grid} from "@/shared/components/Grid";
import {Toolbar} from "@/shared/components/Toolbar";
import {ComponentCard} from "@/shared/components/ComponentCard";
import {PageHeader} from "@/shared/components/PageHeader";
import {useLocalStorage} from "@/shared/hooks/useLocalStorage";
import "./component-index.scss";

const ALL_CATEGORIES = Array.from(
    new Set(componentDocs.filter((d) => d.showOnOverview !== false).map((d) => d.category))
).sort();

export default function ComponentsPage() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeStatus, setActiveStatus] = useState<"stable" | "beta" | "deprecated" | null>(null);
    const [sortBy, setSortBy, ready] = useLocalStorage("comp-sort", "az");

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        const results = componentDocs.filter((doc) => {
            if (doc.showOnOverview === false) return false;
            const matchesQuery =
                !q ||
                doc.name.toLowerCase().includes(q) ||
                doc.description.short.toLowerCase().includes(q) ||
                doc.description.long.toLowerCase().includes(q) ||
                doc.package.toLowerCase().includes(q);
            const matchesCategory = !activeCategory || doc.category === activeCategory;
            const status = doc.status;
            const matchesStatus = !activeStatus || status === activeStatus;
            return matchesQuery && matchesCategory && matchesStatus;
        });
        return results.sort((a, b) => {
            if (sortBy === "za") return b.name.localeCompare(a.name, "nb");
            if (sortBy === "most-props") return b.props.length - a.props.length;
            return a.name.localeCompare(b.name, "nb");
        });
    }, [query, activeCategory, activeStatus, sortBy]);

    if (!ready) {
        return (
            <Flex as="main" direction="column" gap="xl">
                <PageHeader
                    title="Komponentdokumentasjon"
                    description="Detaljert API-dokumentasjon, prop-tabeller og levende eksempler for komponenter fra Jøkul. Bruk dette som referanse når du bygger med designsystemet."
                />
                <SkeletonAnimation textDescription="Laster innstillinger…">
                    <SkeletonElement width="20rem" height="2.5rem" />
                    <SkeletonElement width="100%" height="12rem" className="component-index__skeleton-gap" />
                </SkeletonAnimation>
            </Flex>
        );
    }

    return (
        <Flex as="main" direction="column" gap="xl">
            <PageHeader
                title="Komponentdokumentasjon"
                description="Detaljert API-dokumentasjon, prop-tabeller og levende eksempler for komponenter fra Jøkul. Bruk dette som referanse når du bygger med designsystemet."
            />

            <NavLink href="/jokul/component/props">Props-oversikt</NavLink>

            <Toolbar>
                <Search
                    label="Søk etter komponent"
                    labelProps={{ srOnly: false }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Navn, beskrivelse eller pakke…"
                />
                <Select
                    label="Kategori"
                    name="filter-category"
                    value={activeCategory ?? ""}
                    onChange={(e) => setActiveCategory(e.target.value || null)}
                >
                    <option value="">Alle kategorier</option>
                    {ALL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>
                <Select
                    label="Status"
                    name="filter-status"
                    value={activeStatus ?? ""}
                    onChange={(e) => setActiveStatus((e.target.value as "stable" | "beta" | "deprecated") || null)}
                >
                    <option value="">Alle statuser</option>
                    <option value="stable">Stable</option>
                    <option value="beta">Beta</option>
                    <option value="deprecated">Deprecated</option>
                </Select>
                <Select
                    label="Sorter"
                    name="sort-components"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="az">A–Å</option>
                    <option value="za">Å–A</option>
                    <option value="most-props">Flest props</option>
                </Select>
            </Toolbar>

            {filtered.length === 0 ? (
                <p className="muted">Ingen komponenter samsvarer med søket.</p>
            ) : (
                <Grid columns={4}>
                    {filtered.map((doc) => (
                        <ComponentCard key={doc.id} doc={doc} />
                    ))}
                </Grid>
            )}
        </Flex>
    );
}
