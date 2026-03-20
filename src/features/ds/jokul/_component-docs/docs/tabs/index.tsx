import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TabsPreview } from "./preview";
import { TabsExample } from "./example";

const doc: ComponentDoc = {
    id: "tabs",
    name: "Tabs",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Krever riktig kobling mellom tab og panel samt tastaturnavigasjon.",
            maintenance: "Flere subkomponenter og fokuslogikk må holdes konsistent.",
        },
    },
    description: {
        short: "Organiser innhold i faner der kun én fane vises om gangen.",
        long: "Tabs organiser innhold i faner der kun én fane vises om gangen.",
    },
    relationships: {
        alternatives: [{ id: "nav-tab", description: "Bruk NavTab når navigasjon er sideruting fremfor bytte av innholdspaneler på siden." }],
        related: [{ id: "nav-link", description: "NavLink gir individuelle navigasjonslenker som Tabs kan supplere med innholdspanelbytte." }],
        subcomponents: [
            { id: "tab-list", description: "Wrapper som inneholder Tab-elementene." },
            { id: "tab", description: "En enkelt fane-knapp." },
            { id: "tab-panel", description: "Innholdsområdet tilknyttet en fane." },
        ],
    },

    preview: <TabsPreview />,
    example: (props) => <TabsExample {...props} />,
    exampleControlsConfig: {
        include: ["defaultTab"],
        order: ["defaultTab"],
        overrides: {
            defaultTab: { defaultValue: 0, min: 0, max: 2, step: 1 },
        },
    },
    props,
};

export default doc;
