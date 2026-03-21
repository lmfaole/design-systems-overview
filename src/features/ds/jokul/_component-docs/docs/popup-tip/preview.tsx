
import { PopupTip } from "@fremtind/jokul/tooltip";
import type { ComponentExampleProps } from "../types";

export function PopupTipPreview(props: ComponentExampleProps = {}) {
    const placement = props.placement === "left" || props.placement === "right" ? props.placement : "top";
    const delay = typeof props.delay === "number" ? props.delay : undefined;
    const initialOpen = props.initialOpen === true;

    return (
        <PopupTip
            content="Ekstra info om feltet"
            placement={placement}
            delay={delay}
            initialOpen={initialOpen}
            triggerProps={{ disabled: true }}
        />
    );
}
