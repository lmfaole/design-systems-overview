import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { descriptionListInteractiveControls } from "./props";

type DescriptionListAlignmentValue = "horizontal" | "vertical" | "justified";

interface DescriptionListExampleState {
    alignment: DescriptionListAlignmentValue;
    separators: boolean;
}

const defaultDescriptionListExampleState: DescriptionListExampleState = {
    alignment: "horizontal",
    separators: false,
};

export const DESCRIPTION_LIST_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/description-list";

function getDescriptionListExampleState(
    values: DesignSystemInteractiveExampleValues,
): DescriptionListExampleState {
    return {
        alignment: String(
            values.alignment ?? defaultDescriptionListExampleState.alignment,
        ) as DescriptionListAlignmentValue,
        separators: values.separators === true,
    };
}

function getDescriptionListSummary(state: DescriptionListExampleState): string {
    return [
        `alignment="${state.alignment}"`,
        `separators=${state.separators ? "true" : "false"}`,
    ].join(" · ");
}

function renderDescriptionListRow(term: string, detail: string): string {
    return [
        '<div class="seperator"></div>',
        `<dt class="jkl-description-list__term">${term}</dt>`,
        `<dd class="jkl-description-list__detail">${detail}</dd>`,
    ].join("");
}

function renderDescriptionListPreviewMarkup(
    state: DescriptionListExampleState,
): string {
    return [
        '<div class="jkl">',
        `<p><small>${getDescriptionListSummary(state)}</small></p>`,
        `<dl class="jkl-description-list" data-alignment="${state.alignment}" data-separators="${state.separators ? "true" : "false"}">`,
        renderDescriptionListRow("System", "Jøkul"),
        renderDescriptionListRow("Dekning", "14 dokumenterte komponenter"),
        renderDescriptionListRow("Sist oppdatert", "22. mars 2026"),
        "</dl>",
        "</div>",
    ].join("");
}

function renderDescriptionListReactCode(
    state: DescriptionListExampleState,
): string {
    const alignmentCode = state.alignment !== "horizontal"
        ? `\n            alignment="${state.alignment}"`
        : "";
    const separatorCode = state.separators ? "\n            separators" : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/description-list/description-list.min.css";
import {
    DescriptionDetail,
    DescriptionList,
    DescriptionTerm,
} from "@fremtind/jokul/description-list";

export function Example() {
    return (
        <DescriptionList${alignmentCode}${separatorCode}>
            <DescriptionTerm>System</DescriptionTerm>
            <DescriptionDetail>Jøkul</DescriptionDetail>

            <DescriptionTerm>Dekning</DescriptionTerm>
            <DescriptionDetail>14 dokumenterte komponenter</DescriptionDetail>

            <DescriptionTerm>Sist oppdatert</DescriptionTerm>
            <DescriptionDetail>22. mars 2026</DescriptionDetail>
        </DescriptionList>
    );
}`;
}

function getDescriptionListNotes(state: DescriptionListExampleState): string[] {
    const notes = [
        "Beskrivelseslister passer godt for korte nøkkel-verdi-par når brukeren ikke trenger å sammenligne store datamengder på tvers av mange rader.",
    ];

    if (state.alignment === "justified") {
        notes.push("Justified-varianten fungerer best når detaljverdiene har ganske lik bredde og bør stå ryddig mot høyrekanten.");
    }

    if (state.separators) {
        notes.push("Separatorer hjelper når listen er lang nok til at hver rad trenger tydeligere avgrensning.");
    }

    return notes;
}

export function renderDescriptionListInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getDescriptionListExampleState(values);

    return {
        previewHtml: renderDescriptionListPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderDescriptionListReactCode(state),
            },
        ],
        notes: getDescriptionListNotes(state),
    };
}

export const descriptionListPlayground = createInteractiveExample(
    DESCRIPTION_LIST_INTERACTIVE_EXAMPLE_RENDERER_ID,
    descriptionListInteractiveControls,
    renderDescriptionListInteractiveExample,
);
