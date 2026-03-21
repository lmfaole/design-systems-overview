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

import { ComponentCard } from "./ComponentCard";

describe("ComponentCard", () => {
    it("renders the component name, description, and link target without preview content on the server", () => {
        const html = renderToStaticMarkup(
            <ComponentCard
                doc={{
                    id: "button",
                    name: "Button",
                    description: { short: "Kort beskrivelse" },
                    preview: <span>Forhåndsvisning</span>,
                } as any}
            />,
        );

        expect(html).toContain('href="/ds/jokul/component/button"');
        expect(html).toContain('aria-label="Button"');
        expect(html).toContain(">Button<");
        expect(html).toContain("Kort beskrivelse");
        expect(html).not.toContain("Forhåndsvisning");
    });

    it("omits preview content when the component has no preview", () => {
        const html = renderToStaticMarkup(
            <ComponentCard
                doc={{
                    id: "link",
                    name: "Link",
                    description: { short: "Lenke" },
                    preview: null,
                } as any}
            />,
        );

        expect(html).toContain('href="/ds/jokul/component/link"');
        expect(html).toContain(">Link<");
        expect(html).not.toContain('data-preview-context');
    });
});
