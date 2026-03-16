"use client";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Button } from "@fremtind/jokul/button";

export function CardPreview() {
    return (
        <div style={{ maxWidth: "18rem", width: "100%" }}>
            <Card padding="m">
                <Flex direction="column" gap="s">
                    <p style={{ margin: 0, fontWeight: "bold" }}>Bilforsikring kasko</p>
                    <p style={{ margin: 0 }}>Månedspremie: 542 kr</p>
                    <Button variant="secondary">Velg</Button>
                </Flex>
            </Card>
        </div>
    );
}
