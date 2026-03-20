import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";
import "./full-bleed.scss";

type DotVariant = true | "on" | "fade-top" | "fade-bottom";

export type FullBleedProps<E extends ElementType = "div"> = {
    as?: E;
    className?: string;
    dots?: DotVariant;
    dotColor?: string;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className">;

export function FullBleed<E extends ElementType = "div">({
    as,
    className,
    dots,
    dotColor,
    style,
    ...props
}: FullBleedProps<E>) {
    const Tag = (as ?? "div") as ElementType;
    const dotClass =
        dots === "fade-top" ? "ds-full-bleed--dots-fade-top"
        : dots === "fade-bottom" ? "ds-full-bleed--dots-fade-bottom"
        : dots ? "ds-full-bleed--dots"
        : undefined;

    return (
        <Tag
            className={["ds-full-bleed", dotClass, className].filter(Boolean).join(" ")}
            style={{
                ...(dotColor ? { "--ds-full-bleed-dot-color": dotColor } : {}),
                ...style,
            } as CSSProperties}
            {...props}
        />
    );
}
