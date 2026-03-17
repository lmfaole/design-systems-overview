"use client";
import { ProgressBar } from "@fremtind/jokul/progress-bar";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function ProgressBarExample(props: ComponentExampleProps) {
    const valueMin = typeof props["aria-valuemin"] === "number" ? props["aria-valuemin"] : 0;
    const valueMax = typeof props["aria-valuemax"] === "number" ? props["aria-valuemax"] : 100;
    const min = Math.min(valueMin, valueMax);
    const max = Math.max(valueMin, valueMax);
    const rawNow = typeof props["aria-valuenow"] === "number" ? props["aria-valuenow"] : 40;
    const now = Math.min(Math.max(rawNow, min), max);
    const title = typeof props.title === "string" && props.title.trim() !== "" ? props.title : undefined;
    const valueText = typeof props["aria-valuetext"] === "string" && props["aria-valuetext"].trim() !== ""
        ? props["aria-valuetext"]
        : undefined;

    return (
        <Flex direction="column" gap="s">
            <ProgressBar
                title={title}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={now}
                aria-valuetext={valueText}
            />
        </Flex>
    );
}
