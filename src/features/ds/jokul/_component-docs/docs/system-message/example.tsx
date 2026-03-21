import { useEffect, useState } from "react";
import { SystemMessage } from "@fremtind/jokul/system-message";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const variants = ["info", "success", "warning", "error"] as const;
type Variant = (typeof variants)[number];

export function SystemMessageExample(props: ComponentExampleProps) {
    const rawVariant = typeof props.variant === "string" ? props.variant : "info";
    const variant = (variants.includes(rawVariant as Variant) ? rawVariant : "info") as Variant;
    const dismissedProp = props.dismissed === true;
    const [dismissed, setDismissed] = useState(dismissedProp);
    const role = typeof props.role === "string" && props.role.trim() !== "" ? props.role : undefined;
    const maxContentWidth = typeof props.maxContentWidth === "string" && props.maxContentWidth.trim() !== ""
        ? props.maxContentWidth
        : undefined;
    const paddingLeft = typeof props.paddingLeft === "string" && props.paddingLeft.trim() !== ""
        ? props.paddingLeft
        : undefined;

    useEffect(() => {
        setDismissed(dismissedProp);
    }, [dismissedProp]);

    return (
        <Flex direction="column" gap="s">
            <SystemMessage
                variant={variant}
                dismissed={dismissed}
                role={role}
                maxContentWidth={maxContentWidth}
                paddingLeft={paddingLeft}
                dismissAction={{
                    buttonTitle: "Lukk",
                    handleDismiss: () => {
                        setDismissed(true);
                    },
                }}
            >
                Planlagt vedlikehold lørdag kl. 02–04.
            </SystemMessage>
        </Flex>
    );
}
