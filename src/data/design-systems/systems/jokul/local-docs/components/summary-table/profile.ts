import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const summaryTableComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/summary-table/summary-table.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/summary-table",
            typeName: "SummaryTableProps",
            documentedProps: [
                "body",
                "caption",
                "className",
                "footer",
                "header",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "summary-table-row",
            importPath: "@fremtind/jokul/summary-table",
            typeName: "SummaryTableRowProps",
            documentedProps: [
                "className",
                "content",
                "header",
            ],
        },
    ]),
    keyboardSupport: "SummaryTable har ingen egen tastaturlogikk utover vanlig navigasjon til eventuelle lenker eller kontroller som legges inni radinnholdet.",
    semantics: [
        "Bruk SummaryTable når du trenger en kompakt oppsummering med tydelige radetiketter og verdier, spesielt i kvitteringer eller sammendrag.",
        "Caption og skjult header gir tabellen et tydelig navn og korrekt kolonnesemantikk selv om presentasjonen er kompakt.",
        "Hold radetikettene korte og konsistente så oppsummeringen blir lett å skanne.",
    ],
    manualChecks: [
        "Bekreft at SummaryTable fortsatt er rett valg og ikke burde være en vanlig tabell hvis brukeren trenger å sammenligne flere like datasett.",
        "Bekreft at footer bare brukes for faktisk oppsummerende informasjon og ikke som et ekstra vanlig radområde.",
    ],
    performanceNotes: [
        "SummaryTable rendres som vanlig tabellmarkup uten klientruntime.",
        "Komponenten er lett, men lange verdier kan bryte rytmen hvis du prøver å presse for mye fri tekst inn i høyre kolonne.",
    ],
});
