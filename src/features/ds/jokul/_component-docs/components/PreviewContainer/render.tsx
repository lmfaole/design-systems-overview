import { useState, type ElementType } from "react";
import { PreviewHoverContext } from "./context";
import "./styles.scss";
import type { PreviewContainerProps } from "./types";

export function PreviewContainer<T extends ElementType = "div">({
    as,
    children,
    innerClassName,
    ...rest
}: PreviewContainerProps<T>) {
    const [hovered, setHovered] = useState(false);
    const Tag = (as ?? "div") as ElementType;

    return (
        <Tag
            {...rest}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <PreviewHoverContext value={hovered}>
                {innerClassName ? <div className={innerClassName}>{children}</div> : children}
            </PreviewHoverContext>
        </Tag>
    );
}
