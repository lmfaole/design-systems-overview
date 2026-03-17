import type React from "react";

interface SiteContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}

export function SiteContainer({ as: Tag = "div", className, ...rest }: SiteContainerProps) {
    const classes = ["site-container", className].filter(Boolean).join(" ");
    return <Tag className={classes} {...rest} />;
}
