import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { summaryTableInteractiveControls } from "./props";

interface SummaryTableExampleState {
    caption: boolean;
    footer: boolean;
}

const defaultSummaryTableExampleState: SummaryTableExampleState = {
    caption: true,
    footer: true,
};

export const SUMMARY_TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/summary-table";

function getSummaryTableExampleState(
    values: DesignSystemInteractiveExampleValues,
): SummaryTableExampleState {
    return {
        caption: values.caption === undefined
            ? defaultSummaryTableExampleState.caption
            : values.caption === true,
        footer: values.footer === undefined
            ? defaultSummaryTableExampleState.footer
            : values.footer === true,
    };
}

function getSummaryTableSummary(state: SummaryTableExampleState): string {
    return [
        `caption=${state.caption ? "true" : "false"}`,
        `footer=${state.footer ? "true" : "false"}`,
    ].join(" · ");
}

function renderSummaryTableRow(header: string, content: string): string {
    return [
        "<tr>",
        `<th scope="row">${header}</th>`,
        `<td>${content}</td>`,
        "</tr>",
    ].join("");
}

function renderSummaryTableFooter(state: SummaryTableExampleState): string {
    if (!state.footer) {
        return "";
    }

    return [
        "<tfoot>",
        renderSummaryTableRow("Total", "18 komponenter"),
        "</tfoot>",
    ].join("");
}

function renderSummaryTablePreviewMarkup(
    state: SummaryTableExampleState,
): string {
    return [
        '<div class="jkl">',
        `<p><small>${getSummaryTableSummary(state)}</small></p>`,
        '<table class="jkl-summary-table">',
        state.caption ? '<caption class="jkl-sr-only">Oppsummering av Jøkul-dokumentasjonen</caption>' : "",
        '<thead class="jkl-sr-only"><tr><th scope="col">Felt</th><th scope="col">Verdi</th></tr></thead>',
        "<tbody>",
        renderSummaryTableRow("Dokumenterte komponenter", "14"),
        renderSummaryTableRow("Dokumenterte ikoner", "30"),
        renderSummaryTableRow("Mangler lokale docs", "4"),
        "</tbody>",
        renderSummaryTableFooter(state),
        "</table>",
        "</div>",
    ].join("");
}

function renderSummaryTableReactCode(
    state: SummaryTableExampleState,
): string {
    const captionCode = state.caption
        ? '\n            caption="Oppsummering av Jøkul-dokumentasjonen"'
        : "";
    const footerCode = state.footer
        ? "\n            footer={<SummaryTableRow header=\"Total\" content=\"18 komponenter\" />}"
        : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/summary-table/summary-table.min.css";
import { SummaryTable, SummaryTableRow } from "@fremtind/jokul/summary-table";

export function Example() {
    return (
        <SummaryTable
            header={["Felt", "Verdi"]}${captionCode}${footerCode}
            body={
                <>
                    <SummaryTableRow header="Dokumenterte komponenter" content="14" />
                    <SummaryTableRow header="Dokumenterte ikoner" content="30" />
                    <SummaryTableRow header="Mangler lokale docs" content="4" />
                </>
            }
        />
    );
}`;
}

function getSummaryTableNotes(state: SummaryTableExampleState): string[] {
    const notes = [
        "SummaryTable fungerer godt for korte oppsummeringer med tydelige radetiketter og verdier som ikke trenger full tabellatferd.",
    ];

    if (state.caption) {
        notes.push("Selv om captionen er visuelt skjult gir den skjermlesere et tydelig navn på oppsummeringen.");
    }

    if (state.footer) {
        notes.push("Footer bør reserveres for totalsummer eller annen tydelig oppsummering som skiller seg fra de vanlige radene.");
    }

    return notes;
}

export function renderSummaryTableInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getSummaryTableExampleState(values);

    return {
        previewHtml: renderSummaryTablePreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderSummaryTableReactCode(state),
            },
        ],
        notes: getSummaryTableNotes(state),
    };
}

export const summaryTablePlayground = createInteractiveExample(
    SUMMARY_TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    summaryTableInteractiveControls,
    renderSummaryTableInteractiveExample,
);
