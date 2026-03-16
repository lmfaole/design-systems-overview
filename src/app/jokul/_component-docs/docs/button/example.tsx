"use client";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { Icon } from "@fremtind/jokul/icon";

export function ButtonExample({
    disabled = false,
    variant = "primary",
    icon = false,
    iconPosition = "left",
}: {
    disabled?: boolean;
    variant?: "primary" | "secondary" | "ghost";
    icon?: boolean;
    iconPosition?: "left" | "right";
}) {
    return (
        <Flex gap="s" alignItems="center" wrap="wrap">
            <Button
                disabled={disabled}
                variant={variant}
                {...(icon
                    ? { icon: <Icon>help_outline</Icon>, iconPosition }
                    : { icon: undefined, iconPosition: undefined })}
            >
                Send inn
            </Button>
        </Flex>
    );
}
