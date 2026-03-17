"use client";
import { InputGroup } from "@fremtind/jokul/input-group";
import { TextInput } from "@fremtind/jokul/text-input";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const supportLabelTypes = ["help", "warning", "error", "success"] as const;
type SupportLabelType = (typeof supportLabelTypes)[number];

export function InputGroupExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "E-post";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const inline = props.inline === true;
    const supportLabelProps = typeof props.supportLabelProps === "object" && props.supportLabelProps !== null && !Array.isArray(props.supportLabelProps)
        ? (props.supportLabelProps as Record<string, unknown>)
        : undefined;
    const supportLabel = typeof supportLabelProps?.label === "string" && supportLabelProps.label.trim() !== ""
        ? supportLabelProps.label
        : undefined;
    const supportLabelType = typeof supportLabelProps?.labelType === "string" && supportLabelTypes.includes(supportLabelProps.labelType as SupportLabelType)
        ? (supportLabelProps.labelType as SupportLabelType)
        : undefined;
    const resolvedSupportLabelProps = supportLabel
        ? { label: supportLabel, ...(supportLabelType ? { labelType: supportLabelType } : {}) }
        : undefined;

    return (
        <Flex direction="column" gap="s">
            <InputGroup
                label={label}
                description={description}
                inline={inline}
                supportLabelProps={resolvedSupportLabelProps}
                render={(inputProps) => (
                    <TextInput
                        {...inputProps}
                        label={label}
                        labelProps={{ srOnly: true }}
                        placeholder="navn@domene.no"
                    />
                )}
            />
        </Flex>
    );
}
