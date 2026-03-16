"use client";
import { ExpandablePanel } from "@fremtind/jokul/expander";

export function ExpandablePanelHeaderPreview() {
    return (
        <ExpandablePanel open={false} onOpenChange={() => {}}>
            <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
            <ExpandablePanel.Content><p>Forsikringen dekker skader og ansvar.</p></ExpandablePanel.Content>
        </ExpandablePanel>
    );
}

export function ExpandablePanelContentPreview() {
    return (
        <ExpandablePanel open={true} onOpenChange={() => {}}>
            <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
            <ExpandablePanel.Content><p>Forsikringen dekker skader og ansvar.</p></ExpandablePanel.Content>
        </ExpandablePanel>
    );
}

export function ExpandablePanelPreview() {
    return (
        <ExpandablePanel open={true} onOpenChange={() => undefined}>
            <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
            <ExpandablePanel.Content><p>Forsikringen dekker skader og ansvar.</p></ExpandablePanel.Content>
        </ExpandablePanel>
    );
}
