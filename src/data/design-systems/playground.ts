import type {
    DesignSystemInteractiveExampleClientConfig,
    DesignSystemExampleCode,
    DesignSystemInteractiveExample,
    DesignSystemInteractiveExampleControl,
    DesignSystemInteractiveExampleEventLog,
    DesignSystemInteractiveExampleRendererId,
    DesignSystemInteractiveExampleState,
    DesignSystemInteractiveExampleValue,
} from "./types";

export type DesignSystemInteractiveExampleValues = Record<
    string,
    DesignSystemInteractiveExampleValue
>;

export interface CreateInteractiveExampleStateResult {
    previewHtml: string;
    codeExamples: DesignSystemExampleCode[];
    notes?: string[];
}

export type DesignSystemInteractiveExampleRenderer = (
    values: DesignSystemInteractiveExampleValues,
) => CreateInteractiveExampleStateResult;

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
    return interactive.initialState;
}

export function getInteractiveExampleClientConfig(
    interactive: DesignSystemInteractiveExample,
): DesignSystemInteractiveExampleClientConfig {
    return {
        controls: interactive.controls,
        rendererId: interactive.rendererId,
        eventLog: interactive.eventLog,
    };
}

export function createInteractiveExample(
    rendererId: DesignSystemInteractiveExampleRendererId,
    controls: DesignSystemInteractiveExampleControl[],
    renderState: DesignSystemInteractiveExampleRenderer,
    options?: {
        eventLog?: DesignSystemInteractiveExampleEventLog;
    },
): DesignSystemInteractiveExample {
    const defaultValues = getInteractiveExampleDefaultValues(controls);

    return {
        controls,
        rendererId,
        initialState: renderState(defaultValues),
        eventLog: options?.eventLog,
    };
}
