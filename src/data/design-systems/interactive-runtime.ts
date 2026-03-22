import {
    BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderButtonInteractiveExample,
} from "./systems/jokul/local-docs/components/button/example";
import {
    CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderCheckboxInteractiveExample,
} from "./systems/jokul/local-docs/components/checkbox/example";
import {
    LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/loader/example";
import {
    SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSelectInteractiveExample,
} from "./systems/jokul/local-docs/components/select/example";
import {
    SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSkeletonLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/skeleton-loader/example";
import {
    TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTableInteractiveExample,
} from "./systems/jokul/local-docs/components/table/example";
import {
    TEXT_INPUT_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTextInputInteractiveExample,
} from "./systems/jokul/local-docs/components/text-input/example";
import type {
    CreateInteractiveExampleStateResult,
    DesignSystemInteractiveExampleRenderer,
    DesignSystemInteractiveExampleValues,
} from "./playground";
import type { DesignSystemInteractiveExampleRendererId } from "./types";

const interactiveExampleRenderers: Record<
    DesignSystemInteractiveExampleRendererId,
    DesignSystemInteractiveExampleRenderer
> = {
    [BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderButtonInteractiveExample,
    [CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderCheckboxInteractiveExample,
    [LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderLoaderInteractiveExample,
    [SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSelectInteractiveExample,
    [SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSkeletonLoaderInteractiveExample,
    [TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTableInteractiveExample,
    [TEXT_INPUT_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTextInputInteractiveExample,
};

export function renderInteractiveExampleState(
    rendererId: DesignSystemInteractiveExampleRendererId,
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult | undefined {
    return interactiveExampleRenderers[rendererId]?.(values);
}
