"use client";
import { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "@fremtind/jokul/tabs";
import { Card } from "@fremtind/jokul/card";
import type { ComponentExampleProps } from "../types";

const tabLabels = ["Bil", "Hus", "Reise"] as const;

export function TabsExample(props: ComponentExampleProps) {
    const rawDefaultTab = typeof props.defaultTab === "number" ? props.defaultTab : 0;
    const safeDefaultTab = Math.min(Math.max(0, Math.round(rawDefaultTab)), tabLabels.length - 1);
    const [activeTab, setActiveTab] = useState(safeDefaultTab);
    const [instanceKey, setInstanceKey] = useState(0);

    useEffect(() => {
        setActiveTab(safeDefaultTab);
        setInstanceKey((prev) => prev + 1);
    }, [safeDefaultTab]);

    return (
        <Tabs
            key={instanceKey}
            defaultTab={activeTab}
            onChange={(index) => {
                setActiveTab(index);
            }}
        >
            <TabList>
                {tabLabels.map((label) => (
                    <Tab key={label}>{label}</Tab>
                ))}
            </TabList>
            <TabPanel>
                <Card padding="l">Forsikring for din bil</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Sikre ditt hjem</Card>
            </TabPanel>
            <TabPanel>
                <Card padding="l">Trygghet på reisen</Card>
            </TabPanel>
        </Tabs>
    );
}
