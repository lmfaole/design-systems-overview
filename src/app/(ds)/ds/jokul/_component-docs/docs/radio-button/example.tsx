"use client";
import { useEffect, useState } from "react";
import { RadioButton, RadioButtonGroup } from "@fremtind/jokul/radio-button";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const options = [
    { value: "card", label: "Bankkort" },
    { value: "invoice", label: "Faktura" },
    { value: "vipps", label: "Vipps" },
];

export function RadioButtonExample(props: ComponentExampleProps) {
    const legend = typeof props.legend === "string" && props.legend.trim() !== "" ? props.legend : "Velg betaling";
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const inline = props.inline === true;
    const controlledValue = typeof props.value === "string" && props.value !== "" ? props.value : "card";
    const [value, setValue] = useState(controlledValue);

    useEffect(() => {
        setValue(controlledValue);
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <RadioButtonGroup
                legend={legend}
                name="payment"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
                inline={inline}
            >
                {options.map((option) => (
                    <RadioButton key={option.value} value={option.value}>
                        {option.label}
                    </RadioButton>
                ))}
            </RadioButtonGroup>
        </Flex>
    );
}
