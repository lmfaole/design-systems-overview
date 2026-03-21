import { Icon } from "@fremtind/jokul/icon";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";
const icons = ["star", "check_circle", "favorite", "arrow_forward"];

export function IconPreview(props: ComponentExampleProps = {}) {
    const bold = props.bold === true;
    const filled = props.filled === true;

    return (
        <Flex gap="m" alignItems="center">
            {icons.map((name) => (
                <span key={name} style={{ display: "inline-flex" }}><Icon bold={bold} filled={filled}>{name}</Icon></span>
            ))}
        </Flex>
    );
}
