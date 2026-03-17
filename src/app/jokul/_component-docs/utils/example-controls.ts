import type {
    ComponentExampleControl,
    ComponentExampleControlValue,
    ComponentExampleControlsConfig,
    PropDef,
} from "@/app/jokul/_component-docs/docs/types";

const EXCLUDED_PROP_NAMES = new Set([
    "children",
    "className",
    "style",
    "ref",
    "key",
    "id",
    "as",
    "tabIndex",
]);

const EXCLUDED_PREFIXES = ["aria-", "data-"];

const EXCLUDED_TYPE_PATTERNS = [
    /React\./,
    /ReactNode/,
    /ReactElement/,
    /JSX\./,
    /ElementType/,
    /HTMLElement/,
    /SVG/,
    /Ref/,
    /Event/,
    /EventHandler/,
    /=>/,
    /Function/,
];

const JSON_TYPE_HINTS = ["{", "}", "Record<", "Partial<", "Array<", "[]", "Options", "Config", "Settings", "Props"];

function stripQuotes(value: string) {
    const match = value.match(/^['"](.+)['"]$/);
    return match ? match[1] : value;
}

function parseDefaultValue(raw?: string): ComponentExampleControlValue | undefined {
    if (!raw) return undefined;
    const trimmed = raw.trim();
    if (trimmed === "undefined") return undefined;
    if (trimmed === "null") return null;
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return stripQuotes(trimmed);
    }
    return undefined;
}

function parseJsonDefault(raw?: string) {
    if (!raw) return undefined;
    const trimmed = raw.trim();
    try {
        JSON.parse(trimmed);
        return trimmed;
    } catch {
        return undefined;
    }
}

function extractStringLiterals(type: string) {
    const regex = /'([^']*)'|"([^"]*)"/g;
    const seen = new Set<string>();
    const values: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(type))) {
        const value = match[1] ?? match[2] ?? "";
        if (!seen.has(value)) {
            seen.add(value);
            values.push(value);
        }
    }
    return values;
}

function shouldSkipProp(prop: PropDef) {
    if (prop.status === "deprecated") return true;
    if (EXCLUDED_PROP_NAMES.has(prop.name)) return true;
    if (EXCLUDED_PREFIXES.some((prefix) => prop.name.startsWith(prefix))) return true;
    if (/^on[A-Z]/.test(prop.name)) return true;
    if (EXCLUDED_TYPE_PATTERNS.some((pattern) => pattern.test(prop.type))) return true;
    return false;
}

function isBooleanType(type: string) {
    const compact = type.replace(/\s/g, "");
    return compact === "boolean" || compact === "boolean|undefined" || compact === "boolean|null|undefined";
}

function isNumberType(type: string) {
    const compact = type.replace(/\s/g, "");
    return compact === "number" || compact === "number|undefined" || compact === "number|null|undefined";
}

function isStringType(type: string) {
    const compact = type.replace(/\s/g, "");
    if (compact.includes("[]") || compact.includes("Array<")) return false;
    return compact === "string" || compact === "string|undefined" || compact === "string|null|undefined";
}

function isJsonType(type: string) {
    return JSON_TYPE_HINTS.some((hint) => type.includes(hint));
}

function applyOverride(
    control: ComponentExampleControl,
    override?: Partial<ComponentExampleControl>,
): ComponentExampleControl {
    if (!override) return control;
    if (!override.kind || override.kind === control.kind) {
        return { ...control, ...override, name: control.name } as ComponentExampleControl;
    }

    if (override.kind === "select" || override.kind === "multiselect") {
        const options = "options" in override && override.options ? override.options : undefined;
        if (!options) return control;
        return {
            name: control.name,
            kind: override.kind,
            options,
            defaultValue: "defaultValue" in override ? override.defaultValue : undefined,
            visibleWhen: override.visibleWhen,
        } as ComponentExampleControl;
    }

    if (override.kind === "boolean") {
        return {
            name: control.name,
            kind: "boolean",
            defaultValue: override.defaultValue as boolean | undefined,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "text") {
        return {
            name: control.name,
            kind: "text",
            defaultValue: override.defaultValue as string | undefined,
            placeholder: override.placeholder,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "number") {
        return {
            name: control.name,
            kind: "number",
            defaultValue: override.defaultValue as number | undefined,
            min: override.min,
            max: override.max,
            step: override.step,
            placeholder: override.placeholder,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "json") {
        return {
            name: control.name,
            kind: "json",
            defaultValue: override.defaultValue as string | undefined,
            placeholder: override.placeholder,
            rows: override.rows,
            valueOptions: override.valueOptions,
            keyReadOnly: override.keyReadOnly,
            visibleWhen: override.visibleWhen,
        };
    }

    return control;
}

function buildControl(prop: PropDef, config?: ComponentExampleControlsConfig): ComponentExampleControl | null {
    if (shouldSkipProp(prop)) return null;
    if (config?.include && !config.include.includes(prop.name)) return null;
    if (config?.exclude && config.exclude.includes(prop.name)) return null;
    const literals = extractStringLiterals(prop.type);
    const defaultValue = parseDefaultValue(prop.default);

    if (literals.length > 0) {
        return {
            name: prop.name,
            kind: "select",
            options: literals,
            defaultValue: typeof defaultValue === "string" ? defaultValue : undefined,
        };
    }

    if (isBooleanType(prop.type)) {
        return {
            name: prop.name,
            kind: "boolean",
            defaultValue: typeof defaultValue === "boolean" ? defaultValue : undefined,
        };
    }

    if (isNumberType(prop.type)) {
        return {
            name: prop.name,
            kind: "number",
            defaultValue: typeof defaultValue === "number" ? defaultValue : undefined,
        };
    }

    if (isStringType(prop.type)) {
        return {
            name: prop.name,
            kind: "text",
            defaultValue: typeof defaultValue === "string" ? defaultValue : undefined,
        };
    }

    if (isJsonType(prop.type)) {
        return null;
    }

    return null;
}

function createControlFromOverride(
    name: string,
    override?: Partial<ComponentExampleControl>,
): ComponentExampleControl | null {
    if (!override || !override.kind) return null;

    if (override.kind === "select" || override.kind === "multiselect") {
        const options = "options" in override && override.options ? override.options : undefined;
        if (!options) return null;
        return {
            name,
            kind: override.kind,
            options,
            defaultValue: override.defaultValue,
            visibleWhen: override.visibleWhen,
        } as ComponentExampleControl;
    }

    if (override.kind === "boolean") {
        return {
            name,
            kind: "boolean",
            defaultValue: override.defaultValue as boolean | undefined,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "text") {
        return {
            name,
            kind: "text",
            defaultValue: override.defaultValue as string | undefined,
            placeholder: override.placeholder,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "number") {
        return {
            name,
            kind: "number",
            defaultValue: override.defaultValue as number | undefined,
            min: override.min,
            max: override.max,
            step: override.step,
            placeholder: override.placeholder,
            visibleWhen: override.visibleWhen,
        };
    }

    if (override.kind === "json") {
        return {
            name,
            kind: "json",
            defaultValue: override.defaultValue as string | undefined,
            placeholder: override.placeholder,
            rows: override.rows,
            valueOptions: override.valueOptions,
            keyReadOnly: override.keyReadOnly,
            visibleWhen: override.visibleWhen,
        };
    }

    return null;
}

function orderControls(controls: ComponentExampleControl[], order?: string[]) {
    if (!order || order.length === 0) return controls;
    const orderMap = new Map(order.map((name, index) => [name, index]));
    return [...controls].sort((a, b) => {
        const ai = orderMap.get(a.name);
        const bi = orderMap.get(b.name);
        if (ai === undefined && bi === undefined) return 0;
        if (ai === undefined) return 1;
        if (bi === undefined) return -1;
        return ai - bi;
    });
}

export function buildExampleControls(
    props: PropDef[],
    config?: ComponentExampleControlsConfig,
): ComponentExampleControl[] {
    const controls = props
        .map((prop) => {
            const override = config?.overrides?.[prop.name];
            const base = buildControl(prop, config);
            if (base) return applyOverride(base, override);
            if (config?.include && !config.include.includes(prop.name)) return null;
            if (config?.exclude && config.exclude.includes(prop.name)) return null;
            return createControlFromOverride(prop.name, override);
        })
        .filter((control): control is ComponentExampleControl => Boolean(control));

    if (config?.overrides) {
        const existing = new Set(controls.map((control) => control.name));
        Object.entries(config.overrides).forEach(([name, override]) => {
            if (existing.has(name)) return;
            if (config?.include && !config.include.includes(name)) return;
            if (config?.exclude && config.exclude.includes(name)) return;
            const control = createControlFromOverride(name, override);
            if (control) {
                controls.push(control);
                existing.add(name);
            }
        });
    }

    return orderControls(controls, config?.order);
}
