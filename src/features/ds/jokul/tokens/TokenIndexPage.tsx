import { PageHeader } from "@/components/ds/PageHeader";
import { Grid } from "@/features/ds/jokul/_shared/components/Grid";
import { overviewInlineStyles } from "@/features/ds/jokul/overview/overview-inline-styles";
import { tokenOverviewEntries } from "./token-overview-data";

export default function TokenPage() {
    return (
        <>
            <style>{overviewInlineStyles}</style>
            <main className="page overview-page">
                <PageHeader
                    title="Designtokens"
                    description="Fundamentene i Jøkul — typografi, farger og spacing. Les disse for å forstå designsystemets kjerneprinsipper."
                />
                <Grid columns={3} gap="m">
                    {tokenOverviewEntries.map((entry) => (
                        <a
                            key={entry.id}
                            className="overview-card"
                            data-kind="token"
                            data-layout="illustrated"
                            data-overview-card="token"
                            data-static-illustration="true"
                            href={entry.href}
                        >
                            {entry.illustration && (
                                <div className="overview-card-illustration" aria-hidden="true">
                                    {entry.illustration}
                                </div>
                            )}
                            <div className="overview-card-copy">
                                <strong className="overview-card-title">{entry.title}</strong>
                            </div>
                        </a>
                    ))}
                </Grid>
            </main>
        </>
    );
}
