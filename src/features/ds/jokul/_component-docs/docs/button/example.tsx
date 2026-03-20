import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { Icon } from "@fremtind/jokul/icon";
import type { ComponentExampleProps } from "../types";

export function ButtonExample(props: ComponentExampleProps) {
    const disabled = props.disabled === true;
    const loader = props.loader === true;
    const label =
        typeof props.label === "string" && props.label.trim().length > 0 ? props.label.trim() : "Send inn";
    const loaderText =
        typeof props.loaderText === "string" && props.loaderText.trim().length > 0
            ? props.loaderText.trim()
            : "Laster";
    const iconValue = typeof props.icon === "string" ? props.icon : props.icon === true ? "help" : "none";
    const customIcon = typeof props.iconName === "string" ? props.iconName.trim() : "";
    const resolvedIconName = iconValue === "custom" ? customIcon : iconValue;
    const iconName = resolvedIconName && resolvedIconName !== "none" ? resolvedIconName : undefined;
    const variant = (typeof props.variant === "string" ? props.variant : "secondary") as
        | "primary"
        | "secondary"
        | "ghost"
        | "tertiary";
    const iconPosition = (typeof props.iconPosition === "string" ? props.iconPosition : "left") as "left" | "right";
    const type = props.type === "submit" || props.type === "reset" ? props.type : "button";
    return (
        <Flex gap="s" alignItems="center" wrap="wrap">
            <Button
                disabled={disabled}
                variant={variant}
                type={type}
                loader={loader ? { showLoader: true, textDescription: loaderText } : undefined}
                {...(iconName
                    ? { icon: <Icon>{iconName}</Icon>, iconPosition }
                    : { icon: undefined, iconPosition: undefined })}
            >
                {label}
            </Button>
        </Flex>
    );
}
