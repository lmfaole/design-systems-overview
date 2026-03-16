"use client";

import {useEffect, useRef, useState} from "react";
import {Flex} from "@fremtind/jokul/flex";
import "./component-page.scss";
import {TableOfContents} from "@fremtind/jokul/table-of-contents";
import {NavTab, NavTabs} from "@fremtind/jokul/tabs";
import {Card} from "@fremtind/jokul/card";
import {Breadcrumb, BreadcrumbItem} from "@fremtind/jokul/breadcrumb";
import {useParams} from "next/navigation";
import type {Migration} from "@/app/jokul/_component-docs/data";
import {getComponentDoc, getParentAndSiblings, getRelationships} from "@/app/jokul/_component-docs/data";
import {PropTable} from "@/app/jokul/_component-docs/components/PropTable";
import {MigrationExample} from "@/app/jokul/_component-docs/components/MigrationExample";
import {NotFound} from "@/shared/components/NotFound";
import {AlternativesList} from "@/app/jokul/_component-docs/components/AlternativesList";
import {SubcomponentsList} from "@/app/jokul/_component-docs/components/SubcomponentsList";
import {RelatedComponentsTable} from "@/app/jokul/_component-docs/components/RelatedComponentsTable";
import {PageHero} from "@/shared/components/PageHero/PageHero";
import {DotsIllustration} from "@/shared/components/Illustration";
import {PreviewHoverContext} from "@/app/jokul/_component-docs/components/PreviewHoverContext";
import {Article, ArticleToc} from "@/shared/components/Article";

function MigrationSection({migrations}: { migrations: Migration[] }) {
    const [active, setActive] = useState<string>(migrations[0]?.deprecates.name ?? "");
    const pendingScroll = useRef<string | null>(null);

    useEffect(() => {
        if (pendingScroll.current) {
            const el = document.getElementById(`migration-${pendingScroll.current}`);
            if (el) {
                const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--jkl-spacing-xl")) || 64;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({top, behavior: "smooth"});
                pendingScroll.current = null;
            }
        }
    }, [active]);

    useEffect(() => {
        function handleHashChange() {
            const match = window.location.hash.match(/^#migration-(.+)$/);
            if (!match) return;
            const name = decodeURIComponent(match[1]);
            if (migrations.some((m) => m.deprecates.name === name)) {
                pendingScroll.current = name;
                setActive(name);
            }
        }

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [migrations]);

    const visible = migrations.filter((m) => m.deprecates.name === active);

    function selectTab(name: string) {
        pendingScroll.current = name;
        setActive(name);
    }

    return (
        <Flex as="section" direction="column" gap="m">
            <h3 id="migrering">Migrering av deprecated props</h3>
            <div>
                <NavTabs aria-label="Filtrer migrering">
                    {migrations.map((m) => (
                        <NavTab
                            key={m.deprecates.name}
                            as="button"
                            aria-selected={active === m.deprecates.name}
                            onClick={() => selectTab(m.deprecates.name)}
                        >
                            {m.deprecates.name}
                        </NavTab>
                    ))}
                </NavTabs>
                {visible.map((migration) => (
                    <Card
                        key={migration.title}
                        padding="l"

                        id={`migration-${migration.deprecates.name}`}
                    >
                        <MigrationExample migration={migration}/>
                    </Card>
                ))}
            </div>
        </Flex>
    );
}

export default function ComponentPage() {
    const {id} = useParams<{ id: string }>();
    const doc = getComponentDoc(id);
    const {requires, alternatives, subcomponents, related} = getRelationships(id);
    const {parent, siblings, kind: parentKind} = getParentAndSiblings(id);

    if (!doc) {
        return (
            <NotFound
                message="Fant ikke komponenten"
                backHref="/component"
                backLabel="Tilbake til alle komponenter"
            />
        );
    }

    const heroDescription = doc.description.long;
    const siblingsAnchor = parentKind === "requires" ? "andre-komponenter" : "andre-delkomponenter";

    const [previewHovered, setPreviewHovered] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPreviewHovered(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const breadcrumb = parent
        ? [
            {href: "/jokul/component", label: "Komponenter"},
            {href: `/jokul/component/${parent.id}`, label: parent.name},
            {label: doc.name, current: true},
        ]
        : [
            {href: "/jokul/component", label: "Komponenter"},
            {label: doc.name, current: true},
        ];

    return (
        <Article>
            <Breadcrumb aria-label="Komponentsti">
                {breadcrumb.map((item) => (
                    <BreadcrumbItem key={item.label} aria-current={item.current ? "page" : undefined}>
                        {item.current ? <span>{item.label}</span> : <a href={item.href!}>{item.label}</a>}
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>

            <PageHero
                title={doc.name}
                description={heroDescription}
                background={<DotsIllustration/>}
            />

            {doc.preview && (
                <div
                    className="component-page-preview"
                    onMouseEnter={() => setPreviewHovered(true)}
                    onMouseLeave={() => setPreviewHovered(false)}
                >
                    <Card padding="l" variant="outlined">
                        <PreviewHoverContext value={previewHovered}>
                            <div className="component-page-preview__area">
                                <Flex
                                    className="component-page-preview__area__inner"
                                    alignItems="center"
                                    justifyContent="center"
                                    inert
                                    aria-hidden="true"
                                >
                                    {doc.preview}
                                </Flex>
                            </div>
                        </PreviewHoverContext>
                    </Card>
                </div>
            )}

            <ArticleToc>
                {requires.length > 0 && (
                    <TableOfContents.Link href="#krever">Krever</TableOfContents.Link>
                )}
                <TableOfContents.Link href="#props">Props</TableOfContents.Link>
                {alternatives.length > 0 && (
                    <TableOfContents.Link href="#alternativer">Alternativer</TableOfContents.Link>
                )}
                {subcomponents.length > 0 && (
                    <TableOfContents.Link href="#delkomponenter">Delkomponenter</TableOfContents.Link>
                )}
                {siblings.length > 0 && (
                    <TableOfContents.Link href={`#${siblingsAnchor}`}>
                        {parentKind === "requires" ? "Andre komponenter" : "Andre delkomponenter"}
                    </TableOfContents.Link>
                )}
                {related.length > 0 && (
                    <TableOfContents.Link href="#relaterte-komponenter">Relaterte komponenter</TableOfContents.Link>
                )}
                {doc.migrations && doc.migrations.length > 0 && (
                    <TableOfContents.Link href="#migrering">Migrering</TableOfContents.Link>
                )}
            </ArticleToc>

            {requires.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="krever">Krever</h2>
                    <RelatedComponentsTable items={requires}/>
                </Flex>
            )}

            <Flex as="section" direction="column" gap="m">
                <h2 id="props">Props</h2>
                <PropTable props={doc.props} migrations={doc.migrations}/>
            </Flex>

            {doc.migrations && doc.migrations.length > 0 && (
                <MigrationSection migrations={doc.migrations}/>
            )}

            {subcomponents.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="delkomponenter">Delkomponenter</h2>
                    <SubcomponentsList items={subcomponents}/>
                </Flex>
            )}

            {alternatives.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="alternativer">Alternativer</h2>
                    <AlternativesList items={alternatives}/>
                </Flex>
            )}

            {siblings.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id={siblingsAnchor}>
                        {parentKind === "requires"
                            ? `Andre komponenter som krever ${parent?.name}`
                            : `Andre delkomponenter i ${parent?.name}`}
                    </h2>
                    {parentKind === "requires" ? (
                        <RelatedComponentsTable items={siblings}/>
                    ) : (
                        <SubcomponentsList items={siblings}/>
                    )}
                </Flex>
            )}

            {related.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="relaterte-komponenter">Relaterte komponenter</h2>
                    <RelatedComponentsTable items={related}/>
                </Flex>
            )}

        </Article>
    );
}
