import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const dataMocks = vi.hoisted(() => ({
    getComponentDoc: vi.fn(),
    getRelationships: vi.fn(),
    getParentAndSiblings: vi.fn(),
}));

const exampleControlMocks = vi.hoisted(() => ({
    buildExampleControls: vi.fn(() => ["generated-controls"]),
}));

vi.mock("@/features/ds/jokul/_component-docs/data", () => dataMocks);
vi.mock("@/features/ds/jokul/_component-docs/utils/example-controls", () => exampleControlMocks);

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({ as: Tag = "div", children, direction, gap, ...props }: any) => (
        <Tag data-flex="" data-direction={direction} data-gap={gap} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/tabs", () => ({
    NavTabs: ({ children, ...props }: any) => <div data-nav-tabs="" {...props}>{children}</div>,
    NavTab: ({ as: Tag = "button", children, ...props }: any) => <Tag data-nav-tab="" {...props}>{children}</Tag>,
}));

vi.mock("@fremtind/jokul/card", () => ({
    Card: ({ as: Tag = "div", children, padding, ...props }: any) => (
        <Tag data-card="" data-padding={padding} {...props}>
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/help", () => ({
    Help: ({ buttonText, children }: any) => (
        <span data-help={buttonText}>
            {children}
        </span>
    ),
}));

vi.mock("@fremtind/jokul/description-list", () => ({
    DescriptionList: ({ children, ...props }: any) => <dl data-description-list="" {...props}>{children}</dl>,
    DescriptionTerm: ({ children }: any) => <dt>{children}</dt>,
    DescriptionDetail: ({ children }: any) => <dd>{children}</dd>,
}));

vi.mock("@fremtind/jokul/message", () => ({
    Message: ({ variant, children }: any) => <div data-message={variant}>{children}</div>,
}));

vi.mock("@fremtind/jokul/link", () => ({
    Link: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/PropTable", () => ({
    PropTable: ({ props, migrations }: any) => (
        <section data-prop-table="" data-prop-count={props.length} data-migration-count={(migrations ?? []).length} />
    ),
}));

vi.mock("@/features/ds/jokul/_component-docs/components/MigrationExample", () => ({
    MigrationExample: ({ migration }: any) => <div data-migration-example="">{migration.title}</div>,
}));

vi.mock("@/features/ds/jokul/_shared/components/NotFound", () => ({
    NotFound: ({ message, backHref, backLabel }: any) => (
        <main data-not-found="">
            <h1>{message}</h1>
            <a href={backHref}>{backLabel}</a>
        </main>
    ),
}));

vi.mock("@/features/ds/jokul/_component-docs/components/AlternativesList", () => ({
    AlternativesList: ({ items }: any) => <div data-alternatives-list="">{items.length}</div>,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/SubcomponentsList", () => ({
    SubcomponentsList: ({ items }: any) => <div data-subcomponents-list="">{items.length}</div>,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/RelatedComponentsTable", () => ({
    RelatedComponentsTable: ({ items }: any) => <div data-related-components-table="">{items.length}</div>,
}));

vi.mock("@/components/ds/PageHeader", () => ({
    PageHeader: ({ title, description, background }: any) => (
        <header data-page-header="" data-has-background={String(Boolean(background))}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {background}
        </header>
    ),
}));

vi.mock("@/features/ds/jokul/_shared/components/Illustration", () => ({
    DotsIllustration: () => <svg data-dots-illustration="true" />,
}));

vi.mock("@/features/ds/jokul/_shared/components/Article", () => ({
    Article: ({ children }: any) => <article data-article="">{children}</article>,
    ArticleToc: () => <nav data-article-toc="">Innholdsfortegnelse</nav>,
}));

vi.mock("@/features/ds/jokul/_shared/components/CodeBlock/CopyButton", () => ({
    CopyButton: ({ code }: any) => <button data-copy-button="">{code}</button>,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/ComponentExample/ComponentExample", () => ({
    ComponentExample: ({ controls, children }: any) => (
        <section data-component-example="" data-controls={JSON.stringify(controls)}>
            {children}
        </section>
    ),
}));

import { ComponentPageClient } from "./render";

function createDoc(overrides: Record<string, unknown> = {}) {
    return {
        id: "button",
        name: "Button",
        description: {
            short: "Kort beskrivelse",
            long: "Lang beskrivelse",
        },
        package: "@fremtind/jokul/button",
        category: "Handlinger",
        status: "stable",
        props: [],
        migrations: [],
        complexity: {
            use: "easy",
            maintenance: "medium",
            notes: {
                use: "Enkel i bruk",
                maintenance: "Moderat vedlikehold",
            },
        },
        example: null,
        preview: null,
        ...overrides,
    } as any;
}

describe("ComponentPageClient", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        dataMocks.getRelationships.mockReturnValue({
            requires: [],
            alternatives: [],
            subcomponents: [],
            related: [],
        });
        dataMocks.getParentAndSiblings.mockReturnValue({ siblings: [] });
    });

    it("renders the not-found state when the component doc is missing", () => {
        dataMocks.getComponentDoc.mockReturnValue(undefined);

        const html = renderToStaticMarkup(
            <ComponentPageClient id="missing" relatedPatterns={[]} />,
        );

        expect(html).toContain('data-not-found=""');
        expect(html).toContain("Fant ikke komponenten");
        expect(html).toContain('href="/component"');
    });

    it("renders deprecated docs, related patterns, and generated example controls", () => {
        const doc = createDoc({
            status: "deprecated",
            props: [{ name: "variant" }],
            migrations: [
                {
                    title: "legacyProp",
                    deprecates: { name: "legacyProp" },
                    before: "<Button legacyProp />",
                    after: "<Button />",
                },
            ],
            example: <div>Eksempel</div>,
        });

        dataMocks.getComponentDoc.mockReturnValue(doc);

        const html = renderToStaticMarkup(
            <ComponentPageClient
                id="button"
                relatedPatterns={[
                    {
                        href: "/ds/monster/lastetilstander",
                        title: "Lastetilstander",
                        categoryLabel: "Status",
                        description: "Viser venting i brukerreisen.",
                        implementationTitles: ["HTML, CSS og JS", "Jøkul"],
                    },
                ]}
            />,
        );

        expect(html).toContain('data-message="warning"');
        expect(html).toContain("Denne komponenten er deprecated.");
        expect(html).not.toContain('data-component-example=""');
        expect(html).toContain('data-migration-example=""');
        expect(html).not.toContain('data-nav-tabs=""');
        expect(html).toContain("Brukes i mønstre");
        expect(html).toContain('href="/ds/monster/lastetilstander"');
        expect(html).toContain("HTML, CSS og JS, Jøkul");
        expect(exampleControlMocks.buildExampleControls).not.toHaveBeenCalled();
    });

    it("renders relationship sections and sibling headings for requires-based parents", () => {
        dataMocks.getComponentDoc.mockReturnValue(
            createDoc({
                props: [{ name: "children" }],
            }),
        );
        dataMocks.getRelationships.mockReturnValue({
            requires: [{ doc: { id: "field-group", name: "FieldGroup", preview: null }, description: "Kreves" }],
            alternatives: [{ doc: { id: "input-group", name: "InputGroup", preview: null }, description: "Alternativ" }],
            subcomponents: [{ doc: { id: "button-icon", name: "ButtonIcon", preview: null }, description: "Del" }],
            related: [{ doc: { id: "link", name: "Link", preview: null }, description: "Relatert" }],
        });
        dataMocks.getParentAndSiblings.mockReturnValue({
            parent: { id: "form", name: "Form" },
            siblings: [{ doc: { id: "checkbox", name: "Checkbox", preview: null }, description: "Søsken" }],
            kind: "requires",
        });

        const html = renderToStaticMarkup(
            <ComponentPageClient id="button" relatedPatterns={[]} />,
        );

        expect(html).toContain("Krever");
        expect(html).toContain("Delkomponenter");
        expect(html).toContain("Alternativer");
        expect(html).toContain("Relaterte komponenter");
        expect(html).toContain("Andre komponenter som krever Form");
        expect(html).toContain("Metadata");
        expect(html).toContain("@fremtind/jokul/button");
        expect(html).not.toContain("Brukes i mønstre");
    });
});
