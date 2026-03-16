import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { LockedSubmitExample, MultipleSubmitsExample } from "./examples";

const post: PatternPost = {
    id: 3,
    title: "Dobbel innsending",
    goals: "Hindre at samme handling trigges flere ganger mens den lagres.",
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
            <small>Paagende: {pending} · Lagret: {saved}</small>
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
        title: "Gi tydelig status og unnga dupliserte handlinger",
        description: (
            <>
                Hvis en knapp kan aktiveres flere ganger mens en lagring paagar, kan det gi
                duplikate endringer og uklare resultater. La handlingen vere idempotent der
                du kan, og gi tydelig tilbakemelding pa hva som skjer.
            </>
        ),
        ariaRoles: [
            <>
                Bruk ekte <code>&lt;button&gt;</code> (eller Jøkul <code>Button</code>) sa
                tastatur og hjelpemidler far riktig oppforsel.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" external>
                    Les mer om knappemonsteret i ARIA APG
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
                venter pa respons.{" "}
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
                    "For viktige handlinger ma brukeren kunne unnga feil, f.eks. ved bekreftelse eller mulighet til a angre.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html",
            },
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance:
                    "Brukere som ikke ser skjermen ma fa med seg at lagring paagar og nar den er ferdig.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            },
        ],
        avoid: [
            "Ikke la en \"Lagre\"-knapp kunne trigges flere ganger mens samme request er pending.",
            "Ikke skjul at noe skjer: vis loader/tekst, og avslutt den nar handlingen er ferdig.",
            "Unnga a erstatte knappen med en spinner uten tekst (da mister brukere kontekst).",
            "For irreversible eller viktige handlinger: vurder bekreftelse eller angre-mulighet.",
        ],
        testing: [
            "Dobbelklikk/trykk Enter flere ganger og verifiser at handlingen bare skjer en gang.",
            "Skjermleser: verifiser at lastetilstand og ferdig-status annonseres.",
            "Tastatur: verifiser at knappen fortsatt er fokusbar og har tydelig fokus.",
        ],
    },
    components: ["button"],
};

export default post;

