import { ExpandablePanel, Expander } from "@fremtind/jokul/expander";
import type { ComponentExampleProps } from "../types";

export function ExpanderPreview(props: ComponentExampleProps = {}) {
    const expandDirection = props.expandDirection === "up" ? "up" : "down";

    return (
        <ExpandablePanel open={true} onOpenChange={() => undefined}>
            <Expander expandDirection={expandDirection}>Vilkår og betingelser</Expander>
            <ExpandablePanel.Content>
                <p>Forsikringen gjelder fra betalingsdato.</p>
            </ExpandablePanel.Content>
        </ExpandablePanel>
    );
}
