import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const tableComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/table/table.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/table",
            typeName: "TableProps",
            documentedProps: [
                "caption",
                "children",
                "collapseToList",
                "fullWidth",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "table-caption",
            importPath: "@fremtind/jokul/table",
            typeName: "TableCaptionProps",
            documentedProps: [
                "srOnly",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "table-head",
            importPath: "@fremtind/jokul/table",
            typeName: "TableHeadProps",
            documentedProps: [
                "srOnly",
                "sticky",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "table-header",
            importPath: "@fremtind/jokul/table",
            typeName: "TableHeaderProps",
            documentedProps: [
                "bold",
                "align",
                "scope",
                "srOnly",
                "sortable",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "table-cell",
            importPath: "@fremtind/jokul/table",
            typeName: "TableCellProps",
            documentedProps: [
                "align",
                "verticalAlign",
            ],
        },
    ]),
    keyboardSupport: "Bruker native tabellsemantikk; tastaturnavigasjon skjer via eventuelle interaktive elementer inni cellene.",
    semantics: [
        "Tabellen trenger en meningsfull caption.",
        "Headerceller må bruke riktig scope.",
        "Når collapseToList brukes, trenger hver datacelle data-th.",
    ],
    manualChecks: [
        "Bekreft at tabellen fortsatt kan skannes på små skjermer.",
        "Bekreft at caption fortsatt gir mening i konteksten, også når den skjules visuelt.",
        "Bekreft at sticky head ikke skjuler innhold eller viktige filterkontroller.",
    ],
    performanceNotes: [
        "Standardtabellen i docs krever ikke klient-JS eller hydrering.",
        "Store datasett bør pagineres eller virtualiseres utenfor basekomponenten.",
    ],
});
