import { PageHeader } from "@/components/ds/PageHeader";
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
                <div className="ds-grid" data-columns={3}>
                    {tokenOverviewEntries.map((entry) => (
                        <a
                            key={entry.id}
                            className="overview-card"
                            data-kind="token"
                            data-layout="illustrated"
                            data-overview-card="token"
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
                </div>
            </main>
        </>
    );
}
