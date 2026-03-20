import { Search } from "@fremtind/jokul/search";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const types = ["button", "submit", "reset"] as const;
type ButtonType = (typeof types)[number];

export function SearchButtonExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Søk";
    const type = typeof props.type === "string" && types.includes(props.type as ButtonType)
        ? (props.type as ButtonType)
        : "button";
    const disabled = props.disabled === true;

    return (
        <Flex direction="column" gap="s">
            <Search.Button label={label} type={type} disabled={disabled} />
        </Flex>
    );
}
