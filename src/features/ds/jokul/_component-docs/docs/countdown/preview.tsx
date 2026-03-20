import { Countdown } from "@fremtind/jokul/countdown";
import { Flex } from "@fremtind/jokul/flex";

export function CountdownPreview() {
    return (
        <Flex direction="column" gap="s" style={{ width: "12rem" }}>
            <span style={{ fontSize: "var(--jkl-font-size-small)", color: "var(--jkl-color-text-subdued)" }}>
                Teller ned…
            </span>
            <Countdown from={5000} isPaused={true} />
        </Flex>
    );
}
