import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { LockedSubmitExample, MultipleSubmitsExample } from "./examples";

const post: PatternPost = {
    id: 3,
    title: "Dobbel innsending",
    category: "tilbakemelding",
    goals: "Hindre at samme handling trigges flere ganger mens den lagres.",
    avoid: [
        {
            title: "Flere samtidige innsendinger",
            description: "Uten lås kan samme handling trigges flere ganger.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";

function fakeSave(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 900));
}

export function MultipleSubmitsExample() {
    const [pending, setPending] = useState(0);
    const [saved, setSaved] = useState(0);

    const handleSave = () => {
        setPending((p) => p + 1);
        void fakeSave().then(() => {
            setPending((p) => Math.max(0, p - 1));
            setSaved((s) => s + 1);
        });
    };

    return (
        <>
            <Button onClick={handleSave}>Lagre</Button>
            <small>Pågående: {pending} · Lagret: {saved}</small>
        </>
    );
}
`,
            Example: MultipleSubmitsExample,
        },
    ],
    examples: [
        {
            title: "Vanlig feil: kan trigges flere ganger",
            description: "Dobbeltklikk (eller Enter flere ganger) kan gi duplikate kall.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";

function fakeSave(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 900));
}

export function MultipleSubmitsExample() {
    const [pending, setPending] = useState(0);
    const [saved, setSaved] = useState(0);

    const handleSave = () => {
        setPending((p) => p + 1);
        void fakeSave().then(() => {
            setPending((p) => Math.max(0, p - 1));
            setSaved((s) => s + 1);
        });
    };

    return (
        <>
            <Button onClick={handleSave}>Lagre</Button>
            <small>Pågående: {pending} · Lagret: {saved}</small>
        </>
    );
}
`,
            Example: MultipleSubmitsExample,
        },
        {
            title: "Riktig: disable + loader",
            description: "La en og samme handling bare kunne startes en gang om gangen.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";

export function LockedSubmitExample() {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (saving) return;
        setSaving(true);
        try {
            await fakeSave();
        } finally {
            setSaving(false);
        }
    };

    return (
        <div aria-busy={saving}>
            <Button
                onClick={handleSave}
                disabled={saving}
                loader={{ showLoader: saving, textDescription: "Lagrer" }}
            >
                Lagre
            </Button>
        </div>
    );
}
`,
            Example: LockedSubmitExample,
        },
    ],
    accessibility: {
        title: "Gi tydelig status og unngå dupliserte handlinger",
        description: (
            <>
                Hvis en knapp kan aktiveres flere ganger mens en lagring pågår, kan det gi
                duplikate endringer og uklare resultater. La handlingen være idempotent der
                du kan, og gi tydelig tilbakemelding på hva som skjer.
            </>
        ),
        ariaRoles: [
            <>
                Bruk ekte <code>&lt;button&gt;</code> (eller Jøkul <code>Button</code>) så
                tastatur og hjelpemidler får riktig oppførsel.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" external>
                    Les mer om knappemønsteret i ARIA APG
                </Link>
                .
            </>,
            <>
                Kommuniser statusendringer (f.eks. "Lagrer" / "Lagret") med{" "}
                <code>aria-live</code> eller en statusmelding.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live"
                    external
                >
                    Les mer om aria-live
                </Link>
                .
            </>,
            <>
                Marker relevante regioner som opptatt med <code>aria-busy</code> mens du
                venter på respons.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy"
                    external
                >
                    Les mer om aria-busy
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "3.3.4",
                title: "Error Prevention (Legal, Financial, Data)",
                level: "AA",
                relevance:
                    "For viktige handlinger må brukeren kunne unngå feil, f.eks. ved bekreftelse eller mulighet til å angre.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html",
            },
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance:
                    "Brukere som ikke ser skjermen må få med seg at lagring pågår og når den er ferdig.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            },
        ],
        avoid: [
            "Ikke la en \"Lagre\"-knapp kunne trigges flere ganger mens samme request er pending.",
            "Ikke skjul at noe skjer: vis loader/tekst, og avslutt den når handlingen er ferdig.",
            "Unngå å erstatte knappen med en spinner uten tekst (da mister brukere kontekst).",
            "For irreversible eller viktige handlinger: vurder bekreftelse eller angre-mulighet.",
        ],
        testing: [
            "Dobbelklikk/trykk Enter flere ganger og verifiser at handlingen bare skjer en gang.",
            "Skjermleser: verifiser at lastetilstand og ferdig-status annonseres.",
            "Tastatur: verifiser at knappen fortsatt er fokusbar og har tydelig fokus.",
        ],
    },
    resources: [
        {
            title: "Error Prevention (Legal, Financial, Data)",
            href: "https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "WCAG-veiledning for å unngå kritiske feil.",
        },
        {
            title: "The disabled attribute",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled",
            publisher: "MDN",
            relevance: 4,
            description: "Når og hvordan disabled brukes riktig.",
        },
        {
            title: "HTML Standard: The disabled attribute",
            href: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-disabled-attribute",
            publisher: "WHATWG",
            relevance: 4,
            description: "Normativ definisjon av disabled og hva det påvirker.",
        },
        {
            title: "Button component",
            href: "https://design-system.service.gov.uk/components/button/",
            publisher: "GOV.UK",
            relevance: 4,
            description: "Tilstander og råd om knapper under lagring.",
        },
        {
            title: "HTML Standard: The button element",
            href: "https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element",
            publisher: "WHATWG",
            relevance: 3,
            description: "Spesifikasjon for button, type=submit og tilhørende oppførsel.",
        },
        {
            title: "G199: Providing success feedback when data is submitted successfully",
            href: "https://www.w3.org/WAI/WCAG21/Techniques/general/G199.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Teknikk for tydelig tilbakemelding etter innsending.",
        },
        {
            title: "ARIA22: Using role=status to present status messages",
            href: "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Teknikk for å annonsere lagring/feil uten fokusflytting.",
        },
    ],
    components: ["button"],
};

export default post;
