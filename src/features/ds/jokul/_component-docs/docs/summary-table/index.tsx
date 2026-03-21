import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SummaryTablePreview } from "./preview";

const doc: ComponentDoc = {
    id: "summary-table",
    name: "Summary Table",
    package: "@fremtind/jokul/summary-table",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "SummaryTable viser en oppsummering av nøkkel-verdi-par i tabellformat.",
        long: "SummaryTable viser en oppsummering av nøkkel-verdi-par i tabellformat.",
    },
    relationships: {
        related: [{ id: "description-list", description: "Bruk DescriptionList for nøkkel-verdi-par som ikke krever header- og foterstrukturen til SummaryTable." }, { id: "table", description: "Bruk Table for flerkolonnet tabelldata med sorterbare overskrifter i stedet for et tokolonnet sammendrag." }],
    },
    preview: <SummaryTablePreview />,
    example: () => <SummaryTablePreview />,

    props,
};

export default doc;
