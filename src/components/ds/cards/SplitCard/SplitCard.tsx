import type { HTMLAttributes, ReactNode } from "react";
import "./split-card.scss";

export interface SplitCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    preview?: ReactNode;
    content: ReactNode;
    layout?: "auto" | "horizontal";
    minWidth?: "22rem" | "36rem";
}

export function SplitCard({
    preview,
    content,
    className,
    layout = "auto",
    minWidth = "22rem",
    ...rest
}: SplitCardProps) {
    return (
        <div
            className={["ds-split-card", className].filter(Boolean).join(" ")}
            data-layout={layout === "horizontal" ? "horizontal" : undefined}
            data-min-width={minWidth === "36rem" ? "36rem" : undefined}
            {...rest}
        >
            <div className="container">
                {preview && (
                    <div className="preview">
                        {preview}
                    </div>
                )}
                <div className="content">
                    {content}
                </div>
            </div>
        </div>
    );
}
