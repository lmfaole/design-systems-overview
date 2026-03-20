import { useEffect, useState } from "react";
import { CheckboxPanel } from "@fremtind/jokul/checkbox-panel";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function CheckboxPanelExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Bilforsikring";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const amount = typeof props.amount === "string" && props.amount.trim() !== "" ? props.amount : undefined;
    const defaultChecked = props.defaultChecked === true;
    const disabled = props.disabled === true;
    const [checked, setChecked] = useState(defaultChecked);

    useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    return (
        <Flex direction="column" gap="s">
            <CheckboxPanel
                name="addons"
                value="car"
                label={label}
                description={description}
                amount={amount}
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                disabled={disabled}
            />
        </Flex>
    );
}
