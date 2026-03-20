
import { Flex } from "@fremtind/jokul/flex";
import { Chip } from "@fremtind/jokul/chip";
import type { ComponentExampleProps } from "../types";

export function ChipExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim().length > 0 ? props.label.trim() : "Nyhet";
    const variant = props.variant === "filter" ? "filter" : "input";
    const selected = variant === "filter" && props.selected === true;
    const disabled = props.disabled === true;

    return (
        <Flex gap="s" alignItems="center" wrap="wrap">
            {variant === "filter" ? (
                <Chip variant="filter" selected={selected} disabled={disabled}>
                    {label}
                </Chip>
            ) : (
                <Chip variant="input" disabled={disabled}>
                    {label}
                </Chip>
            )}
        </Flex>
    );
}
