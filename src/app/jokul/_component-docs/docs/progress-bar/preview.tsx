"use client";
import { ProgressBar } from "@fremtind/jokul/progress-bar";
import { Flex } from "@fremtind/jokul/flex";

export function ProgressBarPreview() {
    const value = 40;

    return (
        <Flex direction="column" gap="s" style={{ width: "12rem" }}>
            <span style={{ fontSize: "var(--jkl-font-size-small)", color: "var(--jkl-color-text-subdued)" }}>
                {value}%
            </span>
            <ProgressBar aria-valuenow={value} title="Fremdrift" aria-valuetext={`${value} prosent fullført`} />
        </Flex>
    );
}
