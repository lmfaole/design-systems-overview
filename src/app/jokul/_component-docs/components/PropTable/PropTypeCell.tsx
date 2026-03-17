"use client";

import React from "react";
import { Popover } from "@fremtind/jokul/popover";
import { Flex } from "@fremtind/jokul/flex";
import { Button } from "@fremtind/jokul/button";
import { DescriptionDetail, DescriptionList, DescriptionTerm } from "@fremtind/jokul/description-list";
import type { PropDef } from "@/app/jokul/_component-docs/data";
import { commonProps } from "../../docs/common-props";
import { CopyableCode } from "../CopyableCode/CopyableCode";
import { inlineCodeStyle } from "./constants";
import {
    extractFunctionParams,
    extractFunctionReturnType,
    isObjectLiteralType,
    parseObjectLiteralFields,
    summarizeObjectLiteralType,
} from "./typeParsing";

function isCallbackPropName(name: string): boolean {
    return /^on[A-Z]/.test(name);
}

function isFunctionLikeType(type: string): boolean {
    // Heuristics: docs store types as strings, so we need a cheap "looks like a callback" check
    // to decide when to render the `name()` popover trigger.
    return (
        type.includes("=>") ||
        /\bEventHandler\b/.test(type) ||
        /\bChangeEventHandler\b/.test(type) ||
        /\bDispatch\b/.test(type) ||
        /\bSetStateAction\b/.test(type)
    );
}

function objectTypeToPropDefs(type: string): PropDef[] {
    // We intentionally leave descriptions empty; the doc string should explain semantics.
    // The table is mainly used to make option shapes scannable.
    return parseObjectLiteralFields(type).map((f) => ({
        name: f.name,
        type: f.type,
        required: !f.optional,
        source: "custom",
        status: "stable",
        description: "",
    }));
}

function stripQuotes(value: string) {
    const match = value.match(/^['"](.+)['"]$/);
    return match ? match[1] : value;
}

const GAP_SEMANTIC_VALUES = ["none", "2xs", "xs", "s", "m", "l", "xl", "2xl"] as const;
const GAP_STATIC_VALUES = [
    "0",
    "2",
    "4",
    "8",
    "12",
    "16",
    "20",
    "24",
    "28",
    "32",
    "40",
    "48",
    "56",
    "64",
    "72",
    "80",
    "104",
    "168",
] as const;
const RESPONSIVE_BREAKPOINTS = ["small", "medium", "large", "xl"] as const;
const LAYOUT_VALUES = ["auto", "1", "2", "3", "4", "6", "4.8", "8.4", "2.10", "10.2", "3.9", "9.3", "5.7", "7.5"] as const;

export function PropTypeCell({
    prop,
    renderPropTable,
}: {
    prop: PropDef;
    renderPropTable: (props: PropDef[]) => React.ReactNode;
}) {
    const type = prop.type;
    const isCallback = isCallbackPropName(prop.name) || isFunctionLikeType(type);
    const isObject = isObjectLiteralType(type);
    const isGapType = /\bGap\b/.test(type);
    const isLayoutType = /\bLayout\b/.test(type);

    // Only treat the prop type as a "nested prop group" when the prop itself is that type.
    // Callback-like props may reference these types in their parameters (e.g. `options?: ToastOptions`).
    const commonPropKey =
        !isCallback && !isObject
            ? Object.keys(commonProps).find((key) => new RegExp(`\\b${key}\\b`).test(type))
            : null;
    const nestedProps = commonPropKey ? commonProps[commonPropKey] : null;

    const codeStyle: React.CSSProperties = {
        display: "block",
        maxWidth: "20ch",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        fontFamily: "inherit",
        fontSize: "inherit",
    };

    const unionOptions = type.split(" | ").map((opt) => opt.trim());
    const isSimpleUnion = unionOptions.length > 1 && unionOptions.length <= 12 && !type.includes("&");

    if (isCallback || isObject) {
        const fields = isObject ? parseObjectLiteralFields(type) : [];
        const functionParams = isCallback ? extractFunctionParams(type) : [];
        const functionReturnType = isCallback ? extractFunctionReturnType(type) : null;

        // Special-case: show `options` as a nested prop table (or as a common prop group).
        const optionsParam = functionParams.find((p) => p.name === "options");
        const optionsCommonKey = optionsParam
            ? Object.keys(commonProps).find((key) => new RegExp(`\\b${key}\\b`).test(optionsParam.type))
            : null;
        const optionsProps = optionsCommonKey
            ? commonProps[optionsCommonKey]
            : optionsParam && isObjectLiteralType(optionsParam.type)
                ? objectTypeToPropDefs(optionsParam.type)
                : null;

        return (
            <Popover clickOptions={{ enabled: true }}>
                <Popover.Trigger asChild>
                    <Button
                        data-size="small"
                        variant="ghost"
                        type="button"
                        style={{ maxWidth: "28ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                        <code style={inlineCodeStyle}>{prop.name}()</code>
                    </Button>
                </Popover.Trigger>
                <Popover.Content padding={16} style={{ maxWidth: "min(90vw, 720px)", maxHeight: "60vh", overflow: "auto" }}>
                    <Flex direction="column" gap="s">
                        <p style={{ margin: 0 }}>
                            <strong>{prop.name}</strong>
                        </p>

                        {/* Object literals get a short summary plus the full type string. */}
                        {isObject && (
                            <p style={{ margin: 0 }}>
                                <code style={inlineCodeStyle}>{summarizeObjectLiteralType(type)}</code>
                            </p>
                        )}
                        {!isCallback && (
                            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                                <code style={inlineCodeStyle}>{type}</code>
                            </pre>
                        )}

                        <p style={{ margin: 0 }}>{prop.description}</p>

                        {/* Callback-like props: avoid dumping the full signature; show parameters and return type instead. */}
                        {isCallback && (functionParams.length > 0 || functionReturnType) && (
                            <DescriptionList separators>
                                {functionParams
                                    .filter((p) => p.name !== "options")
                                    .map((p) => (
                                        <React.Fragment key={p.name}>
                                            <DescriptionTerm>
                                                <code style={inlineCodeStyle}>
                                                    {p.name}
                                                    {p.optional ? "?" : ""}
                                                </code>
                                            </DescriptionTerm>
                                            <DescriptionDetail>
                                                <code style={inlineCodeStyle}>{p.type}</code>
                                            </DescriptionDetail>
                                        </React.Fragment>
                                    ))}

                                {functionReturnType && (
                                    <>
                                        <DescriptionTerm>Returnerer</DescriptionTerm>
                                        <DescriptionDetail>
                                            <code style={inlineCodeStyle}>{functionReturnType}</code>
                                        </DescriptionDetail>
                                    </>
                                )}
                            </DescriptionList>
                        )}

                        {optionsProps && optionsProps.length > 0 && (
                            <div>
                                <p style={{ margin: 0 }}>
                                    <strong>options</strong>
                                </p>
                                {renderPropTable(optionsProps)}
                            </div>
                        )}

                        {fields.length > 0 && (
                            <DescriptionList separators>
                                {fields.map((f) => (
                                    <React.Fragment key={f.name}>
                                        <DescriptionTerm>
                                            <code style={inlineCodeStyle}>
                                                {f.name}
                                                {f.optional ? "?" : ""}
                                            </code>
                                        </DescriptionTerm>
                                        <DescriptionDetail>
                                            <code style={inlineCodeStyle}>{f.type}</code>
                                        </DescriptionDetail>
                                    </React.Fragment>
                                ))}
                            </DescriptionList>
                        )}
                    </Flex>
                </Popover.Content>
            </Popover>
        );
    }

    if (nestedProps) {
        return (
            <Popover clickOptions={{ enabled: true }}>
                <Popover.Trigger asChild>
                    <Button variant="ghost" type="button" data-size="small">
                        {commonPropKey}
                    </Button>
                </Popover.Trigger>
                <Popover.Content padding={16} style={{ maxWidth: "min(90vw, 800px)", maxHeight: "60vh", overflow: "auto" }}>
                    <Flex direction="column" gap="s">
                        <p style={{ margin: 0 }}>
                            <strong>{commonPropKey}</strong>
                        </p>
                        {renderPropTable(nestedProps)}
                    </Flex>
                </Popover.Content>
            </Popover>
        );
    }

    if (isGapType || isLayoutType) {
        const title = isGapType ? "Gap" : "Layout";
        return (
            <Popover clickOptions={{ enabled: true }}>
                <Popover.Trigger asChild>
                    <Button variant="ghost" type="button" data-size="small">
                        <code style={inlineCodeStyle}>{type}</code>
                    </Button>
                </Popover.Trigger>
                <Popover.Content padding={16} style={{ maxWidth: "min(90vw, 760px)", maxHeight: "60vh", overflow: "auto" }}>
                    <Flex direction="column" gap="s">
                        <p style={{ margin: 0 }}>
                            <strong>{title}</strong>
                        </p>

                        {isGapType ? (
                            <DescriptionList separators>
                                <DescriptionTerm>Semantiske</DescriptionTerm>
                                <DescriptionDetail>
                                    <code style={inlineCodeStyle}>{GAP_SEMANTIC_VALUES.join(", ")}</code>
                                </DescriptionDetail>
                                <DescriptionTerm>Statiske</DescriptionTerm>
                                <DescriptionDetail>
                                    <code style={inlineCodeStyle}>{GAP_STATIC_VALUES.join(", ")}</code>
                                </DescriptionDetail>
                                <DescriptionTerm>Responsiv</DescriptionTerm>
                                <DescriptionDetail>
                                    <Flex direction="column" gap="xs">
                                        <code style={inlineCodeStyle}>{`{ small: "s", large: "l" }`}</code>
                                        <span>
                                            Breakpoints: <code style={inlineCodeStyle}>{RESPONSIVE_BREAKPOINTS.join(", ")}</code>
                                        </span>
                                    </Flex>
                                </DescriptionDetail>
                                <DescriptionTerm>Rad/kolonne</DescriptionTerm>
                                <DescriptionDetail>
                                    <code style={inlineCodeStyle}>{`"s m"`}</code>
                                </DescriptionDetail>
                                <DescriptionTerm>Eksempel</DescriptionTerm>
                                <DescriptionDetail>
                                    <CopyableCode>{`gap={{ small: "s", large: "l" }}`}</CopyableCode>
                                </DescriptionDetail>
                                <DescriptionTerm>Eksempel (rad/kolonne)</DescriptionTerm>
                                <DescriptionDetail>
                                    <CopyableCode>{`gap="s m"`}</CopyableCode>
                                </DescriptionDetail>
                            </DescriptionList>
                        ) : (
                            <DescriptionList separators>
                                <DescriptionTerm>Verdier</DescriptionTerm>
                                <DescriptionDetail>
                                    <code style={inlineCodeStyle}>{LAYOUT_VALUES.join(", ")}</code>
                                </DescriptionDetail>
                                <DescriptionTerm>Responsiv</DescriptionTerm>
                                <DescriptionDetail>
                                    <Flex direction="column" gap="xs">
                                        <code style={inlineCodeStyle}>{`{ small: "1", large: "3" }`}</code>
                                        <span>
                                            Breakpoints: <code style={inlineCodeStyle}>{RESPONSIVE_BREAKPOINTS.join(", ")}</code>
                                        </span>
                                    </Flex>
                                </DescriptionDetail>
                                <DescriptionTerm>Eksempel</DescriptionTerm>
                                <DescriptionDetail>
                                    <CopyableCode>{`layout={{ small: "1", large: "3" }}`}</CopyableCode>
                                </DescriptionDetail>
                                <DescriptionTerm>Eksempel (alternativ)</DescriptionTerm>
                                <DescriptionDetail>
                                    <CopyableCode>{`layout={{ small: "2.10", large: "10.2" }}`}</CopyableCode>
                                </DescriptionDetail>
                            </DescriptionList>
                        )}
                    </Flex>
                </Popover.Content>
            </Popover>
        );
    }

    if (isSimpleUnion) {
        const displayOptions = unionOptions.map(stripQuotes);
        return (
            <code
                style={{
                    display: "block",
                    maxWidth: "28ch",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                }}
                title={type}
            >
                {displayOptions.join(", ")}
            </code>
        );
    }

    return (
        <code style={codeStyle} title={type}>
            {type}
        </code>
    );
}
