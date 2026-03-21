import type { ComponentDoc } from "../types";
import { props } from "./props";
import { NavTabPreview } from "./preview";

const doc: ComponentDoc = {
    id: "nav-tab",
    name: "Nav Tab",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "NavTab er lenkefaner for URL-basert navigasjon.",
        long: "NavTab er lenkefaner for URL-basert navigasjon. Aktiv fane styres av aria-selected basert på gjeldende URL — i motsetning til Tabs som er tilstandsstyrt.",
    },
    relationships: {
        alternatives: [{ id: "tabs", description: "Bruk Tabs for innholdspanelbytte på siden der URL-en ikke endres mellom visninger." }],
        related: [{ id: "nav-link", description: "NavLink er et enklere enkeltlenke-navigasjonselement uten tablist-rollen og aktiv indikator." }, { id: "link", description: "Bruk Link for innebygde teksthyperkoblinger fremfor en stilisert navigasjonsfanerad." }],
        subcomponents: [
            { id: "nav-tabs", description: "Wrapper-komponent som inneholder NavTab-elementene og håndterer tablist-rollen og den animerte indikatoren." },
        ],
    },

    preview: <NavTabPreview />,
    example: () => <NavTabPreview />,
    props,
};

export default doc;
