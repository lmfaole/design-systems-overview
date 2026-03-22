import {
    BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderButtonInteractiveExample,
} from "./systems/jokul/local-docs/components/button/example";
import {
    LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/loader/example";
import {
    SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSkeletonLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/skeleton-loader/example";
import {
    TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTableInteractiveExample,
} from "./systems/jokul/local-docs/components/table/example";
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
    [LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderLoaderInteractiveExample,
    [SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSkeletonLoaderInteractiveExample,
    [TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTableInteractiveExample,
};

export function renderInteractiveExampleState(
    rendererId: DesignSystemInteractiveExampleRendererId,
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult | undefined {
    return interactiveExampleRenderers[rendererId]?.(values);
}
