import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type PreviewContainerProps<T extends ElementType = "div"> = {
    as?: T;
    children: ReactNode;
    innerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children">;
