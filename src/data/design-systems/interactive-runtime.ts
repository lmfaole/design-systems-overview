import {
    BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderButtonInteractiveExample,
} from "./systems/jokul/local-docs/components/button/example";
import {
    CARD_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderCardInteractiveExample,
} from "./systems/jokul/local-docs/components/card/example";
import {
    CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderCheckboxInteractiveExample,
} from "./systems/jokul/local-docs/components/checkbox/example";
import {
    DESCRIPTION_LIST_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderDescriptionListInteractiveExample,
} from "./systems/jokul/local-docs/components/description-list/example";
import {
    LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/loader/example";
import {
    MESSAGE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderMessageInteractiveExample,
} from "./systems/jokul/local-docs/components/message/example";
import {
    RADIO_BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderRadioButtonInteractiveExample,
} from "./systems/jokul/local-docs/components/radio-button/example";
import {
    SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSelectInteractiveExample,
} from "./systems/jokul/local-docs/components/select/example";
import {
    SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSkeletonLoaderInteractiveExample,
} from "./systems/jokul/local-docs/components/skeleton-loader/example";
import {
    SUMMARY_TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderSummaryTableInteractiveExample,
} from "./systems/jokul/local-docs/components/summary-table/example";
import {
    TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTableInteractiveExample,
} from "./systems/jokul/local-docs/components/table/example";
import {
    TAG_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTagInteractiveExample,
} from "./systems/jokul/local-docs/components/tag/example";
import {
    TEXT_AREA_INTERACTIVE_EXAMPLE_RENDERER_ID,
    renderTextAreaInteractiveExample,
} from "./systems/jokul/local-docs/components/text-area/example";
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
    [CARD_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderCardInteractiveExample,
    [CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderCheckboxInteractiveExample,
    [DESCRIPTION_LIST_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderDescriptionListInteractiveExample,
    [LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderLoaderInteractiveExample,
    [MESSAGE_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderMessageInteractiveExample,
    [RADIO_BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderRadioButtonInteractiveExample,
    [SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSelectInteractiveExample,
    [SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSkeletonLoaderInteractiveExample,
    [SUMMARY_TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderSummaryTableInteractiveExample,
    [TAG_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTagInteractiveExample,
    [TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTableInteractiveExample,
    [TEXT_AREA_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTextAreaInteractiveExample,
    [TEXT_INPUT_INTERACTIVE_EXAMPLE_RENDERER_ID]: renderTextInputInteractiveExample,
};

export function renderInteractiveExampleState(
    rendererId: DesignSystemInteractiveExampleRendererId,
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult | undefined {
    return interactiveExampleRenderers[rendererId]?.(values);
}
