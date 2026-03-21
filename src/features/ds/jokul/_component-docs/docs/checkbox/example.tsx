import { useEffect, useState } from "react";
import { Checkbox } from "@fremtind/jokul/checkbox";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function CheckboxExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Godta vilkårene";
    const name = typeof props.name === "string" && props.name.trim() !== "" ? props.name : "terms";
    const value = typeof props.value === "string" && props.value.trim() !== "" ? props.value : "accepted";
    const controlledChecked = typeof props.checked === "boolean" ? props.checked : null;
    const defaultChecked = props.defaultChecked === true;
    const [checked, setChecked] = useState(controlledChecked ?? defaultChecked);
    const indeterminate = props.indeterminate === true;
    const invalid = props.invalid === true;

    useEffect(() => {
        setChecked(controlledChecked ?? defaultChecked);
    }, [controlledChecked, defaultChecked]);

    return (
        <Flex direction="column" gap="s">
            <Checkbox
                name={name}
                value={value}
                checked={controlledChecked ?? checked}
                onChange={(event) => {
                    if (controlledChecked === null) {
                        setChecked(event.target.checked);
                    }
                }}
                indeterminate={indeterminate}
                invalid={invalid}
            >
                {label}
            </Checkbox>
        </Flex>
    );
}
