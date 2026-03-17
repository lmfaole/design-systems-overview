"use client";

import { Flex } from "@fremtind/jokul/flex";
import type { FlexProps } from "@fremtind/jokul/flex";
import { Card } from "@fremtind/jokul/card";
import type { ComponentExampleProps } from "../types";

const itemLabels = ["Opprett", "Lagre", "Del", "Eksporter", "Arkiver", "Slett"];

const alignItemValues = new Set(["normal", "start", "center", "end", "baseline", "stretch"]);
const alignContentValues = new Set([
    "normal",
    "start",
    "center",
    "end",
    "stretch",
    "baseline",
    "space-between",
    "space-around",
    "space-evenly",
]);
const justifyContentValues = new Set([
    "normal",
    "start",
    "center",
    "end",
    "space-between",
    "space-around",
    "space-evenly",
]);
const textAlignValues = new Set(["left", "center", "right"]);
const layoutValues = new Set(["auto", "1", "2", "3", "4", "6", "4.8", "8.4", "2.10", "10.2", "3.9", "9.3", "5.7", "7.5"]);
const centerValues = new Set(["m", "l", "xl", "2xl"]);
const breakpointValues = new Set(["small", "medium", "large", "xl"]);
const gapTokenValues = new Set([
    "none",
    "2xs",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "2xl",
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
]);

function parseResponsiveMap(value: unknown): Record<string, string> | undefined {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    const entries = Object.entries(value)
        .filter(([key]) => breakpointValues.has(key))
        .map(([key, rawValue]) => {
            if (typeof rawValue === "string") return [key, rawValue.trim()] as const;
            if (typeof rawValue === "number") return [key, String(rawValue)] as const;
            return [key, ""] as const;
        })
        .filter(([, rawValue]) => rawValue.length > 0);

    if (entries.length === 0) return undefined;
    return Object.fromEntries(entries);
}

function isGapValue(value: string) {
    const trimmed = value.trim();
    if (trimmed.length === 0) return false;
    if (gapTokenValues.has(trimmed)) return true;
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length !== 2) return false;
    const [first, second] = parts;
    const bothTokens = gapTokenValues.has(first) && gapTokenValues.has(second);
    if (!bothTokens) return false;
    const firstIsStatic = /^\d+$/.test(first);
    const secondIsStatic = /^\d+$/.test(second);
    return firstIsStatic === secondIsStatic;
}

function parseResponsiveGap(value: unknown): Record<string, string> | undefined {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    const entries = Object.entries(value)
        .filter(([key]) => breakpointValues.has(key))
        .map(([key, rawValue]) => {
            if (typeof rawValue === "string") return [key, rawValue.trim()] as const;
            if (typeof rawValue === "number") return [key, String(rawValue)] as const;
            return [key, ""] as const;
        })
        .filter(([, rawValue]) => isGapValue(rawValue));

    if (entries.length === 0) return undefined;
    return Object.fromEntries(entries);
}

export function FlexExample(props: ComponentExampleProps) {
    const direction = (
        props.direction === "column" || props.direction === "row-reverse" || props.direction === "column-reverse"
            ? props.direction
            : "row"
    ) as FlexProps["direction"];
    const wrap = (props.wrap === "wrap" || props.wrap === "reverse" ? props.wrap : "nowrap") as FlexProps["wrap"];
    const gap = typeof props.gap === "string" && isGapValue(props.gap) ? props.gap : "m";
    const alignItems = (
        typeof props.alignItems === "string" && alignItemValues.has(props.alignItems) ? props.alignItems : undefined
    ) as FlexProps["alignItems"];
    const alignContent = (
        typeof props.alignContent === "string" && alignContentValues.has(props.alignContent)
            ? props.alignContent
            : undefined
    ) as FlexProps["alignContent"];
    const justifyContent = (
        typeof props.justifyContent === "string" && justifyContentValues.has(props.justifyContent)
            ? props.justifyContent
            : undefined
    ) as FlexProps["justifyContent"];
    const textAlign = (
        typeof props.textAlign === "string" && textAlignValues.has(props.textAlign) ? props.textAlign : undefined
    ) as FlexProps["textAlign"];
    const layout = (
        typeof props.layout === "string" && layoutValues.has(props.layout) ? props.layout : undefined
    ) as FlexProps["layout"];
    const fill = props.fill === true;
    const inline = props.inline === true;
    const center = (
        props.center === true || (typeof props.center === "string" && centerValues.has(props.center))
            ? (props.center as "m" | "l" | "xl" | "2xl" | true)
            : undefined;
    ) as FlexProps["center"];
    const asChild = props.asChild === true;
    const as =
        typeof props.as === "string" && props.as.trim().length > 0
            ? (props.as as "div" | "section" | "article" | "nav")
            : "div";
    const demo = typeof props.demo === "object" && props.demo !== null && !Array.isArray(props.demo) ? props.demo : {};
    const itemCountRaw = (demo as Record<string, unknown>).itemCount;
    const itemCount = typeof itemCountRaw === "number" && Number.isFinite(itemCountRaw)
        ? Math.min(Math.max(Math.round(itemCountRaw), 4), 24)
        : 12;
    const heightRaw = (demo as Record<string, unknown>).containerHeight;
    const containerHeight = typeof heightRaw === "number" && Number.isFinite(heightRaw)
        ? Math.min(Math.max(heightRaw, 8), 32)
        : 16;
    const useResponsive = (demo as Record<string, unknown>).useResponsive === true;
    const responsiveGap = parseResponsiveGap((demo as Record<string, unknown>).gapResponsive);
    const responsiveLayout = parseResponsiveMap((demo as Record<string, unknown>).layoutResponsive);

    const resolvedGap = (useResponsive && responsiveGap ? responsiveGap : gap) as FlexProps["gap"];
    const resolvedLayout = useResponsive && responsiveLayout ? responsiveLayout : layout;

    const content = Array.from({ length: itemCount }, (_, index) => {
        const label = itemLabels[index % itemLabels.length] ?? `Element ${index + 1}`;
        return (
            <Card key={`${label}-${index}`} padding="s">
                <div>{label}</div>
                {index % 3 === 0 && <div>Detaljer</div>}
            </Card>
        );
    });

    return (
        <div
            style={{
                minHeight: `${containerHeight}rem`,
                padding: "var(--jkl-spacing-m)",
                borderRadius: "var(--jkl-border-radius-m)",
                backgroundColor: "var(--jkl-color-background-container-low)",
            }}
        >
            <Flex
                direction={direction}
                wrap={wrap}
                gap={resolvedGap}
                alignItems={alignItems}
                alignContent={alignContent}
                justifyContent={justifyContent}
                textAlign={textAlign}
                layout={resolvedLayout}
                fill={fill}
                inline={inline}
                center={center}
                {...(asChild ? { asChild: true } : { as })}
            >
                {asChild ? <section aria-label="Eksempelinnhold">{content}</section> : content}
            </Flex>
        </div>
    );
}
