import { Tooltip, TooltipContent, TooltipTrigger } from "@fremtind/jokul/tooltip";
import { Button } from "@fremtind/jokul/button";
import type { ComponentExampleProps } from "../types";

export function TooltipPreview(props: ComponentExampleProps = {}) {
    const placement = props.placement === "left" || props.placement === "right"
        || props.placement === "top-start" || props.placement === "top-end"
        ? props.placement
        : "top";
    const triggerOn = props.triggerOn === "click" ? "click" : "hover";
    const delay = typeof props.delay === "number" ? props.delay : undefined;

    return (
        <Tooltip initialOpen={false} placement={placement} triggerOn={triggerOn} delay={delay}>
            <TooltipTrigger><Button variant="ghost" disabled>Mer informasjon</Button></TooltipTrigger>
            <TooltipContent>Her er tilleggsinformasjon</TooltipContent>
        </Tooltip>
    );
}
