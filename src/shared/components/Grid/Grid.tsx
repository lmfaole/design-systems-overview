import "./grid.scss";

export type SemanticSpacing = "none" | "xxs" | "xs" | "s" | "m" | "l" | "xl";

// Min column width per preferred column count — controls where wrapping kicks in.
const COL_MIN_WIDTHS: Record<number, string> = {
    1: "100%",
    2: "28rem",
    3: "20rem",
    4: "16rem",
    5: "12rem",
    6: "10rem",
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    gap?: SemanticSpacing;
    /** Preferred number of columns at full width. Falls back gracefully at smaller sizes. */
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Grid({ as: Tag = "div", gap = "m", columns, className, style, children, ...rest }: GridProps) {
    const classes = ["grid", className].filter(Boolean).join(" ");
    const colMin = columns ? COL_MIN_WIDTHS[columns] : undefined;
    const inlineStyle = colMin
        ? { "--grid-col-min": colMin, "--grid-cols": columns, ...style }
        : style;

    return (
        <Tag
            className={classes}
            data-columns={columns}
            data-gap={`var(--jkl-spacing-${gap})`}
            style={inlineStyle as React.CSSProperties}
            {...rest}
        >
            {children}
        </Tag>
    );
}
