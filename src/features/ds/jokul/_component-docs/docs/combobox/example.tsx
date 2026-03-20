import { useState } from "react";
import { Combobox, type ComboboxValuePair } from "@fremtind/jokul/combobox";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const items: ComboboxValuePair[] = [
    { value: "bil", label: "Bilforsikring" },
    { value: "bat", label: "Båtforsikring" },
    { value: "hjem", label: "Hjemforsikring" },
    { value: "reise", label: "Reiseforsikring" },
];

export function ComboboxExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Velg forsikringer";
    const placeholder = typeof props.placeholder === "string" && props.placeholder.trim() !== "" ? props.placeholder : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const noMatchingOption = typeof props.noMatchingOption === "string" && props.noMatchingOption.trim() !== ""
        ? props.noMatchingOption
        : undefined;
    const [value, setValue] = useState<ComboboxValuePair[]>([]);

    return (
        <Flex direction="column" gap="s">
            <Combobox
                label={label}
                name="insurance"
                items={items}
                value={value}
                onChange={(event) => setValue(event.target.selectedOptions as ComboboxValuePair[])}
                placeholder={placeholder}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
                noMatchingOption={noMatchingOption}
            />
        </Flex>
    );
}
