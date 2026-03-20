import { Icon } from "@fremtind/jokul/icon";
import { Flex } from "@fremtind/jokul/flex";
const icons = ["star", "check_circle", "favorite", "arrow_forward"];

export function IconPreview() {
    return (
        <Flex gap="m" alignItems="center">
            {icons.map((name) => (
                <span key={name} style={{ display: "inline-flex" }}><Icon>{name}</Icon></span>
            ))}
        </Flex>
    );
}
