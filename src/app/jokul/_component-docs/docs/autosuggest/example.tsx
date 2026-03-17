"use client";
import { useEffect, useState } from "react";
import { Autosuggest } from "@fremtind/jokul/autosuggest";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const items = ["Bilforsikring", "Båtforsikring", "Hjemforsikring", "Reiseforsikring", "Innboforsikring"];
const variants = ["small", "medium", "large"] as const;
type Variant = (typeof variants)[number];

export function AutosuggestExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Søk etter forsikring";
    const placeholder = typeof props.placeholder === "string" && props.placeholder.trim() !== "" ? props.placeholder : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const maxNumberOfHits = typeof props.maxNumberOfHits === "number" ? props.maxNumberOfHits : undefined;
    const showDropdownControllerButton = props.showDropdownControllerButton === true;
    const variant = typeof props.variant === "string" && variants.includes(props.variant as Variant)
        ? (props.variant as Variant)
        : undefined;
    const controlledValue = typeof props.value === "string" ? props.value : "";
    const [value, setValue] = useState(controlledValue);

    useEffect(() => {
        setValue(controlledValue);
    }, [controlledValue]);

    return (
        <Flex direction="column" gap="s">
            <Autosuggest
                label={label}
                allItems={items}
                value={value}
                onChange={(nextValue) => setValue(nextValue)}
                placeholder={placeholder}
                helpLabel={errorLabel ? undefined : helpLabel}
                errorLabel={errorLabel}
                variant={variant}
                maxNumberOfHits={maxNumberOfHits}
                showDropdownControllerButton={showDropdownControllerButton}
            />
        </Flex>
    );
}
