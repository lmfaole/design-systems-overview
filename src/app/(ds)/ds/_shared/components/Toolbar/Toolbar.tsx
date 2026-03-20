import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import "./toolbar.scss";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
    gap?: string;
    marginBlockEnd?: string;
}

export function Toolbar({
    as: Tag = "div",
    className,
    gap,
    marginBlockEnd,
    style,
    children,
    ...rest
}: ToolbarProps) {
    return (
        <Tag
            className={["ds-toolbar", className].filter(Boolean).join(" ")}
            style={{
                ...(gap ? { "--ds-toolbar-gap": gap } : {}),
                ...(marginBlockEnd ? { "--ds-toolbar-margin-block-end": marginBlockEnd } : {}),
                ...style,
            } as CSSProperties}
            {...rest}
        >
            {children}
        </Tag>
    );
}
