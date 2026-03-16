"use client";

import { Card } from "@fremtind/jokul/card";
import { Tab, TabList, TabPanel, Tabs } from "@fremtind/jokul/tabs";

export function SimpleTabsExample() {
    return (
        <Tabs defaultTab={0}>
            <TabList>
                <Tab>Oversikt</Tab>
                <Tab>Detaljer</Tab>
            </TabList>
            <TabPanel>
                <Card padding="l">Kort oppsummering av avtalen.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Detaljer om dekning og vilkår.</Card>
            </TabPanel>
        </Tabs>
    );
}

export function ManyTabsExample() {
    return (
        <Tabs defaultTab={0}>
            <TabList>
                <Tab>Bil</Tab>
                <Tab>Hus</Tab>
                <Tab>Reise</Tab>
                <Tab>Båt</Tab>
            </TabList>
            <TabPanel>
                <Card padding="l">Forsikring for din bil.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Sikre ditt hjem.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Trygghet på reisen.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Forsikring for båten din.</Card>
            </TabPanel>
        </Tabs>
    );
}

export function OverloadedTabsExample() {
    return (
        <Tabs defaultTab={0}>
            <TabList>
                <Tab>Bilforsikring detaljert</Tab>
                <Tab>Hus og innbo fullstendig</Tab>
                <Tab>Reise med tillegg</Tab>
                <Tab>Båt og motor</Tab>
                <Tab>Kjæledyr</Tab>
                <Tab>Verdisaker</Tab>
            </TabList>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Omfattende innhold som kanskje burde vært på egen side.</Card>
            </TabPanel>
        </Tabs>
    );
}
