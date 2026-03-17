"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@fremtind/jokul/checkbox";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function CheckboxExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Godta vilkårene";
    const defaultChecked = props.defaultChecked === true;
    const [checked, setChecked] = useState(defaultChecked);
    const indeterminate = props.indeterminate === true;
    const invalid = props.invalid === true;

    useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    return (
        <Flex direction="column" gap="s">
            <Checkbox
                name="terms"
                value="accepted"
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked);
                }}
                indeterminate={indeterminate}
                invalid={invalid}
            >
                {label}
            </Checkbox>
        </Flex>
    );
}
