import { useEffect, useRef, useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import { NavTab, NavTabs } from "@fremtind/jokul/tabs";
import { Card } from "@fremtind/jokul/card";
import { Help } from "@fremtind/jokul/help";
import { DescriptionDetail, DescriptionList, DescriptionTerm } from "@fremtind/jokul/description-list";
import { Message } from "@fremtind/jokul/message";
import { Link } from "@fremtind/jokul/link";
import { getComponentDoc, getParentAndSiblings, getRelationships } from "@/features/ds/jokul/_component-docs/data";
import { PropTable } from "@/features/ds/jokul/_component-docs/components/PropTable";
import { MigrationExample } from "@/features/ds/jokul/_component-docs/components/MigrationExample";
import { NotFound } from "@/features/ds/jokul/_shared/components/NotFound";
import { AlternativesList } from "@/features/ds/jokul/_component-docs/components/AlternativesList";
import { SubcomponentsList } from "@/features/ds/jokul/_component-docs/components/SubcomponentsList";
import { RelatedComponentsTable } from "@/features/ds/jokul/_component-docs/components/RelatedComponentsTable";
import type { RelatedComponentDoc } from "@/features/ds/jokul/_shared/components/RelatedComponentCard";
import { PageHeader } from "@/components/ds/PageHeader";
import { DotsIllustration } from "@/features/ds/jokul/_shared/components/Illustration";
import { Article, ArticleToc } from "@/features/ds/jokul/_shared/components/Article";
import { CopyButton } from "@/features/ds/jokul/_shared/components/CodeBlock/CopyButton";
import { ComponentExample } from "@/features/ds/jokul/_component-docs/components/ComponentExample/ComponentExample";
import { buildExampleControls } from "@/features/ds/jokul/_component-docs/utils/example-controls";
import "./styles.scss";
import type {
    ComplexityRowProps,
    ComponentPageClientProps,
    MigrationSectionProps,
    RelatedPatternsSectionProps,
} from "./types";

const COMPLEXITY_LABEL = {
    easy: "Enkel",
    medium: "Middels",
    hard: "Vanskelig",
};

function ComplexityRow({ rating, note }: ComplexityRowProps) {
    return (
        <Flex as="div" alignItems="center" gap="s" className="row">
            <span className="value">
                <Flex alignItems="center" gap="xs">
                    <span>{COMPLEXITY_LABEL[rating]}</span>
                    {note && <Help buttonText="Hvorfor?">{note}</Help>}
                </Flex>
            </span>
        </Flex>
    );
}

function MigrationSection({ migrations }: MigrationSectionProps) {
    const withAltNames = migrations.map((migration) => {
        const sameName = migrations.filter((candidate) => candidate.deprecates.name === migration.deprecates.name);
        const altIndex = sameName.length > 1 ? sameName.indexOf(migration) + 1 : 0;
        const displayName =
            altIndex > 0
                ? `${migration.deprecates.name} (valg ${altIndex})`
                : migration.deprecates.name;
        const anchorId =
            altIndex > 0
                ? `migration-${migration.deprecates.name}-alt-${altIndex}`
                : `migration-${migration.deprecates.name}`;
        return { migration, displayName, anchorId };
    });

    const [active, setActive] = useState<string>(withAltNames[0]?.displayName ?? "");
    const pendingScroll = useRef<string | null>(null);

    useEffect(() => {
        if (pendingScroll.current) {
            const element = document.getElementById(pendingScroll.current);
            if (element) {
                const offset =
                    parseFloat(
                        getComputedStyle(document.documentElement).getPropertyValue("--jkl-spacing-xl"),
                    ) || 64;
                const top = element.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
                pendingScroll.current = null;
            }
        }
    }, [active]);

    useEffect(() => {
        function handleHashChange() {
            const match = window.location.hash.match(/^#migration-(.+)$/);
            if (!match) return;
            const routeId = decodeURIComponent(match[1]);
            const targetId = `migration-${routeId}`;
            const target = withAltNames.find((item) => item.anchorId === targetId);
            if (target) {
                pendingScroll.current = target.anchorId;
                setActive(target.displayName);
            }
        }

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [migrations]);

    const visible = withAltNames.filter((item) => item.displayName === active);

    function selectTab(name: string) {
        pendingScroll.current = name;
        setActive(name);
    }

    return (
        <Flex as="section" direction="column" gap="m">
            <h3 id="migrering">Migreringsguider</h3>
            <div>
                <NavTabs aria-label="Filtrer migrering">
                    {withAltNames.map(({ displayName }) => (
                        <NavTab
                            key={displayName}
                            as="button"
                            aria-selected={active === displayName}
                            onClick={() => selectTab(displayName)}
                        >
                            {displayName}
                        </NavTab>
                    ))}
                </NavTabs>
                {visible.map(({ migration, anchorId }) => (
                    <Card key={migration.title} padding="l" id={anchorId}>
                        <MigrationExample migration={migration} />
                    </Card>
                ))}
            </div>
        </Flex>
    );
}

function RelatedPatternsSection({ patterns }: RelatedPatternsSectionProps) {
    if (patterns.length === 0) {
        return null;
    }

    return (
        <Flex as="section" direction="column" gap="m">
            <h2 id="monster-monstre">Brukes i mønstre</h2>
            <ul className="component-pattern-list">
                {patterns.map((pattern) => (
                    <li key={pattern.href}>
                        <Card padding="l" className="component-pattern-card">
                            <Flex direction="column" gap="s">
                                <small>{pattern.categoryLabel}</small>
                                <h3 className="component-pattern-title">
                                    <Link href={pattern.href}>{pattern.title}</Link>
                                </h3>
                                <p className="component-pattern-description">{pattern.description}</p>
                                <p className="component-pattern-meta">
                                    <strong>
                                        {pattern.implementationTitles.length === 1
                                            ? "Implementasjon"
                                            : "Implementasjoner"}
                                        :
                                    </strong>{" "}
                                    {pattern.implementationTitles.join(", ")}
                                </p>
                            </Flex>
                        </Card>
                    </li>
                ))}
            </ul>
        </Flex>
    );
}

export function ComponentPageClient({ id, relatedPatterns }: ComponentPageClientProps) {
    const doc = getComponentDoc(id);
    const { requires, alternatives, subcomponents, related } = getRelationships(id);
    const { parent, siblings, kind: parentKind } = getParentAndSiblings(id);

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
    const toRelatedItems = (items: typeof requires) =>
        items.map(({ doc: relatedDoc, description }) => ({
            doc: { id: relatedDoc.id, name: relatedDoc.name, preview: relatedDoc.preview } as RelatedComponentDoc,
            description,
        }));
    const requiresItems = toRelatedItems(requires);
    const siblingsItems = toRelatedItems(siblings);
    const relatedItems = toRelatedItems(related);
    const siblingsAnchor = parentKind === "requires" ? "andre-komponenter" : "andre-delkomponenter";

    return (
        <Article>
            <PageHeader
                title={doc.name}
                description={heroDescription}
                background={<DotsIllustration />}
            />

            <ArticleToc />

            {doc.status === "deprecated" && doc.migrations && doc.migrations.length > 0 && (
                <Message variant="warning">
                    Denne komponenten er deprecated. <Link href="#migrering">Se migrering</Link>.
                </Message>
            )}

            {doc.example && (
                <ComponentExample
                    controls={doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig)}
                >
                    {doc.example}
                </ComponentExample>
            )}

            <RelatedPatternsSection patterns={relatedPatterns} />

            {requiresItems.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="krever">Krever</h2>
                    <RelatedComponentsTable items={requiresItems} />
                </Flex>
            )}

            <Flex as="section" direction="column" gap="m">
                <h2 id="props">Props</h2>
                <PropTable props={doc.props} migrations={doc.migrations} />
            </Flex>

            {doc.migrations && doc.migrations.length > 0 && <MigrationSection migrations={doc.migrations} />}

            {subcomponents.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="delkomponenter">Delkomponenter</h2>
                    <SubcomponentsList items={subcomponents} />
                </Flex>
            )}

            {alternatives.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="alternativer">Alternativer</h2>
                    <AlternativesList items={alternatives} />
                </Flex>
            )}

            {siblingsItems.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id={siblingsAnchor}>
                        {parentKind === "requires"
                            ? `Andre komponenter som krever ${parent?.name}`
                            : `Andre delkomponenter i ${parent?.name}`}
                    </h2>
                    {parentKind === "requires" ? (
                        <RelatedComponentsTable items={siblingsItems} />
                    ) : (
                        <SubcomponentsList items={siblings} />
                    )}
                </Flex>
            )}

            {relatedItems.length > 0 && (
                <Flex as="section" direction="column" gap="m">
                    <h2 id="relaterte-komponenter">Relaterte komponenter</h2>
                    <RelatedComponentsTable items={relatedItems} />
                </Flex>
            )}

            <Flex as="section" direction="column" gap="s">
                <h2 id="metadata">Metadata</h2>
                <DescriptionList separators alignment="horizontal" className="component-metadata">
                    <DescriptionTerm>Status</DescriptionTerm>
                    <DescriptionDetail>
                        {doc.status === "stable" ? "Stabil" : doc.status === "beta" ? "Beta" : "Deprecated"}
                    </DescriptionDetail>

                    <DescriptionTerm>Kategori</DescriptionTerm>
                    <DescriptionDetail>{doc.category}</DescriptionDetail>

                    <DescriptionTerm>Import</DescriptionTerm>
                    <DescriptionDetail>
                        <Flex alignItems="center" gap="xs">
                            <code>{doc.package}</code>
                            <CopyButton code={doc.package} data-size="small" />
                        </Flex>
                    </DescriptionDetail>

                    <DescriptionTerm>Bruk</DescriptionTerm>
                    <DescriptionDetail>
                        <ComplexityRow rating={doc.complexity.use} note={doc.complexity.notes?.use} />
                    </DescriptionDetail>
                    <DescriptionTerm>Vedlikehold</DescriptionTerm>
                    <DescriptionDetail>
                        <ComplexityRow
                            rating={doc.complexity.maintenance}
                            note={doc.complexity.notes?.maintenance}
                        />
                    </DescriptionDetail>
                </DescriptionList>
            </Flex>
        </Article>
    );
}
