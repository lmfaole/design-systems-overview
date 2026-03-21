import { Image } from "@fremtind/jokul/image";
import type { ComponentExampleProps } from "../types";
import "./image.scss";

const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop", alt: "Fjelllandskap" },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=200&fit=crop", alt: "Bil på vei" },
];

export function ImagePreview(props: ComponentExampleProps = {}) {
    const src = typeof props.src === "string" && props.src.trim() !== "" ? props.src : images[0].src;
    const alt = typeof props.alt === "string" && props.alt.trim() !== "" ? props.alt : images[0].alt;
    const srcSet = typeof props.srcSet === "string" && props.srcSet.trim() !== "" ? props.srcSet : undefined;
    const placeholder =
        typeof props.placeholder === "string" && props.placeholder.trim() !== ""
            ? props.placeholder
            : undefined;

    return (
        <div className="image-component-preview">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Image
                src={src}
                alt={alt}
                srcSet={srcSet}
                placeholder={placeholder}
                {...({ loading: "eager" } as any)}
            />
        </div>
    );
}
