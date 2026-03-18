"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@fremtind/jokul/tooltip";
import { Button } from "@fremtind/jokul/button";

export function TooltipPreview() {
    return (
        <Tooltip initialOpen={false} triggerOn="click">
            <TooltipTrigger><Button variant="ghost" disabled>Mer informasjon</Button></TooltipTrigger>
            <TooltipContent>Her er tilleggsinformasjon</TooltipContent>
        </Tooltip>
    );
}
