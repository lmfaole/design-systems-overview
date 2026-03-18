"use client";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";

export function ModalPreview() {
    return (
        <div style={{ border: "1px solid var(--jkl-color-border-default, #ccc)", borderRadius: 4, padding: "16px", maxWidth: 280, width: "100%" }}>
            <Flex direction="column" gap="s">
                <strong>Bekreft handling</strong>
                <p style={{ margin: 0, fontSize: "0.9em" }}>Er du sikker på at du vil fortsette?</p>
                <Flex gap="xs">
                    <Button>Bekreft</Button>
                    <Button variant="secondary">Avbryt</Button>
                </Flex>
            </Flex>
        </div>
    );
}
