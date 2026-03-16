"use client";

import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { Loader } from "@fremtind/jokul/loader";
import { ProgressBar } from "@fremtind/jokul/progress-bar";

export function LoaderStatusExample() {
    return <Loader variant="small" textDescription="Laster søkeforslag" />;
}

export function ProgressBarExample() {
    const [value, setValue] = useState(40);

    return (
        <Flex direction="column" gap="s">
            <ProgressBar aria-valuenow={value} aria-valuetext={`Fremdrift ${value}%`} />
            <Button
                variant="secondary"
                type="button"
                onClick={() => setValue((current) => (current >= 100 ? 0 : current + 20))}
            >
                Øk fremdrift
            </Button>
        </Flex>
    );
}

export function ProgressWithoutContextExample() {
    return <ProgressBar aria-valuenow={60} />;
}
