import { useEffect, useState } from "react";
import { DatePicker } from "@fremtind/jokul/datepicker";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const labelVariants = ["small", "medium", "large"] as const;
type LabelVariant = (typeof labelVariants)[number];

export function DatePickerExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Velg dato";
    const controlledValue = typeof props.value === "string" && props.value.trim() !== "" ? props.value : "";
    const defaultValue = typeof props.defaultValue === "string" && props.defaultValue.trim() !== "" ? props.defaultValue : "";
    const placeholder = typeof props.placeholder === "string" && props.placeholder.trim() !== "" ? props.placeholder : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const disableBeforeDate = typeof props.disableBeforeDate === "string" && props.disableBeforeDate.trim() !== ""
        ? props.disableBeforeDate
        : undefined;
    const disableAfterDate = typeof props.disableAfterDate === "string" && props.disableAfterDate.trim() !== ""
        ? props.disableAfterDate
        : undefined;
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
    const showCalendarLabel = typeof props.showCalendarLabel === "string" && props.showCalendarLabel.trim() !== ""
        ? props.showCalendarLabel
        : undefined;
    const hideCalendarLabel = typeof props.hideCalendarLabel === "string" && props.hideCalendarLabel.trim() !== ""
        ? props.hideCalendarLabel
        : undefined;
    const [value, setValue] = useState(controlledValue || defaultValue);

    useEffect(() => {
        setValue(controlledValue || defaultValue);
    }, [controlledValue, defaultValue]);

    return (
        <Flex direction="column" gap="s">
            <DatePicker
                label={label}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
                disableBeforeDate={disableBeforeDate}
                disableAfterDate={disableAfterDate}
                showCalendarLabel={showCalendarLabel}
                hideCalendarLabel={hideCalendarLabel}
                labelProps={resolvedLabelProps}
            />
        </Flex>
    );
}
