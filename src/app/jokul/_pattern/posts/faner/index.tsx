import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { ManyTabsExample, OverloadedTabsExample, SimpleTabsExample } from "./examples";

const post: PatternPost = {
    id: 6,
    title: "Faner",
    category: "navigasjon",
    goals: "Del opp relatert innhold uten å skjule navigasjonen.",
    avoid: [
        {
            title: "For mange faner med lange titler",
            description: "Mye innhold og lange labels gjør faner tunge å bruke.",
            code: `
import { Tab, TabList, TabPanel, Tabs } from "@fremtind/jokul/tabs";

<Tabs defaultTab={0}>
    <TabList>
        <Tab>Bilforsikring detaljert</Tab>
        <Tab>Hus og innbo fullstendig</Tab>
        <Tab>Reise med tillegg</Tab>
        <Tab>Båt og motor</Tab>
        <Tab>Kjæledyr</Tab>
        <Tab>Verdisaker</Tab>
    </TabList>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
    <TabPanel>Omfattende innhold som kanskje burde vært på egen side.</TabPanel>
</Tabs>
`,
            Example: OverloadedTabsExample,
        },
    ],
    examples: [
        {
            title: "To faner",
            description: "Egnet for små mengder innhold.",
            code: `
import { Tab, TabList, TabPanel, Tabs } from "@fremtind/jokul/tabs";

<Tabs defaultTab={0}>
    <TabList>
        <Tab>Oversikt</Tab>
        <Tab>Detaljer</Tab>
    </TabList>
    <TabPanel>Kort oppsummering av avtalen.</TabPanel>
    <TabPanel>Detaljer om dekning og vilkår.</TabPanel>
</Tabs>
`,
            Example: SimpleTabsExample,
        },
        {
            title: "Flere kategorier",
            description: "Brukes når innholdet er tydelig delt i kategorier.",
            code: `
import { Tab, TabList, TabPanel, Tabs } from "@fremtind/jokul/tabs";

<Tabs defaultTab={0}>
    <TabList>
        <Tab>Bil</Tab>
        <Tab>Hus</Tab>
        <Tab>Reise</Tab>
        <Tab>Båt</Tab>
    </TabList>
    <TabPanel>Forsikring for din bil.</TabPanel>
    <TabPanel>Sikre ditt hjem.</TabPanel>
    <TabPanel>Trygghet på reisen.</TabPanel>
    <TabPanel>Forsikring for båten din.</TabPanel>
</Tabs>
`,
            Example: ManyTabsExample,
        },
    ],
    accessibility: {
        title: "Gjør faner fullt tilgjengelige med tastatur",
        description:
            "Faner må fungere med tastatur og skjermleser, og fokus må tydelig følge den aktive fanen. Brukere skal kunne hoppe mellom faner med piltaster og få riktig sammenheng mellom fane og innhold.",
        ariaRoles: [
            <>
                Bruk <code>role="tablist"</code>, <code>role="tab"</code> og{" "}
                <code>role="tabpanel"</code> som definert i mønsteret.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" external>
                    Se WAI-ARIA APG: Tabs
                </Link>
                .
            </>,
            <>
                Knyt tab til innhold med <code>aria-controls</code> og{" "}
                <code>aria-labelledby</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls"
                    external
                >
                    Les mer om aria-controls
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "2.1.1",
                title: "Keyboard",
                level: "A",
                relevance: "Brukere må kunne bytte fane med tastatur.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html",
            },
            {
                id: "2.4.3",
                title: "Focus Order",
                level: "A",
                relevance: "Fokus skal følge aktiv fane og panel i en logisk rekkefølge.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Skjermleser må forstå fane-roller og aktiv tilstand.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
        ],
        avoid: [
            "Ikke bruk faner for svært stort innhold – vurder egen side.",
            "Unngå å endre faneinnhold uten å oppdatere fokus.",
            "Ikke skjul at faner er klikkbare med lav kontrast eller små klikkområder.",
        ],
        testing: [
            "Tastatur: bruk piltaster for å bytte fane.",
            "Skjermleser: verifiser at riktig fane og panel annonseres.",
        ],
    },
    resources: [
        {
            title: "Tabs Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Anbefalt mønster for tilgjengelige faner.",
        },
        {
            title: "aria-controls",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls",
            publisher: "MDN",
            relevance: 4,
            description: "Kobler fane til panel.",
        },
    ],
    components: ["tabs", "tab-list", "tab", "tab-panel"],
};

export default post;
