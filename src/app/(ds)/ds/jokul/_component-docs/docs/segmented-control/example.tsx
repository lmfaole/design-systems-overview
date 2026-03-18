"use client";

import { useEffect, useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import { SegmentedControl, SegmentedControlButton } from "@fremtind/jokul/segmented-control";
import type { ComponentExampleProps } from "../types";

const options = [
    { value: "bil", label: "Bil" },
    { value: "hus", label: "Hus" },
    { value: "reise", label: "Reise" },
] as const;

export function SegmentedControlExample(props: ComponentExampleProps) {
    const legend =
        typeof props.legend === "string" && props.legend.trim().length > 0
            ? props.legend.trim()
            : "Velg forsikring";
    const description =
        typeof props.description === "string" && props.description.trim().length > 0
            ? props.description.trim()
            : undefined;
    const helpLabel =
        typeof props.helpLabel === "string" && props.helpLabel.trim().length > 0
            ? props.helpLabel.trim()
            : undefined;
    const errorLabel =
        typeof props.errorLabel === "string" && props.errorLabel.trim().length > 0
            ? props.errorLabel.trim()
            : undefined;
    const preferred = typeof props.selectedValue === "string" ? props.selectedValue : options[0].value;
    const [selectedValue, setSelectedValue] = useState(preferred);
    const separated = props.separated === true;
    const disableLast = props.disableLast === true;

    useEffect(() => {
        setSelectedValue(preferred);
    }, [preferred]);

    const name = "segmented-example";

    return (
        <Flex direction="column" gap="s">
            <SegmentedControl
                legend={legend}
                description={description}
                helpLabel={helpLabel}
                errorLabel={errorLabel}
            >
                {options.map((option, index) => (
                    <SegmentedControlButton
                        key={option.value}
                        value={option.value}
                        name={name}
                        checked={selectedValue === option.value}
                        onChange={({ target }) => setSelectedValue(target.value)}
                        separated={separated && index === 1}
                        disabled={disableLast && index === options.length - 1}
                    >
                        {option.label}
                    </SegmentedControlButton>
                ))}
            </SegmentedControl>
        </Flex>
    );
}
