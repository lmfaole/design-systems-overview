import type { ImageMetadata } from "astro";
import { isValidElement } from "react";
import type { ComponentType, ImgHTMLAttributes, ReactNode } from "react";
import { FullBleed } from "@/components/ds/FullBleed";
import "./page-header.scss";

interface PageHeaderBackgroundImage extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
    src: string | ImageMetadata;
    alt?: string;
}

type PageHeaderBackground = ReactNode | ComponentType | string | ImageMetadata | PageHeaderBackgroundImage;

type PageHeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    background?: PageHeaderBackground;
};

function renderBackground(background: PageHeaderBackground): ReactNode {
    if (typeof background === "function") {
        const Background = background;
        return <Background />;
    }

    if (typeof background === "string") {
        return <img src={background} alt="" loading="eager" decoding="async" />;
    }

    if (isImageMetadata(background)) {
        return (
            <img
                src={background.src}
                alt=""
                width={background.width}
                height={background.height}
                loading="eager"
                decoding="async"
            />
        );
    }

    if (isPageHeaderBackgroundImage(background)) {
        const {
            src,
            alt = "",
            loading = "eager",
            decoding = "async",
            ...imageProps
        } = background;

        const imageMetadata = isImageMetadata(src) ? src : undefined;
        const imageSrc = typeof src === "string" ? src : src.src;

        return (
            <img
                src={imageSrc}
                alt={alt}
                width={imageMetadata?.width}
                height={imageMetadata?.height}
                loading={loading}
                decoding={decoding}
                {...imageProps}
            />
        );
    }

    return background;
}

function isImageMetadata(value: unknown): value is ImageMetadata {
    return Boolean(
        value &&
        typeof value === "object" &&
        "src" in value &&
        typeof (value as ImageMetadata).src === "string" &&
        "width" in value &&
        typeof (value as ImageMetadata).width === "number" &&
        "height" in value &&
        typeof (value as ImageMetadata).height === "number",
    );
}

function isPageHeaderBackgroundImage(value: unknown): value is PageHeaderBackgroundImage {
    return Boolean(
        value &&
        typeof value === "object" &&
        !isValidElement(value) &&
        "src" in value &&
        (typeof (value as PageHeaderBackgroundImage).src === "string" ||
            isImageMetadata((value as PageHeaderBackgroundImage).src)),
    );
}

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
                    {renderBackground(background)}
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
