import { useEffect, useState } from "react";
import { ExpandablePanel } from "@fremtind/jokul/expander";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const variants = ["fill", "stroke"] as const;
type Variant = (typeof variants)[number];

export function ExpandablePanelExample(props: ComponentExampleProps) {
    const rawVariant = typeof props.variant === "string" ? props.variant : "fill";
    const variant = (variants.includes(rawVariant as Variant) ? rawVariant : "fill") as Variant;
    const controlledOpen = typeof props.open === "boolean" ? props.open : null;
    const defaultOpen = props.defaultOpen === true;
    const [open, setOpen] = useState(controlledOpen ?? defaultOpen);

    useEffect(() => {
        setOpen(controlledOpen ?? defaultOpen);
    }, [controlledOpen, defaultOpen]);

    return (
        <Flex direction="column" gap="s">
            <ExpandablePanel
                variant={variant}
                open={controlledOpen ?? open}
                onOpenChange={(nextOpen) => {
                    if (controlledOpen === null) {
                        setOpen(nextOpen);
                    }
                }}
            >
                <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
                <ExpandablePanel.Content>
                    <p>Forsikringen dekker skader og ansvar.</p>
                </ExpandablePanel.Content>
            </ExpandablePanel>
        </Flex>
    );
}
