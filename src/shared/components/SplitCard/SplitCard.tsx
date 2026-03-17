import type React from "react";
import "./split-card.scss";

interface SplitCardProps {
    preview?: React.ReactNode;
    content: React.ReactNode;
    className?: string;
    previewClassName?: string;
    contentClassName?: string;
    layout?: "auto" | "horizontal";
    minWidth?: "22rem" | "36rem";
}

export function SplitCard({
    preview,
    content,
    className,
    previewClassName,
    contentClassName,
    layout = "auto",
    minWidth = "22rem",
}: SplitCardProps) {
    const classes = ["split-card", className].filter(Boolean).join(" ");
    const previewClasses = ["split-card__preview", previewClassName].filter(Boolean).join(" ");
    const contentClasses = ["split-card__content", contentClassName].filter(Boolean).join(" ");
    const dataLayout = layout === "horizontal" ? "horizontal" : undefined;
    const dataMinWidth = minWidth === "36rem" ? "36rem" : undefined;

    return (
        <div className={classes} data-layout={dataLayout} data-min-width={dataMinWidth}>
            <div className="split-card__container">
                {preview && <div className={previewClasses}>{preview}</div>}
                <div className={contentClasses}>{content}</div>
            </div>
        </div>
    );
}
