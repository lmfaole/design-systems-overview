import { PageHeader } from "@/components/ds/PageHeader";
import { overviewInlineStyles } from "@/features/ds/jokul/overview/overview-inline-styles";
import { formatterOverviewGroups } from "./formatter-overview-data";

function getFormatterCardLabel(name: string) {
    if (name === "parseNumber") return "Parser";
    if (name === "registerWithMasks") return "React Hook Form";
    return "Formatter";
}

export default function FormatterIndexPage() {
    return (
        <>
            <style>{overviewInlineStyles}</style>
            <main className="page overview-page">
                <PageHeader
                    title="Formattere"
                    description="Jøkul har små, praktiske utilities for tall, datoer, norske identifikatorer og inputmasker. Bruk dem når data skal presenteres eller tastes inn på en måte brukerne kjenner igjen."
                />

                {formatterOverviewGroups.map((group) => (
                    <section key={group.id} className="overview-section" aria-labelledby={`formatter-group-${group.id}`}>
                        <div className="overview-section-header">
                            <h2 id={`formatter-group-${group.id}`}>{group.label}</h2>
                            <p>{group.description}</p>
                        </div>
                        <div className="ds-grid" data-columns={3}>
                            {group.docs.map((doc) => (
                                <a
                                    key={doc.id}
                                    className="overview-card"
                                    data-kind="formatter"
                                    href={`/ds/jokul/formatter/${doc.id}`}
                                >
                                    <span className="overview-card-meta">{getFormatterCardLabel(doc.name)}</span>
                                    <strong className="overview-card-title">{doc.name}</strong>
                                    <small className="overview-card-description">{doc.description.short}</small>
                                </a>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}
