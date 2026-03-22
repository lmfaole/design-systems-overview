import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { checkboxInteractiveControls } from "./props";

interface CheckboxExampleState {
    checked: boolean;
    inline: boolean;
    invalid: boolean;
    disabled: boolean;
}

const defaultCheckboxExampleState: CheckboxExampleState = {
    checked: false,
    inline: false,
    invalid: false,
    disabled: false,
};

const CHECKBOX_INPUT_ID = "jokul-checkbox-example";
const CHECKBOX_ERROR_ID = "jokul-checkbox-error";

export const CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/checkbox";

function getCheckboxExampleState(
    values: DesignSystemInteractiveExampleValues,
): CheckboxExampleState {
    return {
        checked: values.checked === true || defaultCheckboxExampleState.checked,
        inline: values.inline === true || defaultCheckboxExampleState.inline,
        invalid: values.invalid === true || defaultCheckboxExampleState.invalid,
        disabled: values.disabled === true || defaultCheckboxExampleState.disabled,
    };
}

function getCheckboxSummary(state: CheckboxExampleState): string {
    return [
        `checked=${state.checked ? "true" : "false"}`,
        `inline=${state.inline ? "true" : "false"}`,
        `invalid=${state.invalid ? "true" : "false"}`,
        `disabled=${state.disabled ? "true" : "false"}`,
    ].join(" · ");
}

function renderCheckboxPreviewMarkup(state: CheckboxExampleState): string {
    const wrapperClassName = [
        "jkl-checkbox",
        state.inline ? "jkl-checkbox--inline" : "",
        state.invalid ? "jkl-checkbox--error" : "",
    ].filter(Boolean).join(" ");
    const inputAttributes = [
        `id="${CHECKBOX_INPUT_ID}"`,
        'class="jkl-checkbox__input"',
        'type="checkbox"',
        'name="notifications"',
        'value="product-updates"',
        state.checked ? "checked" : "",
        state.disabled ? "disabled" : "",
        state.invalid ? 'aria-invalid="true"' : "",
        state.invalid ? `aria-describedby="${CHECKBOX_ERROR_ID}"` : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getCheckboxSummary(state)}</small></p>`,
        `<div class="${wrapperClassName}">`,
        `<label for="${CHECKBOX_INPUT_ID}" class="jkl-checkbox__label">Send meg oppdateringer om nye komponentdocs</label>`,
        `<input ${inputAttributes}>`,
        "</div>",
        state.invalid
            ? `<p id="${CHECKBOX_ERROR_ID}">Du må ta stilling til samtykket før du går videre.</p>`
            : "",
        "</div>",
    ].join("");
}

function renderCheckboxReactCode(state: CheckboxExampleState): string {
    const checkedCode = state.checked ? "            checked\n" : "";
    const inlineCode = state.inline ? "            inline\n" : "";
    const invalidCode = state.invalid ? "            invalid\n" : "";
    const disabledCode = state.disabled ? "            disabled\n" : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/checkbox/checkbox.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import { Checkbox } from "@fremtind/jokul/checkbox";

export function Example() {
    return (
        <Checkbox
            name="notifications"
            value="product-updates"
${checkedCode}${inlineCode}${invalidCode}${disabledCode}        >
            Send meg oppdateringer om nye komponentdocs
        </Checkbox>
    );
}`;
}

function getCheckboxNotes(state: CheckboxExampleState): string[] {
    const notes = [
        "Checkbox passer når brukeren kan velge dette uavhengig av andre valg i samme skjema.",
    ];

    if (state.checked) {
        notes.push("Forhåndsavhukede valg bør være enkle å forstå og enkle å angre.");
    }

    if (state.inline) {
        notes.push("Inline-varianten fungerer best i korte, tette oppsett der labelen fortsatt er lett å skanne.");
    }

    if (state.invalid) {
        notes.push("Error-state bør kobles til forklarende tekst med `aria-describedby`.");
    }

    if (state.disabled) {
        notes.push("Disabled checkbox trenger ofte forklaring i nærheten av kontrollen, ikke bare en utilgjengelig tilstand.");
    }

    return notes;
}

export function renderCheckboxInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getCheckboxExampleState(values);

    return {
        previewHtml: renderCheckboxPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderCheckboxReactCode(state),
            },
        ],
        notes: getCheckboxNotes(state),
    };
}

export const checkboxPlayground = createInteractiveExample(
    CHECKBOX_INTERACTIVE_EXAMPLE_RENDERER_ID,
    checkboxInteractiveControls,
    renderCheckboxInteractiveExample,
    {
        eventLog: {
            events: ["focus", "change", "blur"],
            targetSelector: "input",
            emptyLabel: "Ingen hendelser fra checkbox-eksempelet ennå.",
            maxEntries: 6,
        },
    },
);
