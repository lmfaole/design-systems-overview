import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { textAreaInteractiveControls } from "./props";

type TextAreaRowsValue = "3" | "7" | "10";
type TextAreaValueState = "empty" | "filled";

interface TextAreaExampleState {
    rows: TextAreaRowsValue;
    startOpen: boolean;
    autoExpand: boolean;
    counter: boolean;
    invalid: boolean;
    valueState: TextAreaValueState;
}

const defaultTextAreaExampleState: TextAreaExampleState = {
    rows: "7",
    startOpen: false,
    autoExpand: false,
    counter: false,
    invalid: false,
    valueState: "empty",
};

const TEXT_AREA_ID = "jokul-text-area-example";
const TEXT_AREA_SUPPORT_ID = "jokul-text-area-support";
const TEXT_AREA_COUNTER_MAX = 120;
const ERROR_GLYPH = "";

export const TEXT_AREA_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/text-area";

function getTextAreaExampleState(
    values: DesignSystemInteractiveExampleValues,
): TextAreaExampleState {
    return {
        rows: String(values.rows ?? defaultTextAreaExampleState.rows) as TextAreaRowsValue,
        startOpen: values.startOpen === true,
        autoExpand: values.autoExpand === true,
        counter: values.counter === true,
        invalid: values.invalid === true,
        valueState: String(
            values.valueState ?? defaultTextAreaExampleState.valueState,
        ) as TextAreaValueState,
    };
}

function getTextAreaValue(state: TextAreaExampleState): string {
    return state.valueState === "filled"
        ? "Jeg trenger hjelp til å forstå hvilke dokumenter som mangler før jeg kan sende inn saken."
        : "";
}

function getCounterProgressWidth(valueLength: number): string {
    const remaining = Math.max(TEXT_AREA_COUNTER_MAX - valueLength, 0);
    const width = Math.max((remaining / TEXT_AREA_COUNTER_MAX) * 100, 0);

    return `${width}%`;
}

function getTextAreaSummary(state: TextAreaExampleState): string {
    return [
        `rows=${state.rows}`,
        `startOpen=${state.startOpen ? "true" : "false"}`,
        `autoExpand=${state.autoExpand ? "true" : "false"}`,
        `counter=${state.counter ? "true" : "false"}`,
        `invalid=${state.invalid ? "true" : "false"}`,
        `value="${state.valueState}"`,
    ].join(" · ");
}

function renderTextAreaSupportMarkup(state: TextAreaExampleState): string {
    if (!state.invalid) {
        return '<span class="jkl-dormant-form-support-label"></span>';
    }

    return [
        `<span id="${TEXT_AREA_SUPPORT_ID}" class="jkl-form-support-label jkl-form-support-label--error">`,
        `<span class="jkl-form-support-label__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true">${ERROR_GLYPH}</span>`,
        "<span>Beskrivelsen må gjøre det tydelig hva du trenger hjelp til.</span>",
        "</span>",
    ].join("");
}

function renderTextAreaCounterMarkup(valueLength: number): string {
    return [
        '<div class="jkl-text-area__counter" aria-hidden="true">',
        `<div class="jkl-text-area__counter-count">${valueLength} / ${TEXT_AREA_COUNTER_MAX}</div>`,
        `<div class="jkl-text-area__counter-progress" style="--progress-width: ${getCounterProgressWidth(valueLength)}"></div>`,
        "</div>",
    ].join("");
}

function renderTextAreaPreviewMarkup(state: TextAreaExampleState): string {
    const value = getTextAreaValue(state);
    const rootClassName = [
        "jkl-text-area",
        "jkl-input-group",
        state.startOpen ? "jkl-text-area--start-open" : "",
        state.autoExpand ? "jkl-text-area--auto-expand" : "",
    ].filter(Boolean).join(" ");
    const textAreaAttributes = [
        `id="${TEXT_AREA_ID}"`,
        `class="jkl-text-area__text-area jkl-text-area__text-area--${state.rows}-rows"`,
        'name="caseDescription"',
        'placeholder=" "',
        state.invalid ? 'aria-invalid="true"' : "",
        state.invalid ? `aria-describedby="${TEXT_AREA_SUPPORT_ID}"` : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getTextAreaSummary(state)}</small></p>`,
        `<div class="${rootClassName}">`,
        `<label for="${TEXT_AREA_ID}" class="jkl-label jkl-label--small">Hva trenger du hjelp til?</label>`,
        `<div class="jkl-text-area-wrapper"${state.invalid ? ' data-invalid="true"' : ""}>`,
        `<textarea ${textAreaAttributes}>${value}</textarea>`,
        state.counter ? renderTextAreaCounterMarkup(value.length) : "",
        "</div>",
        renderTextAreaSupportMarkup(state),
        "</div>",
        "</div>",
    ].join("");
}

function renderTextAreaReactCode(state: TextAreaExampleState): string {
    const rowsCode = state.rows !== "7"
        ? `            rows={${state.rows}}\n`
        : "";
    const startOpenCode = state.startOpen ? "            startOpen\n" : "";
    const autoExpandCode = state.autoExpand ? "            autoExpand\n" : "";
    const counterCode = state.counter
        ? `            counter={{ maxLength: ${TEXT_AREA_COUNTER_MAX} }}\n`
        : "";
    const invalidCode = state.invalid
        ? '            errorLabel="Beskrivelsen må gjøre det tydelig hva du trenger hjelp til."\n'
        : "";
    const valueCode = state.valueState === "filled"
        ? '            defaultValue="Jeg trenger hjelp til å forstå hvilke dokumenter som mangler før jeg kan sende inn saken."\n'
        : "";

    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import "@fremtind/jokul/styles/components/input-group/input-group.min.css";
import "@fremtind/jokul/styles/components/text-area/text-area.min.css";
import { TextArea } from "@fremtind/jokul/text-area";

export function Example() {
    return (
        <TextArea
            label="Hva trenger du hjelp til?"
${rowsCode}${startOpenCode}${autoExpandCode}${counterCode}${invalidCode}${valueCode}        />
    );
}`;
}

function getTextAreaNotes(state: TextAreaExampleState): string[] {
    const notes = [
        "TextArea passer når brukeren trenger mer plass enn et vanlig tekstfelt gir, og når innholdet forventes å være mer enn én kort verdi.",
    ];

    if (state.startOpen) {
        notes.push("StartOpen fungerer best når brukeren sannsynligvis må skrive mer enn et par ord med en gang.");
    }

    if (state.autoExpand) {
        notes.push("AutoExpand er nyttig når hele teksten bør være synlig uten intern scrolling, men det kan gjøre høye skjemaer mer urolige.");
    }

    if (state.counter) {
        notes.push("Teller er nyttig når brukeren faktisk må forholde seg til en grense, ikke bare fordi komponenten kan vise en.");
    }

    if (state.invalid) {
        notes.push("Feilmeldingen bør forklare hva som mangler i innholdet, ikke bare at feltet er ugyldig.");
    }

    return notes;
}

export function renderTextAreaInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getTextAreaExampleState(values);

    return {
        previewHtml: renderTextAreaPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderTextAreaReactCode(state),
            },
        ],
        notes: getTextAreaNotes(state),
    };
}

export const textAreaPlayground = createInteractiveExample(
    TEXT_AREA_INTERACTIVE_EXAMPLE_RENDERER_ID,
    textAreaInteractiveControls,
    renderTextAreaInteractiveExample,
    {
        eventLog: {
            events: ["focus", "input", "blur"],
            targetSelector: "textarea",
            emptyLabel: "Ingen hendelser fra text-area-eksempelet ennå.",
            maxEntries: 6,
        },
    },
);
