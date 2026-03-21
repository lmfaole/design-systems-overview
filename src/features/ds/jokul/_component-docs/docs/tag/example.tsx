import { Tag } from "@fremtind/jokul/tag";
import type { ComponentExampleProps } from "../types";

const variants = ["neutral", "info", "success", "warning", "error"] as const;

export function TagExample(props: ComponentExampleProps) {
    const variant =
        typeof props.variant === "string" && variants.includes(props.variant as (typeof variants)[number])
            ? (props.variant as (typeof variants)[number])
            : "neutral";

    return <Tag variant={variant}>Bilforsikring</Tag>;
}
