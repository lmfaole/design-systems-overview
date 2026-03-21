import { useEffect, useState } from "react";
import { Select } from "@fremtind/jokul/select";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const items = [
    "Bil",
    { value: "home", label: "Hus" },
    { value: "travel", label: "Reise" },
    { value: "boat", label: "Båt" },
];

export function SelectStableExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Velg forsikring";
    const name = typeof props.name === "string" && props.name.trim() !== "" ? props.name : "insurance";
    const defaultPrompt = typeof props.defaultPrompt === "string" ? props.defaultPrompt : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const searchable = props.searchable === true;
    const maxShownOptions = typeof props.maxShownOptions === "number" ? props.maxShownOptions : undefined;
    const inline = props.inline === true;
    const width = typeof props.width === "string" && props.width.trim() !== "" ? props.width : undefined;
    const controlledValue = typeof props.value === "string" ? props.value : undefined;
    const [value, setValue] = useState<string | undefined>(controlledValue);

    useEffect(() => {
        if (controlledValue !== undefined) {
            setValue(controlledValue);
        }
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <Select
                label={label}
                name={name}
                items={items}
                defaultPrompt={defaultPrompt}
                helpLabel={helpLabel}
                errorLabel={errorLabel}
                searchable={searchable}
                maxShownOptions={maxShownOptions}
                inline={inline}
                width={width}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </Flex>
    );
}
