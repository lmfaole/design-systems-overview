import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { componentDocs } from "@/data/jokul/component-docs";

vi.mock("@/features/ds/jokul/_component-docs/utils/example-controls", () => ({
    buildExampleControls: () => ["generated-controls"],
}));

vi.mock("@fremtind/jokul/flex", () => ({
    Flex: ({ as: Tag = "div", children, direction, gap, alignItems, justifyContent, ...props }: any) => (
        <Tag
            data-flex=""
            data-direction={direction}
            data-gap={gap}
            data-align-items={alignItems}
            data-justify-content={justifyContent}
            {...props}
        >
            {children}
        </Tag>
    ),
}));

vi.mock("@fremtind/jokul/tabs", () => ({
    NavTabs: ({ children, ...props }: any) => <div data-nav-tabs="" {...props}>{children}</div>,
    NavTab: ({ as: Tag = "button", children, ...props }: any) => <Tag data-nav-tab="" {...props}>{children}</Tag>,
}));

vi.mock("@fremtind/jokul/card", () => ({
    Card: ({ as: Tag = "div", children, ...props }: any) => <Tag data-card="" {...props}>{children}</Tag>,
}));

vi.mock("@fremtind/jokul/help", () => ({
    Help: ({ children }: any) => <span data-help="">{children}</span>,
}));

vi.mock("@fremtind/jokul/description-list", () => ({
    DescriptionList: ({ children, separators, alignment, className, ...props }: any) => (
        <dl
            data-description-list=""
            data-separators={String(Boolean(separators))}
            data-alignment={alignment}
            className={className}
            {...props}
        >
            {children}
        </dl>
    ),
    DescriptionTerm: ({ children }: any) => <dt>{children}</dt>,
    DescriptionDetail: ({ children }: any) => <dd>{children}</dd>,
}));

vi.mock("@fremtind/jokul/message", () => ({
    Message: ({ children, ...props }: any) => <div data-message="" {...props}>{children}</div>,
}));

vi.mock("@fremtind/jokul/link", () => ({
    Link: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/PropTable", () => ({
    PropTable: ({ props }: any) => <section data-prop-table="" data-prop-count={props.length} />,
}));

vi.mock("@/features/ds/jokul/_component-docs/components/MigrationExample", () => ({
    MigrationExample: ({ migration }: any) => <div data-migration-example="">{migration.title}</div>,
}));

vi.mock("@/features/ds/jokul/_shared/components/NotFound", () => ({
    NotFound: ({ message }: any) => <main data-not-found="">{message}</main>,
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
    PageHeader: ({ title, description }: any) => (
        <header data-page-header="">
            <h1>{title}</h1>
            <p>{description}</p>
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
    ComponentExample: ({ controls }: any) => (
        <section data-component-example="" data-controls={JSON.stringify(controls)} />
    ),
}));

import { ComponentPageClient } from "./render";

describe("ComponentPageClient registry coverage", () => {
    it("loads every registered component doc into the detail page", () => {
        for (const doc of componentDocs) {
            const html = renderToStaticMarkup(
                <ComponentPageClient id={doc.id} relatedPatterns={[]} />,
            );

            expect(html).not.toContain('data-not-found=""');
            expect(html).toContain('data-article=""');
            expect(html).toContain('data-page-header=""');
            expect(html).toContain(`>${doc.name}<`);
            expect(html).toContain('data-prop-table=""');
            expect(html).toContain(">Metadata<");
            expect(html).toContain(doc.package);
            expect(html).not.toContain('data-component-example=""');
        }
    });
});
