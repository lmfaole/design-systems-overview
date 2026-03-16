"use client";

import { useState } from "react";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { BETA_Select as Select } from "@fremtind/jokul/select";
import "./ComponentExample.scss";

type ComponentExampleProps = {
    titleId?: string;
    children: React.ReactNode | ((props: {
        disabled: boolean;
        variant?: "primary" | "secondary" | "ghost";
        icon?: boolean;
        iconPosition?: "left" | "right";
    }) => React.ReactNode);
};

export function ComponentExample({ titleId = "eksempel", children }: ComponentExampleProps) {
    const [exampleTheme, setExampleTheme] = useState("auto");
    const [exampleSize, setExampleSize] = useState("medium");
    const [exampleDisabled, setExampleDisabled] = useState(false);
    const [exampleVariant, setExampleVariant] = useState<"primary" | "secondary" | "ghost">("primary");
    const [exampleIcon, setExampleIcon] = useState(false);
    const [exampleIconPosition, setExampleIconPosition] = useState<"left" | "right">("left");
    const content = typeof children === "function"
        ? children({
            disabled: exampleDisabled,
            variant: exampleVariant,
            icon: exampleIcon,
            iconPosition: exampleIconPosition,
        })
        : children;
    const showProps = typeof children === "function";

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
                        <Flex gap="m" wrap="wrap" justifyContent="space-between" alignItems="start">
                            <Flex gap="m" wrap="wrap">
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
                            </Flex>
                            {showProps && (
                                <Flex gap="m" wrap="wrap" className="component-example__props">
                                    <Select
                                        label="variant"
                                        name="example-variant"
                                        value={exampleVariant}
                                        onChange={({ target }) => setExampleVariant(target.value as "primary" | "secondary" | "ghost")}
                                    >
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="ghost">Ghost</option>
                                    </Select>
                                    <Select
                                        label="icon"
                                        name="example-icon"
                                        value={exampleIcon ? "on" : "off"}
                                        onChange={({ target }) => setExampleIcon(target.value === "on")}
                                    >
                                        <option value="off">Av</option>
                                        <option value="on">På</option>
                                    </Select>
                                    {exampleIcon && (
                                        <Select
                                            label="iconPosition"
                                            name="example-icon-position"
                                            value={exampleIconPosition}
                                            onChange={({ target }) => setExampleIconPosition(target.value as "left" | "right")}
                                        >
                                            <option value="left">Venstre</option>
                                            <option value="right">Høyre</option>
                                        </Select>
                                    )}
                                    <Select
                                        label="disabled"
                                        name="example-disabled"
                                        value={exampleDisabled ? "disabled" : "enabled"}
                                        onChange={({ target }) => setExampleDisabled(target.value === "disabled")}
                                    >
                                        <option value="enabled">Aktiv</option>
                                        <option value="disabled">Deaktivert</option>
                                    </Select>
                                </Flex>
                            )}
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </section>
    );
}
