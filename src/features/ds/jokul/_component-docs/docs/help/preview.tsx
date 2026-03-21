import { Help } from "@fremtind/jokul/help";
import type { ComponentExampleProps } from "../types";

export function HelpPreview(props: ComponentExampleProps = {}) {
    const buttonText =
        typeof props.buttonText === "string" && props.buttonText.trim() !== ""
            ? props.buttonText
            : "Hjelp om personnummer";
    const position = props.position === "bottom" || props.position === "left" || props.position === "right"
        ? props.position
        : "top";

    return (
        <Help buttonText={buttonText} position={position}>
            Personnummeret ditt er et 11-sifret nummer.
        </Help>
    );
}
