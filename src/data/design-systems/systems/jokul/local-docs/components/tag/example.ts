import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { tagInteractiveControls } from "./props";

type TagVariantValue = "neutral" | "info" | "warning" | "error" | "success";
type TagTextValue = "draft" | "needs-follow-up" | "published";

interface TagExampleState {
    variant: TagVariantValue;
    text: TagTextValue;
}

const defaultTagExampleState: TagExampleState = {
    variant: "neutral",
    text: "draft",
};

export const TAG_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/tag";

function getTagExampleState(
    values: DesignSystemInteractiveExampleValues,
): TagExampleState {
    return {
        variant: String(values.variant ?? defaultTagExampleState.variant) as TagVariantValue,
        text: String(values.text ?? defaultTagExampleState.text) as TagTextValue,
    };
}

function getTagText(state: TagExampleState): string {
    switch (state.text) {
        case "needs-follow-up":
            return "Trenger oppfølging";
        case "published":
            return "Publisert";
        case "draft":
        default:
            return "Utkast";
    }
}

function getTagSummary(state: TagExampleState): string {
    return `variant="${state.variant}" · children="${getTagText(state)}"`;
}

function renderTagPreviewMarkup(state: TagExampleState): string {
    const className = [
        "jkl-tag",
        state.variant !== "neutral" ? `jkl-tag--${state.variant}` : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getTagSummary(state)}</small></p>`,
        "<p>Artikkelstatus</p>",
        `<p><span class="${className}">${getTagText(state)}</span></p>`,
        "</div>",
    ].join("");
}

function renderTagReactCode(state: TagExampleState): string {
    const variantCode = state.variant !== "neutral"
        ? ` variant="${state.variant}"`
        : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/tag/tag.min.css";
import { Tag } from "@fremtind/jokul/tag";

export function Example() {
    return <Tag${variantCode}>${getTagText(state)}</Tag>;
}`;
}

function getTagNotes(state: TagExampleState): string[] {
    const notes = [
        "Tag passer som en kompakt, lesbar statusmarkør når teksten må kunne skannes raskt i lister, tabeller eller kort.",
    ];

    if (state.variant !== "neutral") {
        notes.push("Fargevarianten bør støtte meningen, men ikke være eneste måte å forstå statusen på.");
    }

    if (state.text === "needs-follow-up") {
        notes.push("En tag bør navngi statusen kort og konkret, ikke prøve å forklare hele konsekvensen alene.");
    }

    return notes;
}

export function renderTagInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getTagExampleState(values);

    return {
        previewHtml: renderTagPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderTagReactCode(state),
            },
        ],
        notes: getTagNotes(state),
    };
}

export const tagPlayground = createInteractiveExample(
    TAG_INTERACTIVE_EXAMPLE_RENDERER_ID,
    tagInteractiveControls,
    renderTagInteractiveExample,
);
