"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { BETA_Select as Select } from "@fremtind/jokul/select";
import { Popover } from "@fremtind/jokul/popover";
import { Button } from "@fremtind/jokul/button";
import { Checkbox } from "@fremtind/jokul/checkbox";
import { TextInput } from "@fremtind/jokul/text-input";
import { FieldGroup } from "@fremtind/jokul/input-group";
import "./ComponentExample.scss";
import type {
    ComponentExampleControl,
    ComponentExampleControlValue,
    ComponentExampleProps as ExampleValues,
    ComponentExampleSelectOption,
} from "@/app/ds/jokul/_component-docs/docs/types/component";

type ComponentExampleComponentProps = {
    titleId?: string;
    children: React.ReactNode | ((props: ExampleValues) => React.ReactNode);
    controls?: ComponentExampleControl[];
};

type NormalizedSelectOption = {
    id: string;
    label: string;
    value: Exclude<ComponentExampleControlValue, undefined>;
};

type NormalizedSelectControl = Omit<Extract<ComponentExampleControl, { kind: "select" }>, "options"> & {
    options: NormalizedSelectOption[];
    defaultOptionId: string;
};

type NormalizedMultiSelectControl = Omit<Extract<ComponentExampleControl, { kind: "multiselect" }>, "options"> & {
    options: NormalizedSelectOption[];
    defaultOptionIds: string[];
};

type NormalizedControl =
    | Exclude<ComponentExampleControl, { kind: "select" | "multiselect" }>
    | NormalizedSelectControl
    | NormalizedMultiSelectControl;
type JsonRow = { id: string; key: string; value: string };
type RawControlValue = string | boolean | string[] | JsonRow[];
type ResolvedControlValue =
    | ComponentExampleControlValue
    | Array<Exclude<ComponentExampleControlValue, undefined>>
    | Record<string, unknown>
    | unknown[];

function normalizeSelectOptions(options: readonly ComponentExampleSelectOption[]): NormalizedSelectOption[] {
    return options.map((option, index) => {
        if (typeof option === "string") {
            return { id: String(index), label: option, value: option };
        }
        return { id: String(index), label: option.label, value: option.value };
    });
}

function getDefaultSelectId(
    options: NormalizedSelectOption[],
    defaultValue: Exclude<ComponentExampleControlValue, undefined> | undefined,
) {
    if (defaultValue !== undefined) {
        const match = options.find((option) => Object.is(option.value, defaultValue));
        if (match) return match.id;
    }
    return options[0]?.id ?? "";
}

function normalizeControls(controls: ComponentExampleControl[] | undefined): NormalizedControl[] {
    return (controls ?? []).map((control) => {
        if (control.kind === "multiselect") {
            const options = normalizeSelectOptions(control.options);
            const defaultIds =
                control.defaultValue?.map((value) => options.find((option) => Object.is(option.value, value))?.id)
                    .filter((id): id is string => Boolean(id)) ?? [];
            return {
                ...control,
                options,
                defaultOptionIds: defaultIds,
            };
        }
        if (control.kind !== "select") return control;
        const options = normalizeSelectOptions(control.options);
        return {
            ...control,
            options,
            defaultOptionId: getDefaultSelectId(options, control.defaultValue),
        };
    });
}

function initControlValues(controls: NormalizedControl[]) {
    return controls.reduce<Record<string, RawControlValue>>((acc, control) => {
        switch (control.kind) {
            case "boolean":
                acc[control.name] = control.defaultValue ?? false;
                break;
            case "multiselect":
                acc[control.name] = control.defaultOptionIds;
                break;
            case "json":
                acc[control.name] = parseJsonRows(control.defaultValue);
                break;
            case "text":
                acc[control.name] = control.defaultValue ?? "";
                break;
            case "number":
                acc[control.name] = control.defaultValue !== undefined ? String(control.defaultValue) : "";
                break;
            case "select":
                acc[control.name] = control.defaultOptionId;
                break;
        }
        return acc;
    }, {});
}

function createJsonRow(key = "", value = ""): JsonRow {
    return {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `row-${Math.random().toString(36).slice(2, 10)}`,
        key,
        value,
    };
}

function parseJsonRows(rawValue?: string): JsonRow[] {
    if (!rawValue) {
        return [createJsonRow()];
    }
    try {
        const parsed = JSON.parse(rawValue) as unknown;
        const stringifyValue = (value: unknown) => {
            if (typeof value === "string") return value;
            return JSON.stringify(value);
        };
        if (Array.isArray(parsed)) {
            return parsed.map((value, index) => createJsonRow(String(index), stringifyValue(value)));
        }
        if (parsed && typeof parsed === "object") {
            return Object.entries(parsed).map(([key, value]) => createJsonRow(key, stringifyValue(value)));
        }
        return [createJsonRow("", JSON.stringify(parsed))];
    } catch {
        return [createJsonRow("", rawValue)];
    }
}

function isJsonRows(value: RawControlValue | undefined): value is JsonRow[] {
    return Array.isArray(value) && value.every((row) =>
        typeof row === "object" && row !== null && "id" in row && "key" in row && "value" in row,
    );
}

function isStringArray(value: RawControlValue | undefined): value is string[] {
    return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function parseJsonRowValue(rawValue: string) {
    const trimmed = rawValue.trim();
    if (trimmed === "") return "";
    try {
        return JSON.parse(trimmed) as unknown;
    } catch {
        return rawValue;
    }
}

function resolveJsonRows(rows: JsonRow[]): { value: ResolvedControlValue | undefined; error?: string } {
    const entries = rows
        .map((row) => ({ key: row.key.trim(), value: row.value }))
        .filter((row) => row.key.length > 0);

    if (entries.length === 0) return { value: undefined };

    const keys = entries.map((entry) => entry.key);
    const uniqueKeys = new Set(keys);
    if (uniqueKeys.size !== keys.length) {
        return { value: undefined, error: "Duplikate nøkler" };
    }

    const allNumeric = keys.every((key) => /^\d+$/.test(key));
    if (allNumeric) {
        const maxIndex = Math.max(...keys.map((key) => Number(key)));
        const arrayValue: unknown[] = Array.from({ length: maxIndex + 1 }, () => undefined);
        entries.forEach((entry) => {
            arrayValue[Number(entry.key)] = parseJsonRowValue(entry.value);
        });
        return { value: arrayValue };
    }

    const objectValue: Record<string, unknown> = {};
    entries.forEach((entry) => {
        objectValue[entry.key] = parseJsonRowValue(entry.value);
    });
    return { value: objectValue };
}

type JsonControlProps = {
    control: Extract<ComponentExampleControl, { kind: "json" }>;
    rows: JsonRow[];
    onChange: (value: JsonRow[]) => void;
    inline?: boolean;
    label?: string;
};

function JsonControl({ control, rows, onChange, inline, label }: JsonControlProps) {
    const [open, setOpen] = useState(false);
    const { error } = resolveJsonRows(rows);
    const displayLabel = label ?? control.name;
    const valueOptions = control.valueOptions ? normalizeSelectOptions(control.valueOptions) : null;
    const allowRowActions = !control.keyReadOnly;

    const updateRow = (rowId: string, field: "key" | "value", nextValue: string) => {
        onChange(
            rows.map((row) => (row.id === rowId ? { ...row, [field]: nextValue } : row)),
        );
    };

    const removeRow = (rowId: string) => {
        const nextRows = rows.filter((row) => row.id !== rowId);
        onChange(nextRows.length > 0 ? nextRows : [createJsonRow()]);
    };

    const addRow = () => {
        onChange([...rows, createJsonRow()]);
    };

    const editor = (
        <Flex direction="column" gap="s">
            <span>{displayLabel}</span>
            {rows.map((row) => (
                <Flex key={row.id} gap="s" wrap="wrap" alignItems="end">
                    {control.keyReadOnly ? (
                        valueOptions ? (
                            <Select
                                label={row.key || "verdi"}
                                name={`example-${control.name}-value-${row.id}`}
                                value={
                                    valueOptions.find((option) => String(option.value) === row.value)?.id ??
                                    valueOptions[0]?.id ??
                                    ""
                                }
                                onChange={({ target }) => {
                                    const option = valueOptions.find((item) => item.id === target.value);
                                    updateRow(row.id, "value", option ? String(option.value) : "");
                                }}
                                data-size="small"
                            >
                                {valueOptions.map((option) => (
                                    <option key={option.id} value={option.id}>{option.label}</option>
                                ))}
                            </Select>
                        ) : (
                            <TextInput
                                label={row.key || "key"}
                                name={`example-${control.name}-value-${row.id}`}
                                value={row.value}
                                onChange={({ target }) => updateRow(row.id, "value", target.value)}
                                data-size="small"
                            />
                        )
                    ) : (
                        <>
                            <TextInput
                                label="key"
                                name={`example-${control.name}-key-${row.id}`}
                                value={row.key}
                                onChange={({ target }) => updateRow(row.id, "key", target.value)}
                                data-size="small"
                            />
                            {valueOptions ? (
                                <Select
                                    label="value"
                                    name={`example-${control.name}-value-${row.id}`}
                                    value={
                                        valueOptions.find((option) => String(option.value) === row.value)?.id ??
                                        valueOptions[0]?.id ??
                                        ""
                                    }
                                    onChange={({ target }) => {
                                        const option = valueOptions.find((item) => item.id === target.value);
                                        updateRow(row.id, "value", option ? String(option.value) : "");
                                    }}
                                    data-size="small"
                                >
                                    {valueOptions.map((option) => (
                                        <option key={option.id} value={option.id}>{option.label}</option>
                                    ))}
                                </Select>
                            ) : (
                                <TextInput
                                    label="value"
                                    name={`example-${control.name}-value-${row.id}`}
                                    value={row.value}
                                    onChange={({ target }) => updateRow(row.id, "value", target.value)}
                                    data-size="small"
                                />
                            )}
                            {allowRowActions && (
                                <Button
                                    variant="secondary"
                                    onClick={() => removeRow(row.id)}
                                    aria-label={`Fjern ${control.name}-rad`}
                                >
                                    Fjern
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
            ))}
            {allowRowActions && (
                <Flex alignItems="center" gap="s">
                    <Button variant="secondary" onClick={addRow}>
                        Legg til
                    </Button>
                    {error && <span className="component-example__json-error">{error}</span>}
                </Flex>
            )}
            {!allowRowActions && error && <span className="component-example__json-error">{error}</span>}
        </Flex>
    );

    if (inline) {
        return editor;
    }

    return (
        <Popover open={open} onOpenChange={setOpen} clickOptions={{ enabled: true }}>
            <Popover.Trigger asChild>
                <Button variant="secondary">{displayLabel}</Button>
            </Popover.Trigger>
            <Popover.Content padding={16}>
                <Flex direction="column" gap="m" data-size="small">
                    {editor}
                </Flex>
            </Popover.Content>
        </Popover>
    );
}

function resolveControlValue(control: NormalizedControl, rawValue: RawControlValue | undefined): ResolvedControlValue {
    switch (control.kind) {
        case "boolean":
            if (typeof rawValue === "boolean") return rawValue;
            return rawValue === "true";
        case "text":
            return typeof rawValue === "string" ? rawValue : "";
        case "number": {
            if (typeof rawValue !== "string" || rawValue.trim() === "") return undefined;
            const parsed = Number(rawValue);
            return Number.isNaN(parsed) ? undefined : parsed;
        }
        case "json": {
            const rows = isJsonRows(rawValue) ? rawValue : parseJsonRows(control.defaultValue);
            return resolveJsonRows(rows).value;
        }
        case "multiselect": {
            const selectedIds = isStringArray(rawValue) ? rawValue : [];
            return control.options
                .filter((option) => selectedIds.includes(option.id))
                .map((option) => option.value);
        }
        case "select": {
            const option = control.options.find((item) => item.id === rawValue) ?? control.options[0];
            return option?.value ?? null;
        }
    }
}

function matchesCondition(
    values: Record<string, ResolvedControlValue>,
    condition: NonNullable<NormalizedControl["visibleWhen"]>,
) {
    const current = getValueByPath(values, condition.name);
    const expected = condition.value;
    const operator = condition.operator ?? "equals";

    if (operator === "exists") {
        return current !== undefined && current !== null;
    }

    if (operator === "truthy") {
        if (Array.isArray(current)) return current.length > 0;
        return Boolean(current);
    }

    const equals = () => {
        if (Array.isArray(current)) {
            if (Array.isArray(expected)) {
                return expected.some((value) => current.some((entry) => Object.is(entry, value)));
            }
            return current.some((entry) => Object.is(entry, expected));
        }
        if (Array.isArray(expected)) {
            return expected.some((value) => Object.is(current, value));
        }
        return Object.is(current, expected);
    };

    if (operator === "notEquals") return !equals();
    return equals();
}

function setValueByPath(
    target: Record<string, ResolvedControlValue>,
    path: string,
    value: ResolvedControlValue,
) {
    if (!path.includes(".")) {
        target[path] = value;
        return;
    }

    const parts = path.split(".");
    let current: Record<string, ResolvedControlValue> = target;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        const next = current[key];
        if (!next || typeof next !== "object" || Array.isArray(next)) {
            current[key] = {};
        }
        current = current[key] as Record<string, ResolvedControlValue>;
    }
    current[parts[parts.length - 1]] = value;
}

function getValueByPath(
    target: Record<string, ResolvedControlValue>,
    path: string,
): ResolvedControlValue | undefined {
    if (!path.includes(".")) return target[path];
    const parts = path.split(".");
    let current: ResolvedControlValue | undefined = target;
    for (const part of parts) {
        if (!current || typeof current !== "object" || Array.isArray(current)) {
            return undefined;
        }
        current = (current as Record<string, ResolvedControlValue>)[part];
    }
    return current;
}

export function ComponentExample({ titleId = "eksempel", children, controls }: ComponentExampleComponentProps) {
    const [exampleTheme, setExampleTheme] = useState("auto");
    const [exampleSize, setExampleSize] = useState("medium");
    const [exampleViewport, setExampleViewport] = useState("auto");
    const normalizedControls = useMemo(() => normalizeControls(controls), [controls]);
    const [exampleProps, setExampleProps] = useState<Record<string, RawControlValue>>(() =>
        initControlValues(normalizedControls),
    );
    const [isMobile, setIsMobile] = useState(false);
    const [displayOpen, setDisplayOpen] = useState(false);
    const [propsOpen, setPropsOpen] = useState(false);
    const resolvedExampleProps = useMemo(
        () =>
            normalizedControls.reduce<Record<string, ResolvedControlValue>>((acc, control) => {
                const resolved = resolveControlValue(control, exampleProps[control.name]) as ResolvedControlValue;
                if (resolved === undefined) return acc;
                setValueByPath(acc, control.name, resolved);
                return acc;
            }, {}),
        [normalizedControls, exampleProps],
    );
    const visibleControls = useMemo(
        () =>
            normalizedControls.filter((control) =>
                control.visibleWhen ? matchesCondition(resolvedExampleProps, control.visibleWhen) : true,
            ),
        [normalizedControls, resolvedExampleProps],
    );
    const content = typeof children === "function" ? children(resolvedExampleProps) : children;
    const showProps = typeof children === "function" && visibleControls.length > 0;
    const viewportWidth =
        exampleViewport === "mobile"
            ? "23rem"
            : exampleViewport === "tablet"
                ? "48rem"
                : exampleViewport === "desktop"
                    ? "72rem"
                    : "100%";

    useEffect(() => {
        setExampleProps(initControlValues(normalizedControls));
    }, [normalizedControls]);

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
                data-size="small"
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
                data-size="small"
            >
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </Select>
            <Select
                label="Viewport"
                name="example-viewport"
                value={exampleViewport}
                onChange={({ target }) => setExampleViewport(target.value)}
                data-size="small"
            >
                <option value="auto">auto</option>
                <option value="mobile">mobile</option>
                <option value="tablet">tablet</option>
                <option value="desktop">desktop</option>
            </Select>
        </>
    ), [exampleTheme, exampleSize, exampleViewport]);

    const propControls = useMemo(() => {
        const getLabel = (control: NormalizedControl) => {
            const parts = control.name.split(".");
            return parts[parts.length - 1] || control.name;
        };

        const renderControl = (control: NormalizedControl, labelOverride?: string) => {
            const label = labelOverride ?? getLabel(control);
            const rawValue = exampleProps[control.name];
            if (control.kind === "boolean") {
                return (
                    <Checkbox
                        key={control.name}
                        name={`example-${control.name}`}
                        value="true"
                        checked={rawValue === true}
                        onChange={({ target }) =>
                            setExampleProps((prev) => ({ ...prev, [control.name]: target.checked }))
                        }
                    >
                        {label}
                    </Checkbox>
                );
            }

            if (control.kind === "multiselect") {
                const selectedValues = isStringArray(rawValue) ? rawValue : control.defaultOptionIds;
                return (
                    <Select
                        key={control.name}
                        label={label}
                        name={`example-${control.name}`}
                        value={selectedValues}
                        multiple
                        onChange={({ target }) => {
                            const nextValues = Array.from(target.selectedOptions, (option) => option.value);
                            setExampleProps((prev) => ({ ...prev, [control.name]: nextValues }));
                        }}
                        data-size="small"
                    >
                        {control.options.map((option) => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </Select>
                );
            }

            if (control.kind === "json") {
                const jsonRows = isJsonRows(rawValue) ? rawValue : parseJsonRows(control.defaultValue);
                return (
                    <JsonControl
                        key={control.name}
                        control={control}
                        rows={jsonRows}
                        inline={isMobile}
                        label={label}
                        onChange={(value) =>
                            setExampleProps((prev) => ({ ...prev, [control.name]: value }))
                        }
                    />
                );
            }

            if (control.kind === "text") {
                const textValue = typeof rawValue === "string" ? rawValue : "";
                return (
                    <TextInput
                        key={control.name}
                        label={label}
                        name={`example-${control.name}`}
                        value={textValue}
                        onChange={({ target }) =>
                            setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                        }
                        placeholder={control.placeholder}
                        data-size="small"
                    />
                );
            }

            if (control.kind === "number") {
                const numberValue = typeof rawValue === "string" ? rawValue : "";
                return (
                    <TextInput
                        key={control.name}
                        label={label}
                        name={`example-${control.name}`}
                        type="number"
                        value={numberValue}
                        onChange={({ target }) =>
                            setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                        }
                        placeholder={control.placeholder}
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        data-size="small"
                    />
                );
            }

            const selectedId: string =
                typeof rawValue === "string" && control.options.some((option) => option.id === rawValue)
                    ? rawValue
                    : control.defaultOptionId;

            return (
                <Select
                    key={control.name}
                    label={label}
                    name={`example-${control.name}`}
                    value={selectedId}
                    onChange={({ target }) =>
                        setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                    }
                    data-size="small"
                >
                    {control.options.map((option) => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                </Select>
            );
        };

        const groupedControls = visibleControls
            .filter((control) => control.name.includes("."))
            .reduce<Record<string, NormalizedControl[]>>((acc, control) => {
                const [root] = control.name.split(".");
                acc[root] = acc[root] ? [...acc[root], control] : [control];
                return acc;
            }, {});

        const flatControls = visibleControls.filter((control) => !control.name.includes("."));
        const booleanControls = flatControls
            .filter((control) => control.kind === "boolean")
            .map((control) => renderControl(control));
        const fieldControls = flatControls
            .filter((control) => control.kind !== "boolean")
            .map((control) => renderControl(control));
        const groupControls = Object.entries(groupedControls).map(([groupName, controls]) => (
            <Popover key={groupName} clickOptions={{ enabled: true }}>
                <Popover.Trigger asChild>
                    <Button variant="secondary">{groupName}</Button>
                </Popover.Trigger>
                <Popover.Content padding={16}>
                    <Flex direction="column" gap="m" data-size="small">
                        {controls.map((control) => renderControl(control, control.name.split(".").slice(1).join(".")))}
                    </Flex>
                </Popover.Content>
            </Popover>
        ));

        return { booleanControls, fieldControls, groupControls };
    }, [visibleControls, exampleProps, isMobile]);

    const propsControlsContent = (
        <Flex gap="m" wrap="wrap" alignItems="start" className="component-example__props-inline">
            {propControls.fieldControls}
            {propControls.groupControls}
            {propControls.booleanControls.length > 0 && (
                <FieldGroup legend="Valg">
                    <Flex direction="column" gap="xs">
                        {propControls.booleanControls}
                    </Flex>
                </FieldGroup>
            )}
        </Flex>
    );

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
                                {exampleViewport === "auto" ? (
                                    content
                                ) : (
                                    <div
                                        style={{
                                            width: viewportWidth,
                                            maxWidth: "100%",
                                            border: "1px solid var(--jkl-color-border-subdued)",
                                            borderRadius: "var(--jkl-border-radius-s)",
                                            padding: "var(--jkl-spacing-m)",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        {content}
                                    </div>
                                )}
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
                                        {propsControlsContent}
                                    </Flex>
                                </Popover.Content>
                            </Popover>
                        )}
                    </Flex>
                ) : (
                            <Flex gap="m" wrap="wrap" className="component-example__toolbar" justifyContent="space-between" alignItems="start">
                                <Flex gap="m" wrap="wrap" alignItems="start" className="component-example__controls-inline">
                                    {displayControls}
                                    {showProps && propsControlsContent}
                                </Flex>
                            </Flex>
                        )}
                    </Card>
                </Flex>
            </Flex>
        </section>
    );
}
