import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./split-card.scss";

export interface SplitCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    preview?: ReactNode;
    content: ReactNode;
    previewClassName?: string;
    contentClassName?: string;
    layout?: "auto" | "horizontal";
    minWidth?: "22rem" | "36rem";
    separatorColor?: string;
}

export function SplitCard({
    preview,
    content,
    className,
    previewClassName,
    contentClassName,
    layout = "auto",
    minWidth = "22rem",
    separatorColor,
    style,
    ...rest
}: SplitCardProps) {
    return (
        <div
            className={["ds-split-card", className].filter(Boolean).join(" ")}
            data-layout={layout === "horizontal" ? "horizontal" : undefined}
            data-min-width={minWidth === "36rem" ? "36rem" : undefined}
            style={{
                ...(separatorColor ? { "--ds-split-card-separator": separatorColor } : {}),
                ...style,
            } as CSSProperties}
            {...rest}
        >
            <div className="ds-split-card__container">
                {preview && (
                    <div className={["ds-split-card__preview", previewClassName].filter(Boolean).join(" ")}>
                        {preview}
                    </div>
                )}
                <div className={["ds-split-card__content", contentClassName].filter(Boolean).join(" ")}>
                    {content}
                </div>
            </div>
        </div>
    );
}
