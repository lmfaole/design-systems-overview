/**
 * FullBleed
 *
 * Breaks out of the body's max-width and padding to fill the full viewport
 * width. Works inside any element that is a descendant of the centered body
 * (`max-width + margin: 0 auto`).
 *
 * Technique: `margin-inline: calc(50% - 50vw); width: 100vw`
 * — `50%` is half the containing block width.
 * — `50vw` is half the viewport width.
 * — The negative difference pulls both edges to the viewport boundary.
 *
 * No `position: relative` or `overflow: hidden` hacks required. The parent
 * must have `overflow-x: clip` (set on `.jkl` in `jokul.scss`) to prevent a
 * horizontal scrollbar when the viewport is exactly at the body max-width.
 *
 * Props:
 * - `as` — the HTML element or component to render (default: "div")
 * - `dots` — adds a dot-grid texture as a `::before` pseudo-element:
 *     - `true` / `"on"` — full coverage, no fade
 *     - `"fade-bottom"` — dots fade out toward the bottom (e.g. page headers)
 *     - `"fade-top"` — dots fade in from the top (e.g. bottom page sections)
 * - `className` — merged with the base `full-bleed` class
 * - All other props are forwarded to the root element
 */

import type { ElementType, ComponentPropsWithoutRef } from "react";
import "./full-bleed.scss";

type DotVariant = true | "on" | "fade-top" | "fade-bottom";

type FullBleedProps<E extends ElementType = "div"> = {
    as?: E;
    className?: string;
    dots?: DotVariant;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className">;

export function FullBleed<E extends ElementType = "div">({
    as,
    className,
    dots,
    ...props
}: FullBleedProps<E>) {
    const Tag = (as ?? "div") as ElementType;

    const dotClass =
        dots === "fade-top" ? "full-bleed--dots-fade-top"
        : dots === "fade-bottom" ? "full-bleed--dots-fade-bottom"
        : dots ? "full-bleed--dots"
        : undefined;

    const classes = ["full-bleed", dotClass, className].filter(Boolean).join(" ");

    return <Tag className={classes} {...props} />;
}
