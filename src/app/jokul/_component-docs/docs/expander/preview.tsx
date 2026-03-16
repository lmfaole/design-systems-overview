"use client";
import { ExpandablePanel, Expander } from "@fremtind/jokul/expander";

export function ExpanderPreview() {
    return (
        <ExpandablePanel open={true} onOpenChange={() => undefined}>
            <Expander>Vilkår og betingelser</Expander>
            <ExpandablePanel.Content>
                <p>Forsikringen gjelder fra betalingsdato.</p>
            </ExpandablePanel.Content>
        </ExpandablePanel>
    );
}
