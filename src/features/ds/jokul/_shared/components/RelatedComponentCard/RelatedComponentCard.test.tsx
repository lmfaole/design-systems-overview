import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@fremtind/jokul/card", () => ({
    Card: ({ as: Tag = "div", children, clickable, padding, variant, ...props }: any) => (
        <Tag
            data-card=""
            data-clickable={String(Boolean(clickable))}
            data-padding={padding}
            data-variant={variant}
            {...props}
        >
            {children}
        </Tag>
    ),
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

vi.mock("@/features/ds/jokul/_component-docs/components/PreviewContainer", () => ({
    PreviewHoverContext: ({ children }: any) => <div data-preview-context="">{children}</div>,
}));

vi.mock("@/features/ds/jokul/_shared/components/SplitCard", () => ({
    SplitCard: ({ preview, content, layout, minWidth }: any) => (
        <section data-split-card="" data-layout={layout} data-min-width={minWidth}>
            <div data-slot="preview">{preview}</div>
            <div data-slot="content">{content}</div>
        </section>
    ),
}));

import { RelatedComponentCard } from "./RelatedComponentCard";

describe("RelatedComponentCard", () => {
    it("renders the related component link and description", () => {
        const html = renderToStaticMarkup(
            <RelatedComponentCard
                doc={{ id: "tooltip", name: "Tooltip", preview: <span>Preview</span> }}
                description="Brukes sammen med feltet."
            />,
        );

        expect(html).toContain('href="/ds/jokul/component/tooltip"');
        expect(html).toContain(">Tooltip<");
        expect(html).toContain("Brukes sammen med feltet.");
        expect(html).toContain('data-layout="auto"');
        expect(html).toContain('data-min-width="36rem"');
    });

    it("passes through the horizontal layout variant", () => {
        const html = renderToStaticMarkup(
            <RelatedComponentCard
                doc={{ id: "popover", name: "Popover", preview: null }}
                description="Alternativ presentasjon."
                layout="horizontal"
            />,
        );

        expect(html).toContain('data-layout="horizontal"');
    });
});
