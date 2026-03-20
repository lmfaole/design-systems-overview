import { useEffect, useState } from "react";
import { BETA_Select as Select } from "@fremtind/jokul/select";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function SelectExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Velg fylke";
    const placeholder = typeof props.placeholder === "string" && props.placeholder.trim() !== "" ? props.placeholder : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const disabled = props.disabled === true;
    const controlledValue = typeof props.value === "string" ? props.value : "";
    const [value, setValue] = useState(controlledValue);

    useEffect(() => {
        setValue(controlledValue);
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <Select
                label={label}
                name="county-beta"
                placeholder={placeholder}
                helpLabel={helpLabel}
                errorLabel={errorLabel}
                disabled={disabled}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            >
                <option value="oslo">Oslo</option>
                <option value="viken">Viken</option>
                <option value="agder">Agder</option>
            </Select>
        </Flex>
    );
}
