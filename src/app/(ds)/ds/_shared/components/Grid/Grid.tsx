import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import "./grid.scss";

const COL_MIN_WIDTHS: Record<number, string> = {
    1: "100%",
    2: "28rem",
    3: "20rem",
    4: "16rem",
    5: "12rem",
    6: "10rem",
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
    gap?: string;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Grid({ as: Tag = "div", gap, columns, className, style, children, ...rest }: GridProps) {
    const colMin = columns ? COL_MIN_WIDTHS[columns] : undefined;
    const inlineStyle = {
        ...(gap ? { "--ds-grid-gap": gap } : {}),
        ...(colMin ? { "--ds-grid-col-min": colMin, "--ds-grid-cols": columns } : {}),
        ...style,
    } as CSSProperties;

    return (
        <Tag
            className={["ds-grid", className].filter(Boolean).join(" ")}
            data-columns={columns}
            style={inlineStyle}
            {...rest}
        >
            {children}
        </Tag>
    );
}
