import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { selectInteractiveControls } from "./props";

type SelectValueState = "empty" | "planning" | "published";

interface SelectExampleState {
    inline: boolean;
    invalid: boolean;
    disabled: boolean;
    width: string;
    placeholder: string;
    valueState: SelectValueState;
}

const defaultSelectExampleState: SelectExampleState = {
    inline: false,
    invalid: false,
    disabled: false,
    width: "auto",
    placeholder: "Velg fase",
    valueState: "empty",
};

const SELECT_INPUT_ID = "jokul-native-select-example";
const SELECT_SUPPORT_ID = "jokul-select-support";

export const SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/select";

function getSelectExampleState(
    values: DesignSystemInteractiveExampleValues,
): SelectExampleState {
    return {
        inline: values.inline === true,
        invalid: values.invalid === true,
        disabled: values.disabled === true,
        width: String(values.width ?? defaultSelectExampleState.width),
        placeholder: String(values.placeholder ?? defaultSelectExampleState.placeholder),
        valueState: String(values.valueState ?? defaultSelectExampleState.valueState) as SelectValueState,
    };
}

function getSelectSummary(state: SelectExampleState): string {
    return [
        `inline=${state.inline ? "true" : "false"}`,
        `invalid=${state.invalid ? "true" : "false"}`,
        `disabled=${state.disabled ? "true" : "false"}`,
        `width="${state.width}"`,
        `placeholder="${state.placeholder}"`,
        `value="${state.valueState}"`,
    ].join(" · ");
}

function renderSelectSupportLabel(state: SelectExampleState): string {
    if (!state.invalid) {
        return '<span class="jkl-dormant-form-support-label"></span>';
    }

    return [
        `<span id="${SELECT_SUPPORT_ID}" class="jkl-form-support-label jkl-form-support-label--error">`,
        '<span class="jkl-form-support-label__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true"></span>',
        "<span>Velg en fase før du går videre.</span>",
        "</span>",
    ].join("");
}

function renderSelectArrow(): string {
    return '<span class="jkl-select__arrow jkl-icon" aria-hidden="true"></span>';
}

function renderSelectPreviewMarkup(state: SelectExampleState): string {
    const rootClassName = [
        "jkl-select",
        "jkl-input-group",
        state.inline ? "jkl-select--inline" : "",
        state.inline ? "jkl-input-group--inline" : "",
        state.invalid ? "jkl-select--invalid" : "",
    ].filter(Boolean).join(" ");
    const labelClassName = [
        "jkl-label",
        "jkl-label--small",
        state.inline ? "jkl-label--sr-only" : "",
    ].filter(Boolean).join(" ");
    const selectClassName = [
        "jkl-select__button",
        state.valueState !== "empty" ? "jkl-select__button--active-value" : "",
    ].filter(Boolean).join(" ");
    const selectAttributes = [
        `id="${SELECT_INPUT_ID}"`,
        `class="${selectClassName}"`,
        'name="stage"',
        state.invalid ? 'aria-invalid="true"' : "",
        state.invalid ? `aria-describedby="${SELECT_SUPPORT_ID}"` : "",
        state.disabled ? "disabled" : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getSelectSummary(state)}</small></p>`,
        `<div class="${rootClassName}">`,
        `<label for="${SELECT_INPUT_ID}" class="${labelClassName}">Fase</label>`,
        `<div class="jkl-select__outer-wrapper"${state.width === "auto" ? "" : ` style="width: ${state.width};"`}>`,
        `<select ${selectAttributes}>`,
        `<option value="" disabled${state.valueState === "empty" ? " selected" : ""}>${state.placeholder}</option>`,
        `<option value="planning"${state.valueState === "planning" ? " selected" : ""}>Planlegging</option>`,
        '<option value="implementation">Implementering</option>',
        `<option value="published"${state.valueState === "published" ? " selected" : ""}>Publisert</option>`,
        "</select>",
        renderSelectArrow(),
        "</div>",
        renderSelectSupportLabel(state),
        "</div>",
        "</div>",
    ].join("");
}

function renderSelectReactCode(state: SelectExampleState): string {
    const inlineCode = state.inline ? "            inline\n" : "";
    const invalidCode = state.invalid
        ? '            invalid\n            errorLabel="Velg en fase før du går videre."\n'
        : "";
    const disabledCode = state.disabled ? "            disabled\n" : "";
    const widthCode = state.width !== "auto"
        ? `            width="${state.width}"\n`
        : "";
    const valueCode = state.valueState === "empty"
        ? ""
        : `            value="${state.valueState}"\n            onChange={() => undefined}\n`;

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import "@fremtind/jokul/styles/components/input-group/input-group.min.css";
import "@fremtind/jokul/styles/components/select/select.min.css";
import { NativeSelect } from "@fremtind/jokul/select";

const items = [
    "Planlegging",
    "Implementering",
    "Publisert",
];

export function Example() {
    return (
        <NativeSelect
            label="Fase"
            name="stage"
            items={items}
            placeholder="${state.placeholder}"
${inlineCode}${invalidCode}${disabledCode}${widthCode}${valueCode}        />
    );
}`;
}

function getSelectNotes(state: SelectExampleState): string[] {
    const notes = [
        "Bruk native select når listen er kort nok til at brukeren får oversikt uten søk eller ekstra interaksjonslag.",
    ];

    if (state.valueState === "empty") {
        notes.push("Placeholderen bør beskrive hva slags valg som forventes, ikke bare gjenta labelen ordrett.");
    }

    if (state.inline) {
        notes.push("Inline-modus passer best i tette filterfelt eller verktøylinjer der den omkringliggende konteksten gjør formålet tydelig.");
    }

    if (state.invalid) {
        notes.push("Feilmeldingen bør forklare hvorfor et valg må tas, ikke bare fortelle at feltet er ugyldig.");
    }

    if (state.width !== "auto") {
        notes.push("Fast bredde er nyttig når selecten inngår i en styrt layout og ikke skal hoppe i størrelse med innholdet.");
    }

    if (state.disabled) {
        notes.push("Disabled select trenger ofte forklaring hvis brukeren forventer at listen skal være tilgjengelig.");
    }

    return notes;
}

export function renderSelectInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getSelectExampleState(values);

    return {
        previewHtml: renderSelectPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderSelectReactCode(state),
            },
        ],
        notes: getSelectNotes(state),
    };
}

export const selectPlayground = createInteractiveExample(
    SELECT_INTERACTIVE_EXAMPLE_RENDERER_ID,
    selectInteractiveControls,
    renderSelectInteractiveExample,
    {
        eventLog: {
            events: ["focus", "change", "blur"],
            targetSelector: "select",
            emptyLabel: "Ingen hendelser fra select-eksempelet ennå.",
            maxEntries: 6,
        },
    },
);
