"use client";

import { Flex } from "@fremtind/jokul/flex";
import { Icon } from "@fremtind/jokul/icon";
import { IconButton } from "@fremtind/jokul/icon-button";
import type { ComponentExampleProps } from "../types";

export function IconButtonExample(props: ComponentExampleProps) {
    const ariaLabel =
        typeof props["aria-label"] === "string" && props["aria-label"].trim().length > 0
            ? props["aria-label"].trim()
            : "Åpne handlinger";
    const disabled = props.disabled === true;
    const type = props.type === "submit" || props.type === "reset" ? props.type : "button";
    const iconValue = typeof props.icon === "string" ? props.icon : "more_vert";
    const customIcon = typeof props.iconName === "string" ? props.iconName.trim() : "";
    const resolvedIcon = iconValue === "custom" ? (customIcon.length > 0 ? customIcon : "more_vert") : iconValue;

    return (
        <Flex gap="s" alignItems="center" wrap="wrap">
            <IconButton aria-label={ariaLabel} disabled={disabled} type={type}>
                <Icon>{resolvedIcon}</Icon>
            </IconButton>
        </Flex>
    );
}
