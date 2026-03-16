"use client";
import { Flex } from "@fremtind/jokul/flex";

export function FlexPreview() {
    return (
        <Flex direction="row" gap="m" wrap="wrap" alignItems="center">
            <div style={{ width: 48, height: 48, background: "var(--jkl-color-background-surface-info)", borderRadius: "4px" }} />
            <div style={{ width: 48, height: 48, background: "var(--jkl-color-background-surface-succes)", borderRadius: "4px" }} />
            <div style={{ width: 48, height: 48, background: "var(--jkl-color-background-surface-warning)", borderRadius: "4px" }} />
            <div style={{ width: 48, height: 48, background: "var(--jkl-color-background-surface-error)", borderRadius: "4px" }} />
        </Flex>
    );
}
