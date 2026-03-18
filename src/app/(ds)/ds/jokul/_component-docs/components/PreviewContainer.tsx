"use client";

import { useState, ElementType, ComponentPropsWithoutRef } from "react";
import { PreviewHoverContext } from "@/app/ds/jokul/_component-docs/components/PreviewHoverContext";

type PreviewContainerProps<T extends ElementType = "div"> = {
    as?: T;
    children: React.ReactNode;
    innerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

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
