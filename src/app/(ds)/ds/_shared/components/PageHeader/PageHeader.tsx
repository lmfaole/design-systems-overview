import type { ReactNode } from "react";
import { FullBleed } from "@/app/ds/_shared/components/FullBleed";
import "./page-header.scss";

type PageHeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    background?: ReactNode;
};

export function PageHeader({
    title,
    description,
    background,
}: PageHeaderProps) {
    const content = (
        <>
            <h1 className="title">{title}</h1>
            {description && (
                <p className="description">{description}</p>
            )}
        </>
    );

    if (background) {
        return (
            <FullBleed as="header" className="ds-page-header" data-variant="hero">
                <div className="background" aria-hidden="true">
                    {background}
                </div>
                <div className="page inner">
                    <div className="content">
                        {content}
                    </div>
                </div>
            </FullBleed>
        );
    }

    return (
        <header className="ds-page-header">
            {content}
        </header>
    );
}
