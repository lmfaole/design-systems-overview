import { useEffect, useState } from "react";
import { RadioPanel } from "@fremtind/jokul/radio-panel";
import { FieldGroup } from "@fremtind/jokul/input-group";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function RadioPanelExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Standard";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const amount = typeof props.amount === "string" && props.amount.trim() !== "" ? props.amount : undefined;
    const name = typeof props.name === "string" && props.name.trim() !== "" ? props.name : "package";
    const value = typeof props.value === "string" && props.value.trim() !== "" ? props.value : "standard";
    const controlledChecked = typeof props.checked === "boolean" ? props.checked : null;
    const defaultChecked = props.defaultChecked === true;
    const disabled = props.disabled === true;
    const [selected, setSelected] = useState(controlledChecked === true ? value : defaultChecked ? value : "pluss");

    useEffect(() => {
        setSelected(controlledChecked === true ? value : defaultChecked ? value : "pluss");
    }, [controlledChecked, defaultChecked, value]);

    return (
        <Flex direction="column" gap="s">
            <FieldGroup legend="Velg pakke">
                <RadioPanel
                    name={name}
                    value={value}
                    label={label}
                    description={description}
                    amount={amount}
                    checked={controlledChecked ?? (selected === value)}
                    onChange={(event) => setSelected(event.target.value)}
                    disabled={disabled}
                />
                <RadioPanel
                    name={name}
                    value="pluss"
                    label="Pluss"
                    description="Ekstra dekning og lavere egenandel."
                    amount="kr 1 800 / mnd"
                    checked={controlledChecked === null ? selected === "pluss" : !controlledChecked}
                    onChange={(event) => setSelected(event.target.value)}
                    disabled={disabled}
                />
            </FieldGroup>
        </Flex>
    );
}
