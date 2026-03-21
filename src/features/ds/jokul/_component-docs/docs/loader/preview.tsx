import { Loader } from "@fremtind/jokul/loader";
import type { ComponentExampleProps } from "../types";

export function LoaderPreview(props: ComponentExampleProps = {}) {
    const textDescription =
        typeof props.textDescription === "string" && props.textDescription.trim() !== ""
            ? props.textDescription
            : "Laster";
    const variant = props.variant === "small" || props.variant === "large" ? props.variant : "medium";
    const delay = typeof props.delay === "number" ? props.delay : 0;
    const inline = props.inline === true;

    return <Loader textDescription={textDescription} variant={variant} delay={delay} inline={inline} />;
}
