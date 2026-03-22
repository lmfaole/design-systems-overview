import type {
    DesignSystemExampleCode,
    DesignSystemInteractiveExample,
    DesignSystemInteractiveExampleControl,
    DesignSystemInteractiveExampleEventLog,
    DesignSystemInteractiveExampleState,
    DesignSystemInteractiveExampleValue,
} from "./types";

export type DesignSystemInteractiveExampleValues = Record<
    string,
    DesignSystemInteractiveExampleValue
>;

interface CreateInteractiveExampleStateResult {
    previewHtml: string;
    codeExamples: DesignSystemExampleCode[];
    notes?: string[];
}

function getControlValues(
    control: DesignSystemInteractiveExampleControl,
): DesignSystemInteractiveExampleValue[] {
    if (control.kind === "boolean") {
        return [false, true];
    }

    return control.options.map((option) => option.value);
}

export function getInteractiveExampleStateKey(
    controls: DesignSystemInteractiveExampleControl[],
    values: DesignSystemInteractiveExampleValues,
): string {
    return controls
        .map((control) => `${control.name}:${String(values[control.name])}`)
        .join("|");
}

export function getInteractiveExampleDefaultValues(
    controls: DesignSystemInteractiveExampleControl[],
): DesignSystemInteractiveExampleValues {
    return Object.fromEntries(
        controls.map((control) => [control.name, control.defaultValue]),
    );
}

export function getInteractiveExampleInitialState(
    interactive: DesignSystemInteractiveExample,
): DesignSystemInteractiveExampleState | undefined {
    const defaultValues = getInteractiveExampleDefaultValues(interactive.controls);
    const defaultKey = getInteractiveExampleStateKey(interactive.controls, defaultValues);

    return interactive.states.find((state) => state.key === defaultKey);
}

export function createInteractiveExample(
    controls: DesignSystemInteractiveExampleControl[],
    renderState: (
        values: DesignSystemInteractiveExampleValues,
    ) => CreateInteractiveExampleStateResult,
    options?: {
        eventLog?: DesignSystemInteractiveExampleEventLog;
    },
): DesignSystemInteractiveExample {
    const states: DesignSystemInteractiveExampleState[] = [];

    function walk(
        controlIndex: number,
        values: DesignSystemInteractiveExampleValues,
    ) {
        if (controlIndex >= controls.length) {
            const state = renderState(values);

            states.push({
                key: getInteractiveExampleStateKey(controls, values),
                values: { ...values },
                previewHtml: state.previewHtml,
                codeExamples: state.codeExamples,
                notes: state.notes,
            });
            return;
        }

        const control = controls[controlIndex];

        for (const value of getControlValues(control)) {
            walk(controlIndex + 1, {
                ...values,
                [control.name]: value,
            });
        }
    }

    walk(0, {});

    return {
        controls,
        states,
        eventLog: options?.eventLog,
    };
}
