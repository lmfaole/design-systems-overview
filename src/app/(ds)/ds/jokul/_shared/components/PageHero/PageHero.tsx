import React from "react";
import { Flex } from "@fremtind/jokul/flex";
import { FullBleed } from "@/app/ds/jokul/_shared/components/FullBleed/FullBleed";
import "./page-hero.scss";

interface PageHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    title: string;
    background: React.ReactNode;
    description?: React.ReactNode;
    size?: "default" | "compact";
}

export function PageHero({
    title,
    background,
    description,
    size = "default",
    className,
    ...rest
}: PageHeroProps) {
    return (
        <FullBleed
            as="header"
            className={["page-hero", className].filter(Boolean).join(" ")}
            data-size={size}
            {...rest}
        >
            <div className="page-hero__bg" aria-hidden="true">
                {background}
            </div>
            <Flex className="page-hero__inner" alignItems="center" justifyContent="start">
                <div className="page-hero__text">
                    <h1>{title}</h1>
                    {description && <p className="page-hero__description lead">{description}</p>}
                </div>
            </Flex>
        </FullBleed>
    );
}
