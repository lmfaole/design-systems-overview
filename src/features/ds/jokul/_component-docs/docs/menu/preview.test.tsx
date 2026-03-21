import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let lastMenuProps: Record<string, unknown> | undefined;

vi.mock("@fremtind/jokul/menu", async () => {
    const React = await import("react");

    return {
        Menu: (props: Record<string, unknown> & { children?: React.ReactNode; triggerElement?: React.ReactNode }) => {
            lastMenuProps = props;

            return (
                <div data-menu="true">
                    {props.triggerElement}
                    {props.children}
                </div>
            );
        },
        MenuItem: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
        MenuItemCheckbox: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
        MenuDivider: () => <hr />,
    };
});

vi.mock("@fremtind/jokul/button", async () => {
    const React = await import("react");

    return {
        Button: ({
            children,
            icon,
            ...props
        }: {
            children?: React.ReactNode;
            icon?: React.ReactNode;
        } & Record<string, unknown>) => (
            <button type="button" {...props}>
                {icon}
                {children}
            </button>
        ),
    };
});

vi.mock("@fremtind/jokul/icon", async () => {
    const React = await import("react");

    return {
        Icon: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
    };
});

import { MenuPreview } from "./preview";

describe("MenuPreview", () => {
    beforeEach(() => {
        lastMenuProps = undefined;
    });

    it("keeps the menu uncontrolled so the trigger can open it", () => {
        const html = renderToStaticMarkup(<MenuPreview />);

        expect(html).toContain("Handlinger");
        expect(html).toContain("Rediger");
        expect(lastMenuProps?.isOpen).toBeUndefined();
        expect(lastMenuProps?.onToggle).toBeUndefined();
    });

    it("forwards the documented placement and behavior props to Menu", () => {
        renderToStaticMarkup(
            <MenuPreview
                initialPlacement="right-end"
                openOnHover={true}
                keepOpenOnClickOutside={true}
            />,
        );

        expect(lastMenuProps?.initialPlacement).toBe("right-end");
        expect(lastMenuProps?.openOnHover).toBe(true);
        expect(lastMenuProps?.keepOpenOnClickOutside).toBe(true);
    });
});
