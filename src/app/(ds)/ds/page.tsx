import type { Metadata } from "next";
import type { DesignSystem } from "@/app/ds/_data/design-systems";
import {
    getComponentCountLabel,
    getDocumentedDesignSystems,
    getDesignSystems,
    getUndocumentedDesignSystems,
    isDocumentedInProject,
} from "@/app/ds/_data/overview";
import { DesignSystemExternalLinks } from "@/app/_shared/components/DesignSystemExternalLinks";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Designsystemer",
    description: "Oversikt over designsystemene som er samlet i læringsressursen.",
    path: "/ds",
});

function DesignSystemList({
    systems,
    emptyMessage,
}: {
    systems: DesignSystem[];
    emptyMessage?: string;
}) {
    if (systems.length === 0) {
        return emptyMessage ? <p>{emptyMessage}</p> : null;
    }

    return (
        <ul>
            {systems.map((system) => {
                const componentCountLabel = getComponentCountLabel(system);
                const documentedInProject = isDocumentedInProject(system);

                return (
                    <li key={system.name}>
                        <article>
                            <h3>
                                <a href={system.docs}>{system.name}</a>
                            </h3>
                            <p>{system.description}</p>
                            <p>
                                {documentedInProject
                                    ? "Dokumentert i dette repoet."
                                    : "Har foreløpig bare ekstern dokumentasjon."}
                            </p>
                            {componentCountLabel && <p>{componentCountLabel}</p>}
                            <DesignSystemExternalLinks links={system.externalLinks} />
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}

export default function DesignSystemsPage() {
    const systems = getDesignSystems();
    const documentedSystems = getDocumentedDesignSystems();
    const undocumentedSystems = getUndocumentedDesignSystems();

    return (
        <main className="page">
            <header>
                <h1>Designsystemer</h1>
                <p>Oversikt over designsystemene som er registrert i prosjektet, og hvilke som faktisk har lokal dokumentasjon her.</p>
            </header>

            <form role="search" action="/ds/sok" method="get">
                <label htmlFor="design-system-search">Søk</label>
                <input
                    id="design-system-search"
                    type="search"
                    name="q"
                    placeholder="Komponent, token eller mønster i Jøkul…"
                />
                <button type="submit">Søk</button>
            </form>
            <p>Søket gjelder Jøkul akkurat nå.</p>

            <section>
                <div>
                    <h2>Dokumenterte designsystemer</h2>
                    <p>Disse har egne sider og lokal dokumentasjon i repoet.</p>
                </div>
                <DesignSystemList
                    systems={documentedSystems}
                    emptyMessage="Ingen designsystemer har lokal dokumentasjon i repoet ennå."
                />
            </section>

            <section>
                <div>
                    <h2>Uokumenterte designsystemer</h2>
                    <p>Disse designsystemene er registrert i prosjektet, men har ikke egne ruter eller lokal dokumentasjon i repoet ennå.</p>
                </div>
                <DesignSystemList
                    systems={undocumentedSystems}
                    emptyMessage="Alle registrerte designsystemer har lokal dokumentasjon i repoet."
                />
            </section>

            <section>
                <div>
                    <h2>Alle registrerte designsystemer</h2>
                    <p>Samlet oversikt over både lokale og eksterne dokumentasjonskilder.</p>
                </div>
                <DesignSystemList systems={systems} />
            </section>
        </main>
    );
}
