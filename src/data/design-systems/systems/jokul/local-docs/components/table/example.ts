import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { tableInteractiveControls } from "./props";

type TableDensityValue = "comfortable" | "compact";
type TableAlignValue = "left" | "right";

interface TableExampleState {
    density: TableDensityValue;
    fullWidth: boolean;
    collapseToList: boolean;
    captionSrOnly: boolean;
    amountAlign: TableAlignValue;
}

const defaultTableExampleState: TableExampleState = {
    density: "comfortable",
    fullWidth: false,
    collapseToList: false,
    captionSrOnly: false,
    amountAlign: "right",
};
export const TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/table";

function getTableExampleState(values: Record<string, string | boolean>): TableExampleState {
    return {
        density: String(values.density ?? defaultTableExampleState.density) as TableDensityValue,
        fullWidth: values.fullWidth === true,
        collapseToList: values.collapseToList === true,
        captionSrOnly: values.captionSrOnly === true,
        amountAlign: String(values.amountAlign ?? defaultTableExampleState.amountAlign) as TableAlignValue,
    };
}

function getTableSummary(state: TableExampleState): string {
    return [
        `density="${state.density}"`,
        `fullWidth=${state.fullWidth ? "true" : "false"}`,
        `collapseToList=${state.collapseToList ? "true" : "false"}`,
        `captionSrOnly=${state.captionSrOnly ? "true" : "false"}`,
        `amountAlign="${state.amountAlign}"`,
    ].join(" · ");
}

function getTableClassName(state: TableExampleState): string {
    return [
        "jkl-table",
        state.fullWidth ? "jkl-table--full-width" : "",
        state.collapseToList ? "jkl-table--collapse-to-list" : "",
    ].filter(Boolean).join(" ");
}

function getCaptionClassName(state: TableExampleState): string {
    return state.captionSrOnly
        ? "jkl-table-caption--sr-only"
        : "";
}

function getHeadClassName(): string {
    return "jkl-table-head";
}

function getHeaderClassName(align: TableAlignValue): string {
    return [
        "jkl-table-header",
        align === "right" ? "jkl-table-header--align-right" : "",
    ].filter(Boolean).join(" ");
}

function getCellClassName(align: TableAlignValue): string {
    return [
        "jkl-table-cell",
        align === "right" ? "jkl-table-cell--align-right" : "",
    ].filter(Boolean).join(" ");
}

function renderTablePreviewMarkup(state: TableExampleState): string {
    const tableAttributes = [
        `class="${getTableClassName(state)}"`,
        state.collapseToList ? "data-collapse" : "",
    ].filter(Boolean).join(" ");
    const amountHeaderClassName = getHeaderClassName(state.amountAlign);
    const amountCellClassName = getCellClassName(state.amountAlign);

    return [
        `<div class="jkl" data-density="${state.density}">`,
        `<p><small>${getTableSummary(state)}</small></p>`,
        `<table ${tableAttributes}>`,
        `<caption class="${getCaptionClassName(state)}">Bestillinger fra denne uka</caption>`,
        `<thead class="${getHeadClassName()}">`,
        '<tr class="jkl-table-row">',
        '<th class="jkl-table-header" scope="col">Kunde</th>',
        '<th class="jkl-table-header" scope="col">Status</th>',
        `<th class="${amountHeaderClassName}" scope="col">Beløp</th>`,
        "</tr>",
        "</thead>",
        "<tbody>",
        '<tr class="jkl-table-row">',
        '<td class="jkl-table-cell" data-th="Kunde">Anna Olsen</td>',
        '<td class="jkl-table-cell" data-th="Status">Sendt</td>',
        `<td class="${amountCellClassName}" data-th="Beløp">12 500 kr</td>`,
        "</tr>",
        '<tr class="jkl-table-row">',
        '<td class="jkl-table-cell" data-th="Kunde">Jonas Nilsen</td>',
        '<td class="jkl-table-cell" data-th="Status">Under behandling</td>',
        `<td class="${amountCellClassName}" data-th="Beløp">4 200 kr</td>`,
        "</tr>",
        '<tr class="jkl-table-row">',
        '<td class="jkl-table-cell" data-th="Kunde">Mina Berg</td>',
        '<td class="jkl-table-cell" data-th="Status">Klar</td>',
        `<td class="${amountCellClassName}" data-th="Beløp">980 kr</td>`,
        "</tr>",
        "</tbody>",
        "</table>",
        "</div>",
    ].join("");
}

function renderTableReactCode(state: TableExampleState): string {
    const fullWidthCode = state.fullWidth
        ? "            fullWidth\n"
        : "";
    const collapseToListCode = state.collapseToList
        ? "            collapseToList\n"
        : "";
    const captionCode = state.captionSrOnly
        ? "                <TableCaption srOnly>Bestillinger fra denne uka</TableCaption>\n"
        : "                <TableCaption>Bestillinger fra denne uka</TableCaption>\n";
    const alignCode = state.amountAlign === "right"
        ? ' align="right"'
        : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/table/table.min.css";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fremtind/jokul/table";

export function Example() {
    return (
        <div data-density="${state.density}">
            <Table
                caption={
${captionCode}                }
${fullWidthCode}${collapseToListCode}            >
                <TableHead>
                    <TableRow>
                        <TableHeader>Kunde</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader${alignCode}>Beløp</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell data-th="Kunde">Anna Olsen</TableCell>
                        <TableCell data-th="Status">Sendt</TableCell>
                        <TableCell data-th="Beløp"${alignCode}>12 500 kr</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell data-th="Kunde">Jonas Nilsen</TableCell>
                        <TableCell data-th="Status">Under behandling</TableCell>
                        <TableCell data-th="Beløp"${alignCode}>4 200 kr</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell data-th="Kunde">Mina Berg</TableCell>
                        <TableCell data-th="Status">Klar</TableCell>
                        <TableCell data-th="Beløp"${alignCode}>980 kr</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}`;
}

function getTableNotes(state: TableExampleState): string[] {
    const notes = [
        "Bruk en ekte caption som beskriver datasettet, ikke bare en visuell overskrift over tabellen.",
    ];

    if (state.fullWidth) {
        notes.push("Full width passer når tabellen skal være hovedinnholdet i containeren og kolonnebreddene kan bruke hele flaten.");
    }

    if (state.collapseToList) {
        notes.push("Forhåndsvisningen setter også `data-collapse` for å vise listevisningen i docs. I vanlig bruk håndterer komponenten dette responsivt.");
    }

    if (state.captionSrOnly) {
        notes.push("Skjul caption visuelt bare når tabellen allerede er tydelig navngitt i omgivelsene.");
    }

    if (state.amountAlign === "right") {
        notes.push("Høyrejustering passer for beløp og andre tallkolonner så verdiene blir lettere å sammenligne.");
    }

    if (state.density === "compact") {
        notes.push("Compact bør bare brukes når resten av datavisningen eller arbeidsflaten også er kompakt.");
    }

    return notes;
}

export function renderTableInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getTableExampleState(values);

    return {
        previewHtml: renderTablePreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderTableReactCode(state),
            },
        ],
        notes: getTableNotes(state),
    };
}

export const tablePlayground = createInteractiveExample(
    TABLE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    tableInteractiveControls,
    renderTableInteractiveExample,
);
