import { DESIGN_SYSTEMS } from "@/shared/data/design-systems";
import { componentDocs } from "@/app/jokul/_component-docs/data";

export default function Home() {
    const jokulComponentCount = componentDocs.filter((doc) => doc.showOnOverview !== false).length;
    const systems = DESIGN_SYSTEMS
        .filter((system) => system.scope === "project")
        .map((system) => {
            if (system.id !== "jokul") return system;
            return {
                ...system,
                stats: { ...system.stats, components: jokulComponentCount },
            };
        });

    return (
        <main data-ua-only>
            <header>
                <h1>Designsystemer</h1>
                <p>
                    En samlet inngang til dokumentasjon, komponenter og mønstre på tvers av designsystemer.
                </p>
            </header>

            <form role="search" action="/sok" method="get">
                <label htmlFor="frontpage-search">Søk</label>
                <input
                    id="frontpage-search"
                    type="search"
                    name="q"
                    placeholder="Komponent, token eller mønster i Jøkul…"
                />
                <button type="submit">Søk</button>
            </form>
            <p>Søket gjelder Jøkul akkurat nå.</p>

            <section>
                <div>
                    <h2>Designsystemer i prosjektet</h2>
                    <p>Dokumentasjon som finnes i dette repoet.</p>
                </div>
                <ul>
                    {systems.map((system) => {
                        const count = system.stats?.components;
                        const countLabel =
                            typeof count === "number"
                                ? `${count} komponent${count === 1 ? "" : "er"}`
                                : null;
                        return (
                            <li key={system.id}>
                                <article>
                                    <h3>
                                        <a href={system.href}>{system.name}</a>
                                    </h3>
                                    <p>{system.description}</p>
                                    {countLabel && <p>{countLabel}</p>}
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <p>
                Gå til <a href="/jokul">Jøkul-dokumentasjonen</a> for alt om Jøkul.
            </p>
        </main>
    );
}
