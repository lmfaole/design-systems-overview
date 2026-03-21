import type { CSSProperties, ReactNode } from "react";

const frameStyle: CSSProperties = {
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

const fullSizeStyle: CSSProperties = {
  display: "block",
  inlineSize: "100%",
  blockSize: "100%",
};

function createTableExample(
  kind: string,
  children: ReactNode,
  style?: CSSProperties,
): ReactNode {
  return (
    <span
      aria-hidden="true"
      data-token-table-example={kind}
      style={{ ...frameStyle, ...style }}
    >
      {children}
    </span>
  );
}

export function createTableExampleFrame(
  kind: string,
  children: ReactNode,
  style?: CSSProperties,
): ReactNode {
  return createTableExample(kind, children, style);
}

function parseNumericValue(value: string): number {
  const match = value.match(/-?\d+(\.\d+)?/);

  return match ? Number(match[0]) : 0;
}

function convertShadowValueToCss(value: string): string {
  return value.replace(/ru\.rem\(([\d.]+)px\)/g, (_, px: string) => `${Number(px) / 16}rem`);
}

export function createColorSwatchExample(background: string): ReactNode {
  return createTableExample(
    "color",
    <span
      style={{
        ...fullSizeStyle,
        borderRadius: "var(--jkl-border-radius-xs)",
        border: "1px solid var(--jkl-color-border-separator)",
        background,
      }}
    />,
    { padding: "0.4375rem" },
  );
}

export function createDualColorSwatchExample(light: string, dark: string): ReactNode {
  return createTableExample(
    "color-pair",
    <span
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "0.25rem",
        inlineSize: "100%",
        blockSize: "100%",
      }}
    >
      <span
        style={{
          ...fullSizeStyle,
          borderRadius: "var(--jkl-border-radius-xs)",
          border: "1px solid var(--jkl-color-border-separator)",
          background: light,
        }}
      />
      <span
        style={{
          ...fullSizeStyle,
          borderRadius: "var(--jkl-border-radius-xs)",
          border: "1px solid var(--jkl-color-border-separator)",
          background: dark,
        }}
      />
    </span>,
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
): ReactNode {
  const kind = options?.kind ?? "length";
  const thickness = options?.thickness ?? "0.75rem";
  const color = options?.color ?? "var(--jkl-color-background-action)";
  const isZero = parseNumericValue(length) === 0;

  return createTableExample(
    kind,
    <span
      style={{
        display: "block",
        inlineSize: isZero ? "2px" : `min(100%, ${length})`,
        minInlineSize: "2px",
        blockSize: thickness,
        marginInlineEnd: "auto",
        borderRadius: "999px",
        background: color,
        opacity: isZero ? 0.24 : 1,
      }}
    />,
  );
}

export function createScaledBarExample(
  value: string,
  maxValue: number,
  kind = "range-start",
): ReactNode {
  const percentage = Math.max((parseNumericValue(value) / maxValue) * 100, 3);

  return createTableExample(
    kind,
    <span
      style={{
        display: "block",
        inlineSize: "100%",
        blockSize: "0.75rem",
        borderRadius: "999px",
        background: "var(--jkl-color-background-page)",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          display: "block",
          inlineSize: `${Math.min(percentage, 100)}%`,
          minInlineSize: "2px",
          blockSize: "100%",
          borderRadius: "999px",
          background: "var(--jkl-color-background-action)",
          opacity: parseNumericValue(value) === 0 ? 0.24 : 1,
        }}
      />
    </span>,
  );
}

export function createRangeExample(min: string, max: string, maxValue: number): ReactNode {
  const minValue = parseNumericValue(min);
  const maxTokenValue = max === "∞" ? maxValue : parseNumericValue(max);
  const start = Math.min((minValue / maxValue) * 100, max === "∞" ? 94 : 100);
  const width =
    max === "∞"
      ? Math.max(100 - start, 6)
      : Math.max(((maxTokenValue - minValue) / maxValue) * 100, 6);

  return createTableExample(
    "range",
    <span
      style={{
        position: "relative",
        display: "block",
        inlineSize: "100%",
        blockSize: "0.75rem",
        borderRadius: "999px",
        background: "var(--jkl-color-background-page)",
        overflow: "hidden",
      }}
    >
        <span
        style={{
          position: "absolute",
          insetBlock: 0,
          insetInlineStart: `${start}%`,
          inlineSize: `${Math.min(width, 100 - start)}%`,
          minInlineSize: "6%",
          blockSize: "100%",
          borderRadius: "999px",
          background: "var(--jkl-color-background-action)",
        }}
      />
    </span>,
  );
}

export function createTextExample(
  text: string,
  textStyle: CSSProperties,
  kind = "text",
): ReactNode {
  return createTableExample(
    kind,
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        inlineSize: "100%",
        blockSize: "100%",
        whiteSpace: "nowrap",
        ...textStyle,
      }}
    >
      {text}
    </span>,
  );
}

export function createShadowExample(value: string): ReactNode {
  return createTableExample(
    "shadow",
    <span
      style={{
        display: "block",
        inlineSize: "100%",
        blockSize: "100%",
        borderRadius: "var(--jkl-border-radius-s)",
        background: "var(--jkl-color-brand-hvit)",
        boxShadow: convertShadowValueToCss(value),
      }}
    />,
    {
      background: "linear-gradient(180deg, var(--jkl-color-background-page), var(--jkl-color-background-container-low))",
    },
  );
}
