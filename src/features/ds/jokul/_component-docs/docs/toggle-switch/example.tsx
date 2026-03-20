import { useEffect, useState } from "react";
import { ToggleSwitch } from "@fremtind/jokul/toggle-switch";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function ToggleSwitchExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" && props.label.trim() !== "" ? props.label : "Aktiver varsler";
    const controlledPressed = typeof props["aria-pressed"] === "boolean" ? props["aria-pressed"] : false;
    const [pressed, setPressed] = useState(controlledPressed);
    const disabled = props.disabled === true;
    const title = typeof props.title === "string" && props.title.trim() !== "" ? props.title.trim() : undefined;

    useEffect(() => {
        setPressed(controlledPressed);
    }, [controlledPressed]);

    return (
        <Flex direction="column" gap="s">
            <ToggleSwitch
                aria-pressed={pressed}
                disabled={disabled}
                title={title}
                onChange={(_, nextPressed) => {
                    setPressed(nextPressed);
                }}
            >
                {label}
            </ToggleSwitch>
        </Flex>
    );
}
