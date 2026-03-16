"use client";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function CardExample(props: ComponentExampleProps) {
    const padding = (props.padding ?? "s") as "s" | "m" | "l" | "xl";
    const variant = (props.variant ?? "high") as "outlined" | "high" | "low";
    const clickable = props.clickable === "true";

    const cardProps = clickable
        ? { as: "button" as const, type: "button" as const, clickable: true, "aria-label": "Les mer om bilforsikring" }
        : {};

    return (
        <Card padding={padding} variant={variant} {...cardProps}>
            <Flex direction="column" gap="xs">
                <strong>Bilforsikring</strong>
                <span>Inkluderer kasko og veihjelp.</span>
            </Flex>
        </Card>
    );
}
