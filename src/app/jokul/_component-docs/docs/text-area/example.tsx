"use client";
import { TextArea } from "@fremtind/jokul/text-area";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function TextAreaExample(props: ComponentExampleProps) {
    const rows = typeof props.rows === "number" ? props.rows : undefined;
    const autoExpand = props.autoExpand === true;
    const labelProps = typeof props.labelProps === "object" && props.labelProps !== null && !Array.isArray(props.labelProps)
        ? (props.labelProps as Record<string, unknown>)
        : undefined;
    const labelVariant = typeof labelProps?.variant === "string" && ["small", "medium", "large"].includes(labelProps.variant)
        ? (labelProps.variant as "small" | "medium" | "large")
        : undefined;
    const labelSrOnly = typeof labelProps?.srOnly === "boolean" ? labelProps.srOnly : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const counter = typeof props.counter === "object" && props.counter !== null && !Array.isArray(props.counter)
        ? (props.counter as Record<string, unknown>)
        : undefined;
    const counterMax = typeof counter?.maxLength === "number" ? (counter.maxLength as number) : undefined;
    const counterHide = typeof counter?.hideProgress === "boolean" ? (counter.hideProgress as boolean) : undefined;
    const counterValue = counterMax ? { maxLength: counterMax, ...(counterHide !== undefined ? { hideProgress: counterHide } : {}) } : undefined;
    const resolvedLabelProps = labelVariant || labelSrOnly !== undefined
        ? { ...(labelVariant ? { variant: labelVariant } : {}), ...(labelSrOnly !== undefined ? { srOnly: labelSrOnly } : {}) }
        : undefined;

    return (
        <Flex direction="column" gap="s">
            <TextArea
                label="Kommentar"
                rows={rows}
                autoExpand={autoExpand}
                labelProps={resolvedLabelProps}
                counter={counterValue}
                helpLabel={helpLabel}
                errorLabel={errorLabel}
            />
        </Flex>
    );
}
