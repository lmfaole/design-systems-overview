import { useEffect, useState } from "react";
import { RadioPanel } from "@fremtind/jokul/radio-panel";
import { FieldGroup } from "@fremtind/jokul/input-group";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function RadioPanelExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Standard";
    const description = typeof props.description === "string" && props.description.trim() !== "" ? props.description : undefined;
    const amount = typeof props.amount === "string" && props.amount.trim() !== "" ? props.amount : undefined;
    const disabled = props.disabled === true;
    const controlledValue = typeof props.value === "string" && props.value.trim() !== "" ? props.value : "standard";
    const [selected, setSelected] = useState(controlledValue);

    useEffect(() => {
        setSelected(controlledValue);
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <FieldGroup legend="Velg pakke">
                <RadioPanel
                    name="package"
                    value="standard"
                    label={label}
                    description={description}
                    amount={amount}
                    checked={selected === "standard"}
                    onChange={(event) => setSelected(event.target.value)}
                    disabled={disabled}
                />
                <RadioPanel
                    name="package"
                    value="pluss"
                    label="Pluss"
                    description="Ekstra dekning og lavere egenandel."
                    amount="kr 1 800 / mnd"
                    checked={selected === "pluss"}
                    onChange={(event) => setSelected(event.target.value)}
                    disabled={disabled}
                />
            </FieldGroup>
        </Flex>
    );
}
