import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { textInputInteractiveControls } from "./props";

type TextInputAlignValue = "left" | "right";
type TextInputUnitValue = "none" | "kr";
type TextInputValueState = "empty" | "filled";

interface TextInputExampleState {
    align: TextInputAlignValue;
    unit: TextInputUnitValue;
    inline: boolean;
    invalid: boolean;
    disabled: boolean;
    valueState: TextInputValueState;
}

const defaultTextInputExampleState: TextInputExampleState = {
    align: "left",
    unit: "none",
    inline: false,
    invalid: false,
    disabled: false,
    valueState: "empty",
};

const TEXT_INPUT_ID = "jokul-text-input-example";
const TEXT_INPUT_SUPPORT_ID = "jokul-text-input-support";

export const TEXT_INPUT_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/text-input";

function getTextInputExampleState(
    values: DesignSystemInteractiveExampleValues,
): TextInputExampleState {
    return {
        align: String(values.align ?? defaultTextInputExampleState.align) as TextInputAlignValue,
        unit: String(values.unit ?? defaultTextInputExampleState.unit) as TextInputUnitValue,
        inline: values.inline === true,
        invalid: values.invalid === true,
        disabled: values.disabled === true,
        valueState: String(values.valueState ?? defaultTextInputExampleState.valueState) as TextInputValueState,
    };
}

function getTextInputSummary(state: TextInputExampleState): string {
    return [
        `align="${state.align}"`,
        `unit="${state.unit}"`,
        `inline=${state.inline ? "true" : "false"}`,
        `invalid=${state.invalid ? "true" : "false"}`,
        `disabled=${state.disabled ? "true" : "false"}`,
        `value="${state.valueState}"`,
    ].join(" · ");
}

function getTextInputValue(state: TextInputExampleState): string {
    return state.valueState === "filled"
        ? "12 500"
        : "";
}

function renderSupportLabelMarkup(state: TextInputExampleState): string {
    if (!state.invalid) {
        return '<span class="jkl-dormant-form-support-label"></span>';
    }

    return [
        `<span id="${TEXT_INPUT_SUPPORT_ID}" class="jkl-form-support-label jkl-form-support-label--error">`,
        '<span class="jkl-form-support-label__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true"></span>',
        "<span>Beløpet må være høyere enn null.</span>",
        "</span>",
    ].join("");
}

function renderTextInputPreviewMarkup(state: TextInputExampleState): string {
    const rootClassName = [
        "jkl-text-input",
        "jkl-input-group",
        state.inline ? "jkl-text-input--inline" : "",
        state.inline ? "jkl-input-group--inline" : "",
    ].filter(Boolean).join(" ");
    const labelClassName = [
        "jkl-label",
        "jkl-label--small",
        state.inline ? "jkl-label--sr-only" : "",
    ].filter(Boolean).join(" ");
    const inputClassName = [
        "jkl-text-input__input",
        state.align === "right" ? "jkl-text-input__input--align-right" : "",
    ].filter(Boolean).join(" ");
    const inputAttributes = [
        `id="${TEXT_INPUT_ID}"`,
        `class="${inputClassName}"`,
        'type="text"',
        'name="amount"',
        'placeholder="0"',
        state.invalid ? 'aria-invalid="true"' : "",
        state.invalid ? `aria-describedby="${TEXT_INPUT_SUPPORT_ID}"` : "",
        state.disabled ? "disabled" : "",
        getTextInputValue(state) ? `value="${getTextInputValue(state)}"` : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getTextInputSummary(state)}</small></p>`,
        `<div class="${rootClassName}">`,
        `<label for="${TEXT_INPUT_ID}" class="${labelClassName}">Beløp</label>`,
        `<div class="jkl-text-input-wrapper"${state.invalid ? ' data-invalid="true"' : ""}>`,
        `<input ${inputAttributes}>`,
        state.unit === "kr" ? '<span class="jkl-text-input__unit">kr</span>' : "",
        "</div>",
        renderSupportLabelMarkup(state),
        "</div>",
        "</div>",
    ].join("");
}

function renderTextInputReactCode(state: TextInputExampleState): string {
    const alignCode = state.align === "right"
        ? '            align="right"\n'
        : "";
    const unitCode = state.unit === "kr"
        ? '            unit="kr"\n'
        : "";
    const inlineCode = state.inline ? "            inline\n" : "";
    const invalidCode = state.invalid
        ? '            invalid\n            errorLabel="Beløpet må være høyere enn null."\n'
        : "";
    const disabledCode = state.disabled ? "            disabled\n" : "";
    const valueCode = state.valueState === "filled"
        ? '            defaultValue="12 500"\n'
        : "";

    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import "@fremtind/jokul/styles/components/input-group/input-group.min.css";
import "@fremtind/jokul/styles/components/text-input/text-input.min.css";
import { TextInput } from "@fremtind/jokul/text-input";

export function Example() {
    return (
        <TextInput
            label="Beløp"
            name="amount"
            placeholder="0"
${alignCode}${unitCode}${inlineCode}${invalidCode}${disabledCode}${valueCode}        />
    );
}`;
}

function getTextInputNotes(state: TextInputExampleState): string[] {
    const notes = [
        "Bruk labelen til å forklare hva feltet gjelder, og la placeholder være et kort hint om format eller eksempelverdi.",
    ];

    if (state.align === "right") {
        notes.push("Høyrejustering passer best når brukeren sammenligner tall eller beløp i samme skjermbilde.");
    }

    if (state.unit === "kr") {
        notes.push("Enhetstekst hjelper brukeren, men labelen må fortsatt forklare hva verdien betyr.");
    }

    if (state.inline) {
        notes.push("Inline-modus passer i tette filterlinjer eller kompakte oppsett der feltet allerede er tydelig navngitt av konteksten.");
    }

    if (state.invalid) {
        notes.push("Feilmeldingen bør beskrive hva som er galt og hvordan brukeren kan rette det.");
    }

    if (state.disabled) {
        notes.push("Disabled felt trenger ofte forklaring i nærheten av feltet hvis brukeren forventer å kunne skrive der.");
    }

    return notes;
}

export function renderTextInputInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getTextInputExampleState(values);

    return {
        previewHtml: renderTextInputPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderTextInputReactCode(state),
            },
        ],
        notes: getTextInputNotes(state),
    };
}

export const textInputPlayground = createInteractiveExample(
    TEXT_INPUT_INTERACTIVE_EXAMPLE_RENDERER_ID,
    textInputInteractiveControls,
    renderTextInputInteractiveExample,
    {
        eventLog: {
            events: ["focus", "input", "blur"],
            targetSelector: "input",
            emptyLabel: "Ingen hendelser fra text-input-eksempelet ennå.",
            maxEntries: 6,
        },
    },
);
