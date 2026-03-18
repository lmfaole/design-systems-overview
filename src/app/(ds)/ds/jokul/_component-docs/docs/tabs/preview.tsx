"use client";
import {Tab, TabList, TabPanel, Tabs} from "@fremtind/jokul/tabs";
import {Card} from "@fremtind/jokul/card";

export function TabPreview() {
    return <TabsPreview/>;
}

export function TabListPreview() {
    return <TabsPreview/>;
}

export function TabPanelPreview() {
    return <TabsPreview/>;
}

export function TabsPreview() {
    return (
        <Tabs defaultTab={0}>
            <TabList>
                <Tab>Bil</Tab>
                <Tab>Hus</Tab>
                <Tab>Reise</Tab>
                <Tab>Båt</Tab>
            </TabList>
            <TabPanel><Card padding="l">Forsikring for din bil</Card></TabPanel>
            <TabPanel><Card padding="l">Sikre ditt hjem</Card></TabPanel>
            <TabPanel><Card padding="l">Trygghet på reisen</Card></TabPanel>
            <TabPanel><Card padding="l">Forsikring for båten din</Card></TabPanel>
        </Tabs>
    );
}
