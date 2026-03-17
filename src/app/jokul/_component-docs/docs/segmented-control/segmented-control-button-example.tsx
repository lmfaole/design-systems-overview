"use client";

import { useEffect, useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import { SegmentedControl, SegmentedControlButton } from "@fremtind/jokul/segmented-control";
import type { ComponentExampleProps } from "../types";

const options = [
    { value: "dag", label: "Dag" },
    { value: "uke", label: "Uke" },
] as const;

export function SegmentedControlButtonExample(props: ComponentExampleProps) {
    const preferred = typeof props.selectedValue === "string" ? props.selectedValue : options[0].value;
    const [selectedValue, setSelectedValue] = useState(preferred);
    const separated = props.separated === true;
    const disabled = props.disabled === true;

    useEffect(() => {
        setSelectedValue(preferred);
    }, [preferred]);

    const name = "segmented-button-example";

    return (
        <Flex direction="column" gap="s">
            <SegmentedControl legend="Velg periode">
                {options.map((option, index) => (
                    <SegmentedControlButton
                        key={option.value}
                        value={option.value}
                        name={name}
                        checked={selectedValue === option.value}
                        onChange={({ target }) => setSelectedValue(target.value)}
                        separated={separated && index === 1}
                        disabled={disabled && index === 1}
                    >
                        {option.label}
                    </SegmentedControlButton>
                ))}
            </SegmentedControl>
        </Flex>
    );
}
