import { useEffect, useState } from "react";
import { CheckboxPanel } from "@fremtind/jokul/checkbox-panel";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function CheckboxPanelExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Bilforsikring";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const amount = typeof props.amount === "string" && props.amount.trim() !== "" ? props.amount : undefined;
    const name = typeof props.name === "string" && props.name.trim() !== "" ? props.name : "addons";
    const value = typeof props.value === "string" && props.value.trim() !== "" ? props.value : "car";
    const controlledChecked = typeof props.checked === "boolean" ? props.checked : null;
    const defaultChecked = props.defaultChecked === true;
    const disabled = props.disabled === true;
    const [checked, setChecked] = useState(controlledChecked ?? defaultChecked);

    useEffect(() => {
        setChecked(controlledChecked ?? defaultChecked);
    }, [controlledChecked, defaultChecked]);

    return (
        <Flex direction="column" gap="s">
            <CheckboxPanel
                name={name}
                value={value}
                label={label}
                description={description}
                amount={amount}
                checked={controlledChecked ?? checked}
                onChange={(event) => {
                    if (controlledChecked === null) {
                        setChecked(event.target.checked);
                    }
                }}
                disabled={disabled}
            />
        </Flex>
    );
}
