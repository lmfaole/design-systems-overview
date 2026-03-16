"use client";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { Icon } from "@fremtind/jokul/icon";
import type { ComponentExampleProps } from "../types";

export function ButtonExample(props: ComponentExampleProps) {
    const disabled = props.disabled === "true";
    const loader = props.loader === "true";
    const icon = props.icon === "true";
    const variant = (props.variant ?? "primary") as "primary" | "secondary" | "ghost";
    const iconPosition = (props.iconPosition ?? "left") as "left" | "right";
    return (
        <Flex gap="s" alignItems="center" wrap="wrap">
            <Button
                disabled={disabled}
                variant={variant}
                loader={loader ? { showLoader: true, textDescription: "Laster" } : undefined}
                {...(icon
                    ? { icon: <Icon>help_outline</Icon>, iconPosition }
                    : { icon: undefined, iconPosition: undefined })}
            >
                Send inn
            </Button>
        </Flex>
    );
}
