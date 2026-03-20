import { useEffect, useState } from "react";
import { Search } from "@fremtind/jokul/search";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const icons = ["search", "filter_alt", "filter_list"] as const;
type IconOption = (typeof icons)[number];
const labelVariants = ["small", "medium", "large"] as const;
type LabelVariant = (typeof labelVariants)[number];

export function SearchExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Søk";
    const placeholder = typeof props.placeholder === "string" && props.placeholder.trim() !== "" ? props.placeholder : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const icon = typeof props.icon === "string" && icons.includes(props.icon as IconOption)
        ? (props.icon as IconOption)
        : undefined;
    const disabled = props.disabled === true;
    const readOnly = props.readOnly === true;
    const labelProps = typeof props.labelProps === "object" && props.labelProps !== null && !Array.isArray(props.labelProps)
        ? (props.labelProps as Record<string, unknown>)
        : undefined;
    const labelVariant = typeof labelProps?.variant === "string" && labelVariants.includes(labelProps.variant as LabelVariant)
        ? (labelProps.variant as LabelVariant)
        : undefined;
    const labelSrOnly = typeof labelProps?.srOnly === "boolean" ? labelProps.srOnly : undefined;
    const resolvedLabelProps = labelVariant || labelSrOnly !== undefined
        ? { ...(labelVariant ? { variant: labelVariant } : {}), ...(labelSrOnly !== undefined ? { srOnly: labelSrOnly } : {}) }
        : undefined;
    const controlledValue = typeof props.value === "string" ? props.value : "";
    const [value, setValue] = useState(controlledValue);

    useEffect(() => {
        setValue(controlledValue);
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <Search
                label={label}
                name="search"
                placeholder={placeholder}
                icon={icon}
                labelProps={resolvedLabelProps}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                disabled={disabled}
                readOnly={readOnly}
            >
                <Search.Button label="Søk" />
            </Search>
        </Flex>
    );
}
