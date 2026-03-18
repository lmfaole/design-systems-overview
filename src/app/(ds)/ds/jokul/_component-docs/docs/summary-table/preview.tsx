"use client";
import { SummaryTable, SummaryTableRow } from "@fremtind/jokul/summary-table";

export function SummaryTablePreview() {
    return (
        <SummaryTable
            caption="Oppsummering"
            header={["Dekning", "Pris"]}
            body={
                <>
                    <SummaryTableRow header="Bilforsikring" content="3 200 kr" />
                    <SummaryTableRow header="Reiseforsikring" content="890 kr" />
                </>
            }
            footer={<SummaryTableRow header="Totalt" content="4 090 kr" />}
        />
    );
}
