import { useEffect, useMemo, useRef, useState } from "react";
import "./ComponentExample.scss";
import type {
    ComponentExampleControl,
    ComponentExampleControlValue,
    ComponentExampleProps as ExampleValues,
    ComponentExampleSelectOption,
} from "@/features/ds/jokul/_component-docs/docs/types/component";

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
                control.defaultValue
                    ?.map((value) => options.find((option) => Object.is(option.value, value))?.id)
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
        id: typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `row-${Math.random().toString(36).slice(2, 10)}`,
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

type JsonControlProps = {
    control: Extract<ComponentExampleControl, { kind: "json" }>;
    rows: JsonRow[];
    onChange: (value: JsonRow[]) => void;
    label?: string;
};

function JsonControl({ control, rows, onChange, label }: JsonControlProps) {
    const { error } = resolveJsonRows(rows);
    const displayLabel = label ?? control.name;
    const valueOptions = control.valueOptions ? normalizeSelectOptions(control.valueOptions) : null;
    const allowRowActions = !control.keyReadOnly;

    const updateRow = (rowId: string, field: "key" | "value", nextValue: string) => {
        onChange(rows.map((row) => (row.id === rowId ? { ...row, [field]: nextValue } : row)));
    };

    const removeRow = (rowId: string) => {
        const nextRows = rows.filter((row) => row.id !== rowId);

        onChange(nextRows.length > 0 ? nextRows : [createJsonRow()]);
    };

    const addRow = () => {
        onChange([...rows, createJsonRow()]);
    };

    return (
        <fieldset className="json-control">
            <legend>{displayLabel}</legend>
            <div className="json-editor">
            {rows.map((row) => (
                <div key={row.id} className="json-row">
                    {control.keyReadOnly ? (
                        valueOptions ? (
                            <label>
                                <span>{row.key || "verdi"}</span>
                                <select
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
                                >
                                    {valueOptions.map((option) => (
                                        <option key={option.id} value={option.id}>{option.label}</option>
                                    ))}
                                </select>
                            </label>
                        ) : (
                            <label>
                                <span>{row.key || "verdi"}</span>
                                <input
                                    type="text"
                                    name={`example-${control.name}-value-${row.id}`}
                                    value={row.value}
                                    onChange={({ target }) => updateRow(row.id, "value", target.value)}
                                />
                            </label>
                        )
                    ) : (
                        <>
                            <label>
                                <span>key</span>
                                <input
                                    type="text"
                                    name={`example-${control.name}-key-${row.id}`}
                                    value={row.key}
                                    onChange={({ target }) => updateRow(row.id, "key", target.value)}
                                />
                            </label>

                            {valueOptions ? (
                                <label>
                                    <span>value</span>
                                    <select
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
                                    >
                                        {valueOptions.map((option) => (
                                            <option key={option.id} value={option.id}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                            ) : (
                                <label>
                                    <span>value</span>
                                    <input
                                        type="text"
                                        name={`example-${control.name}-value-${row.id}`}
                                        value={row.value}
                                        onChange={({ target }) => updateRow(row.id, "value", target.value)}
                                    />
                                </label>
                            )}

                            {allowRowActions && (
                                <button
                                    type="button"
                                    data-variant="quiet"
                                    onClick={() => removeRow(row.id)}
                                    aria-label={`Fjern ${control.name}-rad`}
                                >
                                    Fjern
                                </button>
                            )}
                        </>
                    )}
                </div>
            ))}

            {(allowRowActions || error) && (
                <div className="json-actions">
                    {allowRowActions && (
                        <button type="button" data-variant="quiet" onClick={addRow}>
                            Legg til
                        </button>
                    )}
                    {error && (
                        <span className="json-error" aria-live="polite" role="status">
                            {error}
                        </span>
                    )}
                </div>
            )}
            </div>
        </fieldset>
    );
}

export function ComponentExample({ titleId = "eksempel", children, controls }: ComponentExampleComponentProps) {
    const exampleRef = useRef<HTMLElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const [exampleTheme, setExampleTheme] = useState("auto");
    const [exampleSize, setExampleSize] = useState("medium");
    const [exampleViewport, setExampleViewport] = useState("auto");
    const normalizedControls = useMemo(() => normalizeControls(controls), [controls]);
    const [exampleProps, setExampleProps] = useState<Record<string, RawControlValue>>(() =>
        initControlValues(normalizedControls),
    );
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

    useEffect(() => {
        setExampleProps(initControlValues(normalizedControls));
    }, [normalizedControls]);

    useEffect(() => {
        if (typeof ResizeObserver === "undefined") return;

        const example = exampleRef.current;
        const preview = previewRef.current;

        if (!example || !preview) return;

        const updatePreviewSize = () => {
            example.style.setProperty("--component-example-preview-block-size", `${preview.getBoundingClientRect().height}px`);
        };

        updatePreviewSize();

        const observer = new ResizeObserver(updatePreviewSize);
        observer.observe(preview);

        return () => observer.disconnect();
    }, []);

    const displayControls = useMemo(
        () => (
            <>
                <label>
                    <span>Tema</span>
                    <select
                        name="example-theme"
                        value={exampleTheme}
                        onChange={({ target }) => setExampleTheme(target.value)}
                    >
                        <option value="auto">auto</option>
                        <option value="light">light</option>
                        <option value="dark">dark</option>
                    </select>
                </label>

                <label>
                    <span>Størrelse</span>
                    <select
                        name="example-size"
                        value={exampleSize}
                        onChange={({ target }) => setExampleSize(target.value)}
                    >
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                    </select>
                </label>

                <label>
                    <span>Viewport</span>
                    <select
                        name="example-viewport"
                        value={exampleViewport}
                        onChange={({ target }) => setExampleViewport(target.value)}
                    >
                        <option value="auto">auto</option>
                        <option value="mobile">mobile</option>
                        <option value="tablet">tablet</option>
                        <option value="desktop">desktop</option>
                    </select>
                </label>
            </>
        ),
        [exampleTheme, exampleSize, exampleViewport],
    );

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
                    <label key={control.name} className="switch">
                        <input
                            type="checkbox"
                            data-variant="switch"
                            name={`example-${control.name}`}
                            checked={rawValue === true}
                            onChange={({ target }) =>
                                setExampleProps((prev) => ({ ...prev, [control.name]: target.checked }))
                            }
                        />
                        <span>{label}</span>
                    </label>
                );
            }

            if (control.kind === "multiselect") {
                const selectedValues = isStringArray(rawValue) ? rawValue : control.defaultOptionIds;

                return (
                    <label key={control.name}>
                        <span>{label}</span>
                        <select
                            name={`example-${control.name}`}
                            value={selectedValues}
                            multiple
                            size={Math.min(Math.max(control.options.length, 3), 8)}
                            onChange={({ target }) => {
                                const nextValues = Array.from(target.selectedOptions, (option) => option.value);

                                setExampleProps((prev) => ({ ...prev, [control.name]: nextValues }));
                            }}
                        >
                            {control.options.map((option) => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                    </label>
                );
            }

            if (control.kind === "json") {
                const jsonRows = isJsonRows(rawValue) ? rawValue : parseJsonRows(control.defaultValue);

                return (
                    <JsonControl
                        key={control.name}
                        control={control}
                        rows={jsonRows}
                        label={label}
                        onChange={(value) => setExampleProps((prev) => ({ ...prev, [control.name]: value }))}
                    />
                );
            }

            if (control.kind === "text") {
                const textValue = typeof rawValue === "string" ? rawValue : "";

                return (
                    <label key={control.name}>
                        <span>{label}</span>
                        <input
                            type="text"
                            name={`example-${control.name}`}
                            value={textValue}
                            onChange={({ target }) =>
                                setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                            }
                            placeholder={control.placeholder}
                        />
                    </label>
                );
            }

            if (control.kind === "number") {
                const numberValue = typeof rawValue === "string" ? rawValue : "";

                return (
                    <label key={control.name}>
                        <span>{label}</span>
                        <input
                            type="number"
                            name={`example-${control.name}`}
                            value={numberValue}
                            onChange={({ target }) =>
                                setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                            }
                            placeholder={control.placeholder}
                            min={control.min}
                            max={control.max}
                            step={control.step}
                        />
                    </label>
                );
            }

            const selectedId =
                typeof rawValue === "string" && control.options.some((option) => option.id === rawValue)
                    ? rawValue
                    : control.defaultOptionId;

            return (
                <label key={control.name}>
                    <span>{label}</span>
                    <select
                        name={`example-${control.name}`}
                        value={selectedId}
                        onChange={({ target }) =>
                            setExampleProps((prev) => ({ ...prev, [control.name]: target.value }))
                        }
                    >
                        {control.options.map((option) => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </select>
                </label>
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
        const groupControls = Object.entries(groupedControls).map(([groupName, groupItems]) => {
            return (
                <section key={groupName} data-group="subprops">
                    <h4>{groupName}</h4>
                    <div className="controls-grid">
                        {groupItems.map((control) => renderControl(control, control.name.split(".").slice(1).join(".")))}
                    </div>
                </section>
            );
        });

        return { booleanControls, fieldControls, groupControls };
    }, [visibleControls, exampleProps]);

    return (
        <section ref={exampleRef} className="component-page-example" aria-labelledby={titleId}>
            <div ref={previewRef} className="card" data-panel="preview">
                <div
                    className="area"
                    data-theme={exampleTheme === "auto" ? undefined : exampleTheme}
                    data-size={exampleSize}
                >
                    <div className="inner">
                        {exampleViewport === "auto" ? (
                            content
                        ) : (
                            <div className="viewport-frame" data-viewport={exampleViewport}>
                                {content}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card" data-panel="controls">
                <div data-panel-scroll="">
                    <section data-group="display">
                        <h3>Visning</h3>
                        <div className="controls-grid">{displayControls}</div>
                    </section>

                    {showProps && (
                        <section data-group="props">
                            <h3>Props</h3>
                            {propControls.fieldControls.length > 0 && (
                                <div className="controls-grid">{propControls.fieldControls}</div>
                            )}
                            {propControls.groupControls}
                            {propControls.booleanControls.length > 0 && (
                                <div className="options-list">{propControls.booleanControls}</div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </section>
    );
}
