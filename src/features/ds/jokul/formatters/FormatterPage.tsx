import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Link } from "@fremtind/jokul/link";
import { PageHeader } from "@/components/ds/PageHeader";
import { getFormatterDoc, getRelatedFormatterDocs } from "@/features/ds/jokul/_formatter-docs/data";
import { Article } from "@/features/ds/jokul/_shared/components/Article";
import { NotFound } from "@/features/ds/jokul/_shared/components/NotFound";
import "./formatter-article.scss";

function renderDisplayValue(value: string) {
    return value.replaceAll("\\u00A0", "\u00A0");
}

export function FormatterPage({ id }: { id: string }) {
    const doc = getFormatterDoc(id);

    if (!doc) {
        return (
            <NotFound
                message="Fant ikke formatteren"
                backHref="/ds/jokul/formatter"
                backLabel="Tilbake til alle formattere"
            />
        );
    }

    const relatedDocs = getRelatedFormatterDocs(doc);
    const importStatement = `import { ${doc.name} } from "${doc.package}";`;

    return (
        <Article className="formatter-article">
            <PageHeader title={doc.name} description={doc.description.long} />

            <Flex className="post-prose" direction="column" gap="xl">
                <section className="formatter-section">
                    <h2 id="api">API</h2>
                    <div className="formatter-meta-grid">
                        <Card padding="l" className="formatter-meta-card">
                            <Flex direction="column" gap="xs">
                                <small>Kategori</small>
                                <strong>{doc.category}</strong>
                            </Flex>
                        </Card>
                        <Card padding="l" className="formatter-meta-card">
                            <Flex direction="column" gap="xs">
                                <small>Returnerer</small>
                                <code>{doc.returnType}</code>
                            </Flex>
                        </Card>
                        <Card padding="l" className="formatter-meta-card">
                            <Flex direction="column" gap="xs">
                                <small>Pakke</small>
                                <code>{doc.package}</code>
                            </Flex>
                        </Card>
                        <Card padding="l" className="formatter-meta-card">
                            <Flex direction="column" gap="xs">
                                <small>Signatur</small>
                                <code>{doc.signature}</code>
                            </Flex>
                        </Card>
                    </div>
                    <Flex direction="column" gap="s">
                        <h3>Import</h3>
                        <pre className="formatter-pre">
                            <code>{importStatement}</code>
                        </pre>
                    </Flex>
                </section>

                <section className="formatter-section">
                    <h2 id="eksempler">Eksempler</h2>
                    <ul className="formatter-example-list">
                        {doc.examples.map((example) => (
                            <li key={example.title}>
                                <Card padding="l" className="formatter-example-card">
                                    <Flex direction="column" gap="s">
                                        <h3>{example.title}</h3>
                                        {example.description && <p>{example.description}</p>}
                                        <pre className="formatter-pre">
                                            <code>{example.code.trim()}</code>
                                        </pre>
                                        {example.result && (
                                            <div className="formatter-result">
                                                <small>{example.resultLabel ?? "Resultat"}</small>
                                                <code>{renderDisplayValue(example.result)}</code>
                                            </div>
                                        )}
                                    </Flex>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>

                {doc.options && doc.options.length > 0 && (
                    <section className="formatter-section">
                        <h2 id="valg">Valg</h2>
                        <dl className="formatter-definition-list">
                            {doc.options.map((option) => (
                                <div key={option.name}>
                                    <dt>
                                        <code>{option.name}</code>
                                    </dt>
                                    <dd>
                                        <span className="formatter-definition-meta">
                                            Type: <code>{option.type}</code>
                                            {option.defaultValue ? (
                                                <>
                                                    {" · "}
                                                    Default: <code>{option.defaultValue}</code>
                                                </>
                                            ) : null}
                                        </span>
                                        <span>{option.description}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {doc.helpers && doc.helpers.length > 0 && (
                    <section className="formatter-section">
                        <h2 id="hjelpere">Tilgjengelige hjelpere</h2>
                        <dl className="formatter-definition-list">
                            {doc.helpers.map((helper) => (
                                <div key={helper.name}>
                                    <dt>
                                        <code>{helper.name}</code>
                                    </dt>
                                    <dd>{helper.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {doc.relatedExports && doc.relatedExports.length > 0 && (
                    <section className="formatter-section">
                        <h2 id="relaterte-exports">Relaterte exports</h2>
                        <dl className="formatter-definition-list">
                            {doc.relatedExports.map((item) => (
                                <div key={item.name}>
                                    <dt>
                                        <code>{item.name}</code>
                                    </dt>
                                    <dd>{item.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {doc.notes && doc.notes.length > 0 && (
                    <section className="formatter-section">
                        <h2 id="viktig-a-vite">Viktig å vite</h2>
                        <ul>
                            {doc.notes.map((note) => (
                                <li key={note}>{note}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {relatedDocs.length > 0 && (
                    <section className="formatter-section">
                        <h2 id="relaterte-funksjoner">Relaterte funksjoner</h2>
                        <ul className="formatter-related-list">
                            {relatedDocs.map((related) => (
                                <li key={related.id}>
                                    <Card padding="l" className="formatter-related-card">
                                        <Flex direction="column" gap="xs">
                                            <small>{related.category}</small>
                                            <strong>
                                                <Link href={`/ds/jokul/formatter/${related.id}`}>{related.name}</Link>
                                            </strong>
                                            <span>{related.description.short}</span>
                                        </Flex>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </Flex>
        </Article>
    );
}
