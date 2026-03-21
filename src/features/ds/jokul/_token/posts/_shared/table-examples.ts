import { serializeStyle, span, tag, text, type CssDeclarations } from "@/lib/html";

const frameStyle: CssDeclarations = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    inlineSize: "4.5rem",
    minInlineSize: "4.5rem",
    maxInlineSize: "100%",
    blockSize: "2.75rem",
    padding: "0.5rem",
    border: "1px solid var(--jkl-color-border-separator)",
    borderRadius: "var(--jkl-border-radius-s)",
    background: "var(--jkl-color-background-container-low)",
    color: "var(--jkl-color-text-subdued)",
    overflow: "hidden",
    boxSizing: "border-box",
};

const fullSizeStyle: CssDeclarations = {
    display: "block",
    inlineSize: "100%",
    blockSize: "100%",
};

function createTableExample(kind: string, content: string, style?: CssDeclarations): string {
    return span(content, {
        "aria-hidden": "true",
        "data-token-table-example": kind,
        style: serializeStyle({ ...frameStyle, ...style }),
    });
}

export function createTableExampleFrame(
    kind: string,
    childrenHtml: string,
    style?: CssDeclarations,
): string {
    return createTableExample(kind, childrenHtml, style);
}

function parseNumericValue(value: string): number {
    const match = value.match(/-?\d+(\.\d+)?/);

    return match ? Number(match[0]) : 0;
}

function isLiteralZeroLength(value: string): boolean {
    return /^0(?:\.0+)?(?:[a-z%]+)?$/i.test(value.trim());
}

function isZeroTokenReference(value: string): boolean {
    return /^var\(--[a-z0-9-]*(?:-none|-0)\)$/i.test(value.replace(/\s+/g, ""));
}

function convertShadowValueToCss(value: string): string {
    return value.replace(/ru\.rem\(([\d.]+)px\)/g, (_, px: string) => `${Number(px) / 16}rem`);
}

export function createColorSwatchExample(background: string): string {
    return createTableExample(
        "color",
        span("", {
            style: serializeStyle({
                ...fullSizeStyle,
                borderRadius: "var(--jkl-border-radius-xs)",
                border: "1px solid var(--jkl-color-border-separator)",
                background,
            }),
        }),
        { padding: "0.4375rem" },
    );
}

export function createDualColorSwatchExample(light: string, dark: string): string {
    return createTableExample(
        "color-pair",
        span(
            [
                span("", {
                    style: serializeStyle({
                        ...fullSizeStyle,
                        borderRadius: "var(--jkl-border-radius-xs)",
                        border: "1px solid var(--jkl-color-border-separator)",
                        background: light,
                    }),
                }),
                span("", {
                    style: serializeStyle({
                        ...fullSizeStyle,
                        borderRadius: "var(--jkl-border-radius-xs)",
                        border: "1px solid var(--jkl-color-border-separator)",
                        background: dark,
                    }),
                }),
            ].join(""),
            {
                style: serializeStyle({
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "0.25rem",
                    inlineSize: "100%",
                    blockSize: "100%",
                }),
            },
        ),
        { padding: "0.4375rem" },
    );
}

export function createLengthBarExample(
    length: string,
    options?: {
        kind?: string;
        thickness?: string;
        color?: string;
    },
): string {
    const kind = options?.kind ?? "length";
    const thickness = options?.thickness ?? "0.75rem";
    const color = options?.color ?? "var(--jkl-color-background-action)";
    const isZero = isLiteralZeroLength(length) || isZeroTokenReference(length);

    return createTableExample(
        kind,
        span("", {
            style: serializeStyle({
                display: "block",
                inlineSize: isZero ? "2px" : `min(100%, ${length})`,
                minInlineSize: "2px",
                blockSize: thickness,
                marginInlineEnd: "auto",
                borderRadius: "999px",
                background: color,
                opacity: isZero ? 0.24 : 1,
            }),
        }),
    );
}

export function createScaledBarExample(value: string, maxValue: number, kind = "range-start"): string {
    const percentage = Math.max((parseNumericValue(value) / maxValue) * 100, 3);

    return createTableExample(
        kind,
        span(
            span("", {
                style: serializeStyle({
                    display: "block",
                    inlineSize: `${Math.min(percentage, 100)}%`,
                    minInlineSize: "2px",
                    blockSize: "100%",
                    borderRadius: "999px",
                    background: "var(--jkl-color-background-action)",
                    opacity: parseNumericValue(value) === 0 ? 0.24 : 1,
                }),
            }),
            {
                style: serializeStyle({
                    display: "block",
                    inlineSize: "100%",
                    blockSize: "0.75rem",
                    borderRadius: "999px",
                    background: "var(--jkl-color-background-page)",
                    overflow: "hidden",
                }),
            },
        ),
    );
}

export function createRangeExample(min: string, max: string, maxValue: number): string {
    const minValue = parseNumericValue(min);
    const maxTokenValue = max === "∞" ? maxValue : parseNumericValue(max);
    const start = Math.min((minValue / maxValue) * 100, max === "∞" ? 94 : 100);
    const width =
        max === "∞"
            ? Math.max(100 - start, 6)
            : Math.max(((maxTokenValue - minValue) / maxValue) * 100, 6);

    return createTableExample(
        "range",
        span(
            span("", {
                style: serializeStyle({
                    position: "absolute",
                    insetBlock: 0,
                    insetInlineStart: `${start}%`,
                    inlineSize: `${Math.min(width, 100 - start)}%`,
                    minInlineSize: "6%",
                    blockSize: "100%",
                    borderRadius: "999px",
                    background: "var(--jkl-color-background-action)",
                }),
            }),
            {
                style: serializeStyle({
                    position: "relative",
                    display: "block",
                    inlineSize: "100%",
                    blockSize: "0.75rem",
                    borderRadius: "999px",
                    background: "var(--jkl-color-background-page)",
                    overflow: "hidden",
                }),
            },
        ),
    );
}

export function createTextExample(
    sampleText: string,
    textStyle: CssDeclarations,
    kind = "text",
): string {
    return createTableExample(
        kind,
        span(text(sampleText), {
            style: serializeStyle({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                inlineSize: "100%",
                blockSize: "100%",
                whiteSpace: "nowrap",
                ...textStyle,
            }),
        }),
    );
}

export function createLineHeightExample(lineHeight: string): string {
    return createTableExampleFrame(
        "line-height",
        tag(
            "span",
            [
                span(text("Linje en")),
                span(text("Linje to")),
            ].join(""),
            {
                style: serializeStyle({
                    display: "grid",
                    inlineSize: "100%",
                    justifyItems: "start",
                    fontSize: "var(--jkl-font-size-2)",
                    lineHeight,
                }),
            },
        ),
    );
}

export function createShadowExample(value: string): string {
    return createTableExample(
        "shadow",
        span("", {
            style: serializeStyle({
                display: "block",
                inlineSize: "100%",
                blockSize: "100%",
                borderRadius: "var(--jkl-border-radius-s)",
                background: "var(--jkl-color-brand-hvit)",
                boxShadow: convertShadowValueToCss(value),
            }),
        }),
        {
            background:
                "linear-gradient(180deg, var(--jkl-color-background-page), var(--jkl-color-background-container-low))",
        },
    );
}
