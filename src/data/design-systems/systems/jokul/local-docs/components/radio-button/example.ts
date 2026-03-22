import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { radioButtonInteractiveControls } from "./props";

type RadioButtonSelectedValue = "email" | "sms" | "post";

interface RadioButtonExampleState {
    selectedValue: RadioButtonSelectedValue;
    inline: boolean;
    invalid: boolean;
    disabled: boolean;
}

const defaultRadioButtonExampleState: RadioButtonExampleState = {
    selectedValue: "email",
    inline: false,
    invalid: false,
    disabled: false,
};

const RADIO_BUTTON_GROUP_NAME = "receipt-delivery";
const RADIO_BUTTON_SUPPORT_ID = "jokul-radio-button-support";
const ERROR_GLYPH = "";

const radioButtonOptions = [
    {
        id: "jokul-radio-button-email",
        value: "email",
        label: "På e-post",
    },
    {
        id: "jokul-radio-button-sms",
        value: "sms",
        label: "På SMS",
    },
    {
        id: "jokul-radio-button-post",
        value: "post",
        label: "I posten",
    },
] as const;

export const RADIO_BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/radio-button";

function getRadioButtonExampleState(
    values: DesignSystemInteractiveExampleValues,
): RadioButtonExampleState {
    return {
        selectedValue: String(
            values.selectedValue ?? defaultRadioButtonExampleState.selectedValue,
        ) as RadioButtonSelectedValue,
        inline: values.inline === true,
        invalid: values.invalid === true,
        disabled: values.disabled === true,
    };
}

function getRadioButtonSummary(state: RadioButtonExampleState): string {
    return [
        `value="${state.selectedValue}"`,
        `inline=${state.inline ? "true" : "false"}`,
        `invalid=${state.invalid ? "true" : "false"}`,
        `disabled=${state.disabled ? "true" : "false"}`,
    ].join(" · ");
}

function renderRadioButtonOptionMarkup(
    state: RadioButtonExampleState,
    option: (typeof radioButtonOptions)[number],
): string {
    const className = [
        "jkl-radio-button",
        state.inline ? "jkl-radio-button--inline" : "",
    ].filter(Boolean).join(" ");

    const inputAttributes = [
        `id="${option.id}"`,
        'class="jkl-radio-button__input"',
        'type="radio"',
        `name="${RADIO_BUTTON_GROUP_NAME}"`,
        `value="${option.value}"`,
        state.selectedValue === option.value ? "checked" : "",
        state.disabled && option.value === "post" ? "disabled" : "",
        state.invalid ? 'aria-invalid="true"' : "",
    ].filter(Boolean).join(" ");

    return [
        `<div class="${className}">`,
        `<label for="${option.id}" class="jkl-radio-button__label">${option.label}</label>`,
        `<input ${inputAttributes}>`,
        "</div>",
    ].join("");
}

function renderRadioButtonSupportMarkup(state: RadioButtonExampleState): string {
    if (!state.invalid) {
        return "";
    }

    return [
        `<span id="${RADIO_BUTTON_SUPPORT_ID}" class="jkl-form-support-label jkl-form-support-label--error">`,
        `<span class="jkl-form-support-label__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true">${ERROR_GLYPH}</span>`,
        "<span>Velg én kontaktmåte før du går videre.</span>",
        "</span>",
    ].join("");
}

function renderRadioButtonPreviewMarkup(state: RadioButtonExampleState): string {
    return [
        '<div class="jkl">',
        `<p><small>${getRadioButtonSummary(state)}</small></p>`,
        [
            '<fieldset class="jkl-field-group" role="radiogroup"',
            state.invalid ? ` aria-describedby="${RADIO_BUTTON_SUPPORT_ID}"` : "",
            state.invalid ? ' aria-invalid="true"' : "",
            ">",
        ].join(""),
        '<legend class="jkl-field-group__legend">',
        '<span class="jkl-label jkl-label--medium">Hvordan vil du ha kvitteringen?</span>',
        "</legend>",
        radioButtonOptions.map((option) => renderRadioButtonOptionMarkup(state, option)).join(""),
        renderRadioButtonSupportMarkup(state),
        "</fieldset>",
        "</div>",
    ].join("");
}

function renderRadioButtonReactCode(state: RadioButtonExampleState): string {
    const valueCode = `            value="${state.selectedValue}"\n`;
    const inlineCode = state.inline ? "            inline\n" : "";
    const invalidCode = state.invalid
        ? '            errorLabel="Velg én kontaktmåte før du går videre."\n'
        : "";
    const disabledCode = state.disabled ? "            <RadioButton value=\"post\" disabled>I posten</RadioButton>\n" : "            <RadioButton value=\"post\">I posten</RadioButton>\n";

    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/input-group/input-group.min.css";
import "@fremtind/jokul/styles/components/radio-button/radio-button.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import { RadioButton, RadioButtonGroup } from "@fremtind/jokul/radio-button";

export function Example() {
    return (
        <RadioButtonGroup
            legend="Hvordan vil du ha kvitteringen?"
            name="receipt-delivery"
${valueCode}${inlineCode}${invalidCode}        >
            <RadioButton value="email">På e-post</RadioButton>
            <RadioButton value="sms">På SMS</RadioButton>
${disabledCode}        </RadioButtonGroup>
    );
}`;
}

function getRadioButtonNotes(state: RadioButtonExampleState): string[] {
    const notes = [
        "Bruk radio buttons når brukeren må velge nøyaktig ett alternativ i en liten, kjent gruppe.",
    ];

    if (state.inline) {
        notes.push("Inline-oppsett fungerer best når alternativene er korte og fremdeles lette å skanne side ved side.");
    }

    if (state.invalid) {
        notes.push("Feilstatus på gruppen bør forklare hvorfor brukeren må velge ett alternativ før neste steg.");
    }

    if (state.disabled) {
        notes.push("Disabled valg trenger forklaring i nærheten når brukeren kan forvente at alternativet skal være tilgjengelig.");
    }

    return notes;
}

export function renderRadioButtonInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getRadioButtonExampleState(values);

    return {
        previewHtml: renderRadioButtonPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderRadioButtonReactCode(state),
            },
        ],
        notes: getRadioButtonNotes(state),
    };
}

export const radioButtonPlayground = createInteractiveExample(
    RADIO_BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    radioButtonInteractiveControls,
    renderRadioButtonInteractiveExample,
    {
        eventLog: {
            events: ["focus", "change", "blur"],
            targetSelector: "input",
            emptyLabel: "Ingen hendelser fra radio button-eksempelet ennå.",
            maxEntries: 6,
        },
    },
);
