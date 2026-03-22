import type { DesignSystemComponentRecipe } from "../../../../../types";

function getTableCssImports(): string {
    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/table/table.min.css";`;
}

export const tableRecipes: DesignSystemComponentRecipe[] = [
    {
        slug: "standard",
        title: "Standard tabell",
        description: "Grunnkomposisjonen for vanlige datasett med caption, header-rad og semantiske celler.",
        requiredPartNames: [
            "Table root",
            "Caption",
            "Head section",
            "Header cell",
            "Body row",
            "Data cell",
        ],
        example: {
            slug: "standard-table-recipe",
            previewHtml: `<div class="jkl">
    <table class="jkl-table">
        <caption>Bestillinger fra denne uka</caption>
        <thead class="jkl-table-head">
            <tr class="jkl-table-row">
                <th class="jkl-table-header" scope="col">Kunde</th>
                <th class="jkl-table-header" scope="col">Status</th>
                <th class="jkl-table-header jkl-table-header--align-right" scope="col">Beløp</th>
            </tr>
        </thead>
        <tbody>
            <tr class="jkl-table-row">
                <td class="jkl-table-cell" data-th="Kunde">Anna Olsen</td>
                <td class="jkl-table-cell" data-th="Status">Sendt</td>
                <td class="jkl-table-cell jkl-table-cell--align-right" data-th="Beløp">12 500 kr</td>
            </tr>
        </tbody>
    </table>
</div>`,
            codeExamples: [
                {
                    label: "CSS-importer",
                    language: "ts",
                    code: getTableCssImports(),
                },
            ],
        },
    },
    {
        slug: "collapse-to-list",
        title: "Collapse to list",
        description: "Brukes når tabellen må kunne brytes ned til listevisning på små skjermer uten å miste kolonneetikettene.",
        requiredPartNames: [
            "Table root",
            "Caption",
            "Head section",
            "Header cell",
            "Body row",
            "Data cell",
        ],
        example: {
            slug: "collapse-to-list-recipe",
            previewHtml: `<div class="jkl">
    <table class="jkl-table jkl-table--collapse-to-list" data-collapse>
        <caption>Bestillinger fra denne uka</caption>
        <thead class="jkl-table-head">
            <tr class="jkl-table-row">
                <th class="jkl-table-header" scope="col">Kunde</th>
                <th class="jkl-table-header" scope="col">Status</th>
                <th class="jkl-table-header jkl-table-header--align-right" scope="col">Beløp</th>
            </tr>
        </thead>
        <tbody>
            <tr class="jkl-table-row">
                <td class="jkl-table-cell" data-th="Kunde">Anna Olsen</td>
                <td class="jkl-table-cell" data-th="Status">Sendt</td>
                <td class="jkl-table-cell jkl-table-cell--align-right" data-th="Beløp">12 500 kr</td>
            </tr>
        </tbody>
    </table>
</div>`,
            codeExamples: [
                {
                    label: "CSS-importer",
                    language: "ts",
                    code: getTableCssImports(),
                },
            ],
            notes: [
                "Listevisningen krever `data-th` på hver celle for å vise kolonnenavn sammen med verdiene.",
            ],
        },
    },
    {
        slug: "sticky-head",
        title: "Sticky head",
        description: "Passer for lengre tabeller der brukeren ellers mister oversikten over kolonnene under scrolling.",
        requiredPartNames: [
            "Table root",
            "Caption",
            "Head section",
            "Header cell",
            "Body row",
            "Data cell",
        ],
        example: {
            slug: "sticky-head-recipe",
            previewHtml: `<div class="jkl">
    <table class="jkl-table jkl-table--full-width">
        <caption>Bestillinger fra denne uka</caption>
        <thead class="jkl-table-head jkl-table-head--sticky">
            <tr class="jkl-table-row">
                <th class="jkl-table-header" scope="col">Kunde</th>
                <th class="jkl-table-header" scope="col">Status</th>
                <th class="jkl-table-header jkl-table-header--align-right" scope="col">Beløp</th>
            </tr>
        </thead>
        <tbody>
            <tr class="jkl-table-row">
                <td class="jkl-table-cell" data-th="Kunde">Anna Olsen</td>
                <td class="jkl-table-cell" data-th="Status">Sendt</td>
                <td class="jkl-table-cell jkl-table-cell--align-right" data-th="Beløp">12 500 kr</td>
            </tr>
            <tr class="jkl-table-row">
                <td class="jkl-table-cell" data-th="Kunde">Jonas Nilsen</td>
                <td class="jkl-table-cell" data-th="Status">Under behandling</td>
                <td class="jkl-table-cell jkl-table-cell--align-right" data-th="Beløp">4 200 kr</td>
            </tr>
        </tbody>
    </table>
</div>`,
            codeExamples: [
                {
                    label: "CSS-importer",
                    language: "ts",
                    code: getTableCssImports(),
                },
            ],
            notes: [
                "Sticky head blir først virkelig nyttig når tabellen står i et område som kan scrolle.",
            ],
        },
    },
];
