"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { BETA_Select as Select } from "@fremtind/jokul/select";
import { Popover } from "@fremtind/jokul/popover";
import { Button } from "@fremtind/jokul/button";
import "./ComponentExample.scss";
import type { ComponentExampleControl, ComponentExampleProps as ExampleValues } from "@/app/jokul/_component-docs/docs/types/component";

type ComponentExampleComponentProps = {
    titleId?: string;
    children: React.ReactNode | ((props: ExampleValues) => React.ReactNode);
    controls?: ComponentExampleControl[];
};

function initControlValues(controls: ComponentExampleControl[] | undefined) {
    return (controls ?? []).reduce<Record<string, string>>((acc, control) => {
        acc[control.name] = control.defaultValue;
        return acc;
    }, {});
}

export function ComponentExample({ titleId = "eksempel", children, controls }: ComponentExampleComponentProps) {
    const [exampleTheme, setExampleTheme] = useState("auto");
    const [exampleSize, setExampleSize] = useState("medium");
    const [exampleProps, setExampleProps] = useState<Record<string, string>>(() => initControlValues(controls));
    const [isMobile, setIsMobile] = useState(false);
    const [displayOpen, setDisplayOpen] = useState(false);
    const [propsOpen, setPropsOpen] = useState(false);
    const content = typeof children === "function" ? children(exampleProps) : children;
    const showProps = typeof children === "function" && (controls?.length ?? 0) > 0;

    useEffect(() => {
        setExampleProps(initControlValues(controls));
    }, [controls]);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 48rem)");
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    const displayControls = useMemo(() => (
        <>
            <Select
                label="Tema"
                name="example-theme"
                value={exampleTheme}
                onChange={({ target }) => setExampleTheme(target.value)}
            >
                <option value="auto">auto</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
            </Select>
            <Select
                label="Størrelse"
                name="example-size"
                value={exampleSize}
                onChange={({ target }) => setExampleSize(target.value)}
            >
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </Select>
        </>
    ), [exampleTheme, exampleSize]);

    const propControls = useMemo(() => (
        <>
            {(controls ?? []).map((control) => (
                <Select
                    key={control.name}
                    label={control.name}
                    name={`example-${control.name}`}
                    value={exampleProps[control.name] ?? control.defaultValue}
                    onChange={({ target }) =>
                        setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                    }
                >
                    {control.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Select>
            ))}
        </>
    ), [controls, exampleProps]);

    return (
        <section className="component-page-example" aria-labelledby={titleId}>
            <Flex direction="column">
                <h2 id={titleId}>Eksempel</h2>
                <Flex direction="column" gap="xs">
                    <Card>
                        <div
                            className="component-page-example__area"
                            data-theme={exampleTheme === "auto" ? undefined : exampleTheme}
                            data-size={exampleSize}
                        >
                            <Flex
                                className="component-page-example__area__inner"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {content}
                            </Flex>
                        </div>
                    </Card>
                    <Card data-size="small" asChild padding="l">
                        {isMobile ? (
                            <Flex gap="m" wrap="wrap" className="component-example__toolbar component-example__toolbar--mobile">
                                <Popover open={displayOpen} onOpenChange={setDisplayOpen} clickOptions={{ enabled: true }}>
                                    <Popover.Trigger asChild>
                                        <Button variant="secondary">Visning</Button>
                                    </Popover.Trigger>
                                    <Popover.Content padding={16}>
                                        <Flex direction="column" gap="m" data-size="small">
                                            {displayControls}
                                        </Flex>
                                    </Popover.Content>
                                </Popover>
                                {showProps && (
                                    <Popover open={propsOpen} onOpenChange={setPropsOpen} clickOptions={{ enabled: true }}>
                                        <Popover.Trigger asChild>
                                            <Button variant="secondary">Props</Button>
                                        </Popover.Trigger>
                                        <Popover.Content padding={16}>
                                            <Flex direction="column" gap="m" data-size="small">
                                                {propControls}
                                            </Flex>
                                        </Popover.Content>
                                    </Popover>
                                )}
                            </Flex>
                        ) : (
                            <Flex gap="m" wrap="wrap" className="component-example__toolbar" justifyContent="space-between" alignItems="start">
                                <Flex gap="m" wrap="wrap">
                                    {displayControls}
                                </Flex>
                                {showProps && (
                                    <Flex gap="m" wrap="wrap" className="component-example__props">
                                        {propControls}
                                    </Flex>
                                )}
                            </Flex>
                        )}
                    </Card>
                </Flex>
            </Flex>
        </section>
    );
}
