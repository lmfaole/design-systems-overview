import { Image } from "@fremtind/jokul/image";
import "./image.scss";

const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop", alt: "Fjelllandskap" },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=200&fit=crop", alt: "Bil på vei" },
];

export function ImagePreview() {
    return (
        <div className="image-component-preview">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Image
                src={images[0].src}
                alt={images[0].alt}
                {...({ loading: "eager" } as any)}
            />
        </div>
    );
}
