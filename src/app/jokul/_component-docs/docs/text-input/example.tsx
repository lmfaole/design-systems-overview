"use client";
import { TextInput } from "@fremtind/jokul/text-input";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const allowedTypes = ["text", "email", "password", "tel", "url", "search", "number"] as const;
type AllowedType = (typeof allowedTypes)[number];

export function TextInputExample(props: ComponentExampleProps) {
    const rawType = typeof props.type === "string" ? props.type : "text";
    const type = (allowedTypes.includes(rawType as AllowedType) ? rawType : "text") as AllowedType;
    const placeholder = typeof props.placeholder === "string" ? props.placeholder : undefined;
    const defaultValue = typeof props.defaultValue === "string" ? props.defaultValue : undefined;
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const labelProps = typeof props.labelProps === "object" && props.labelProps !== null && !Array.isArray(props.labelProps)
        ? (props.labelProps as Record<string, unknown>)
        : undefined;
    const labelVariant = typeof labelProps?.variant === "string" && ["small", "medium", "large"].includes(labelProps.variant)
        ? (labelProps.variant as "small" | "medium" | "large")
        : undefined;
    const labelSrOnly = typeof labelProps?.srOnly === "boolean" ? labelProps.srOnly : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const disabled = props.disabled === true;
    const readOnly = props.readOnly === true;
    const resolvedLabelProps = labelVariant || labelSrOnly !== undefined
        ? { ...(labelVariant ? { variant: labelVariant } : {}), ...(labelSrOnly !== undefined ? { srOnly: labelSrOnly } : {}) }
        : undefined;

    return (
        <Flex direction="column" gap="s">
            <TextInput
                label="E-post"
                name="email"
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                description={description}
                labelProps={resolvedLabelProps}
                helpLabel={helpLabel}
                errorLabel={errorLabel}
                disabled={disabled}
                readOnly={readOnly}
            />
        </Flex>
    );
}
