"use client";

import { ExpandablePanel } from "@fremtind/jokul/expander";
import { Flex } from "@fremtind/jokul/flex";

export function SingleDisclosureExample() {
    return (
        <ExpandablePanel>
            <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
            <ExpandablePanel.Content>
                <p>Forsikringen dekker skader, ansvar og veihjelp.</p>
            </ExpandablePanel.Content>
        </ExpandablePanel>
    );
}

export function MultipleDisclosureExample() {
    return (
        <Flex direction="column" gap="s">
            <ExpandablePanel>
                <ExpandablePanel.Header>Hvordan fungerer det?</ExpandablePanel.Header>
                <ExpandablePanel.Content>
                    <p>Du velger produkt, fyller inn informasjon og bekrefter.</p>
                </ExpandablePanel.Content>
            </ExpandablePanel>
            <ExpandablePanel>
                <ExpandablePanel.Header>Hva koster det?</ExpandablePanel.Header>
                <ExpandablePanel.Content>
                    <p>Pris avhenger av dekning og egenandel.</p>
                </ExpandablePanel.Content>
            </ExpandablePanel>
        </Flex>
    );
}

export function VagueDisclosureExample() {
    return (
        <ExpandablePanel>
            <ExpandablePanel.Header>Mer</ExpandablePanel.Header>
            <ExpandablePanel.Content>
                <p>Detaljer om dekning, pris og vilkår.</p>
            </ExpandablePanel.Content>
        </ExpandablePanel>
    );
}
