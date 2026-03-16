import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import {
    MultipleDisclosureExample,
    SingleDisclosureExample,
    VagueDisclosureExample,
} from "./examples";

const post: PatternPost = {
    id: 4,
    title: "Progressiv avsløring",
    category: "struktur",
    goals: "La brukeren fokusere på det viktigste og åpne detaljer ved behov.",
    avoid: [
        {
            title: "Uklare overskrifter",
            description: "Overskriften må beskrive innholdet, ikke bare “Mer”.",
            code: `
import { ExpandablePanel } from "@fremtind/jokul/expander";

<ExpandablePanel>
    <ExpandablePanel.Header>Mer</ExpandablePanel.Header>
    <ExpandablePanel.Content>
        <p>Detaljer om dekning, pris og vilkår.</p>
    </ExpandablePanel.Content>
</ExpandablePanel>
`,
            Example: VagueDisclosureExample,
        },
    ],
    examples: [
        {
            title: "Enkelt panel",
            description: "Én overskrift som kan åpnes ved behov.",
            code: `
import { ExpandablePanel } from "@fremtind/jokul/expander";

<ExpandablePanel>
    <ExpandablePanel.Header>Hva er inkludert?</ExpandablePanel.Header>
    <ExpandablePanel.Content>
        <p>Forsikringen dekker skader, ansvar og veihjelp.</p>
    </ExpandablePanel.Content>
</ExpandablePanel>
`,
            Example: SingleDisclosureExample,
        },
        {
            title: "Flere paneler i liste",
            description: "Bruk flere paneler for å gruppere detaljer.",
            code: `
import { ExpandablePanel } from "@fremtind/jokul/expander";

<ExpandablePanel>
    <ExpandablePanel.Header>Hvordan fungerer det?</ExpandablePanel.Header>
    <ExpandablePanel.Content>
        <p>Du velger produkt, fyller inn informasjon og bekrefter.</p>
    </ExpandablePanel.Content>
</ExpandablePanel>
<ExpandablePanel>
    <ExpandablePanel.Header>Hva koster det?</ExpandablePanel.Header>
    <ExpandablePanel.Content>
        <p>Pris avhenger av dekning og egenandel.</p>
    </ExpandablePanel.Content>
</ExpandablePanel>
`,
            Example: MultipleDisclosureExample,
        },
    ],
    accessibility: {
        title: "Gi brukeren kontroll over skjult innhold",
        description:
            "Progressiv avsløring fungerer best når innholdet kan åpnes og lukkes med tastatur, og når tilstanden annonseres tydelig. Overskriften skal være klikkbar og beskrive innholdet som skjules.",
        ariaRoles: [
            <>
                Triggeren bør være en <code>&lt;button&gt;</code> som oppdaterer{" "}
                <code>aria-expanded</code>.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/" external>
                    Se WAI-ARIA APG: Disclosure
                </Link>
                .
            </>,
            <>
                Bruk <code>aria-controls</code> når triggeren styrer et konkret innholdspanel.{" "}
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
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Brukere må forstå hvilke overskrifter som hører til hvilket innhold.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "2.1.1",
                title: "Keyboard",
                level: "A",
                relevance: "Paneler må kunne åpnes/lukkes med tastatur.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Skjermleser må få riktig navn, rolle og åpen/lukket-tilstand.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
        ],
        avoid: [
            "Ikke skjul essensiell informasjon bak flere lag med paneler.",
            "Unngå uklare overskrifter som ikke forklarer innholdet.",
            "Ikke gjør bare deler av overskriften klikkbar – hele triggeren bør være klikkbar.",
        ],
        testing: [
            "Tastatur: åpne/lukk paneler med Enter/Space.",
            "Skjermleser: kontroller at aria-expanded annonseres når panelet åpnes/lukkes.",
        ],
    },
    resources: [
        {
            title: "Disclosure Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Anbefalt mønster for show/hide-innhold.",
        },
        {
            title: "Accordion component",
            href: "https://design-system.service.gov.uk/components/accordion/",
            publisher: "GOV.UK",
            relevance: 4,
            description: "Praktiske råd for grupper av sammenleggbart innhold.",
        },
        {
            title: "aria-expanded",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded",
            publisher: "MDN",
            relevance: 4,
            description: "Forklarer hvordan åpen/lukket-tilstand uttrykkes.",
        },
    ],
    components: ["expandable-panel"],
};

export default post;
